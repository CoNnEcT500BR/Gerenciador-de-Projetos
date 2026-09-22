import assert from 'node:assert/strict';
import http from 'node:http';
import { after, before, describe, it } from 'node:test';
import { io as createClient, type Socket } from 'socket.io-client';
import app from '../src/app.js';
import { initSocket } from '../src/socket.js';
import prisma from '../src/prisma/client.js';

type Session = {
  cookie: string;
  csrf: string;
  request(path: string, init?: RequestInit): Promise<Response>;
};

const baseUrl = 'http://localhost:4010';
const suffix = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
const accounts = {
  owner: { name: 'Phase Owner', email: `phase-owner-${suffix}@example.test`, password: 'Password123!' },
  member: { name: 'Phase Member', email: `phase-member-${suffix}@example.test`, password: 'Password123!' },
  outsider: { name: 'Phase Outsider', email: `phase-outsider-${suffix}@example.test`, password: 'Password123!' }
};

let server: http.Server;
let socketServer: ReturnType<typeof initSocket>;
let owner: Session;
let member: Session;
let outsider: Session;
let projectId: number;
let taskId: number;
let ownerId: number;
let memberId: number;
let outsiderId: number;
let databaseReady = false;

function readCookies(response: Response) {
  const raw = response.headers.get('set-cookie') ?? '';
  const cookies = [...raw.matchAll(/(?:^|,\s*)(token|csrfToken)=([^;]+)/g)];
  return Object.fromEntries(cookies.map((match) => [match[1], match[2]])) as Record<string, string>;
}

async function registerAccount(account: typeof accounts.owner): Promise<Session & { userId: number }> {
  const response = await fetch(`${baseUrl}/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(account)
  });
  assert.equal(response.status, 201);
  const body = await response.json() as { user: { id: number } };
  const cookies = readCookies(response);
  assert.ok(cookies.token);
  assert.ok(cookies.csrfToken);
  const cookie = `token=${cookies.token}; csrfToken=${cookies.csrfToken}`;

  const session: Session & { userId: number } = {
    cookie,
    csrf: cookies.csrfToken,
    userId: body.user.id,
    async request(path, init = {}) {
      const headers = new Headers(init.headers);
      headers.set('cookie', cookie);
      if (init.method && !['GET', 'HEAD'].includes(init.method.toUpperCase()) && !headers.has('x-csrf-token')) {
        headers.set('x-csrf-token', cookies.csrfToken);
      }
      return fetch(`${baseUrl}${path}`, { ...init, headers });
    }
  };
  return session;
}

function waitForEvent<T>(socket: Socket, event: string) {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Timeout aguardando ${event}`)), 5000);
    socket.once(event, (payload: T) => {
      clearTimeout(timer);
      resolve(payload);
    });
  });
}

function connectSocket(socket: Socket) {
  return new Promise<void>((resolve, reject) => {
    socket.once('connect', () => resolve());
    socket.once('connect_error', reject);
    socket.connect();
  });
}

describe('Fases 1, 2 e 3 - integração', () => {
  before(async () => {
    server = http.createServer(app);
    socketServer = initSocket(server);
    await new Promise<void>((resolve) => server.listen(4010, resolve));
    server.unref();
    try {
      await prisma.$connect();
      await prisma.user.count();
      databaseReady = true;
      owner = await registerAccount(accounts.owner);
      member = await registerAccount(accounts.member);
      outsider = await registerAccount(accounts.outsider);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      throw new Error(
        `Banco de integração indisponível. Configure TEST_DATABASE_URL ou corrija backend/.env. Detalhe: ${message}`
      );
    }
    ownerId = owner.userId;
    memberId = member.userId;
    outsiderId = outsider.userId;
  });

  it('valida sessão autenticada e bloqueia mutação sem CSRF', async () => {
    const me = await owner.request('/users/me');
    const meBody = await me.text();
    assert.equal(me.status, 200, meBody);
    assert.equal(JSON.parse(meBody).email, accounts.owner.email);

    const blocked = await owner.request('/projects', {
      method: 'POST',
      headers: { 'content-type': 'application/json', 'x-csrf-token': 'invalid' },
      body: JSON.stringify({ title: 'blocked', description: '' })
    });
    assert.equal(blocked.status, 403, await blocked.text());
  });

  it('isola projetos, gerencia membros e executa CRUD de tarefas', async () => {
    const createdProject = await owner.request('/projects', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'Projeto de integração', description: 'Cobertura das fases' })
    });
    assert.equal(createdProject.status, 201);
    projectId = (await createdProject.json()).id;

    const hidden = await outsider.request(`/projects/${projectId}`);
    assert.equal(hidden.status, 404);

    const added = await owner.request(`/projects/${projectId}/members`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: accounts.member.email, role: 'MEMBER' })
    });
    assert.equal(added.status, 201);

    const createdTask = await member.request('/tasks', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ projectId, title: 'Tarefa de integração', description: 'Teste CRUD' })
    });
    assert.equal(createdTask.status, 201);
    taskId = (await createdTask.json()).id;

    const updatedTask = await member.request(`/tasks/${taskId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ title: 'Tarefa atualizada', description: 'Atualizada' })
    });
    assert.equal(updatedTask.status, 200);

    const outsiderTasks = await outsider.request(`/tasks?projectId=${projectId}`);
    assert.equal(outsiderTasks.status, 403);
  });

  it('entrega chat, presença e isolamento por Socket.io', async () => {
    const ownerSocket = createClient(baseUrl, {
      transports: ['websocket'],
      extraHeaders: { Cookie: owner.cookie }
    });
    const memberSocket = createClient(baseUrl, {
      transports: ['websocket'],
      extraHeaders: { Cookie: member.cookie }
    });
    const outsiderSocket = createClient(baseUrl, {
      transports: ['websocket'],
      extraHeaders: { Cookie: outsider.cookie }
    });

    await Promise.all([connectSocket(ownerSocket), connectSocket(memberSocket), connectSocket(outsiderSocket)]);
    const ownerJoin = await new Promise<{ ok: boolean }>((resolve) => ownerSocket.emit('joinRoom', projectId, resolve));
    const memberJoin = await new Promise<{ ok: boolean }>((resolve) => memberSocket.emit('joinRoom', projectId, resolve));
    const outsiderJoin = await new Promise<{ ok: boolean; error?: string }>((resolve) => outsiderSocket.emit('joinRoom', projectId, resolve));
    assert.equal(ownerJoin.ok, true);
    assert.equal(memberJoin.ok, true);
    assert.equal(outsiderJoin.ok, false);

    const received = waitForEvent<{ content: string }>(memberSocket, 'receiveMessage');
    const sent = await new Promise<{ ok: boolean }>((resolve) => {
      ownerSocket.emit('sendMessage', { projectId, content: 'Mensagem de integração' }, resolve);
    });
    assert.equal(sent.ok, true);
    assert.equal((await received).content, 'Mensagem de integração');

    const history = await member.request(`/chat/projects/${projectId}/messages`);
    assert.equal(history.status, 200);
    assert.ok((await history.json()).some((message: { content: string }) => message.content === 'Mensagem de integração'));

    ownerSocket.disconnect();
    memberSocket.disconnect();
    outsiderSocket.disconnect();
  });

  after(async () => {
    if (!databaseReady) {
      await new Promise<void>((resolve) => socketServer.close(() => resolve()));
      if (server.listening) {
        await new Promise<void>((resolve) => server.close(() => resolve()));
      }
      await prisma.$disconnect();
      return;
    }
    await prisma.notification.deleteMany({ where: { userId: { in: [ownerId, memberId, outsiderId] } } });
    await prisma.message.deleteMany({ where: { userId: { in: [ownerId, memberId, outsiderId] } } });
    await prisma.message.deleteMany({ where: { projectId } });
    await prisma.task.deleteMany({ where: { projectId } });
    await prisma.projectMember.deleteMany({ where: { projectId } });
    await prisma.project.deleteMany({ where: { id: projectId } });
    await prisma.user.deleteMany({ where: { id: { in: [ownerId, memberId, outsiderId] } } });
    await new Promise<void>((resolve) => socketServer.close(() => resolve()));
    if (server.listening) {
      await new Promise<void>((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
    }
    await prisma.$disconnect();
  });
});
