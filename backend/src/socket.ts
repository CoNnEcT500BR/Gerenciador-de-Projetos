import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import prisma from './prisma/client.js';
import { createMessageService } from './chat/chat.service.js';
import { registerRealtimeServer } from './notifications/realtime.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('JWT_SECRET é obrigatório em produção');
}
const signingSecret = JWT_SECRET ?? 'development-only-secret';
const onlineByRoom = new Map<string, Set<string>>();

function getCookieToken(socket: Socket) {
  const cookieHeader = socket.handshake.headers.cookie ?? '';
  const match = cookieHeader.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? decodeURIComponent(match[1]) : undefined;
}

function getUserId(socket: Socket) {
  const token = getCookieToken(socket) ?? socket.handshake.auth?.token;
  if (!token) return undefined;
  try {
    return (jwt.verify(token, signingSecret) as { userId: number }).userId;
  } catch {
    return undefined;
  }
}

export function initSocket(server: HttpServer) {
  const origins = (process.env.CORS_ORIGIN ?? 'http://localhost:3000')
    .split(',')
    .map((origin) => origin.trim());
  const allowOrigin = (
    origin: string | undefined,
    callback: (error: Error | null, origin?: boolean) => void
  ) => {
    const allowed = !origin || origins.includes(origin) || (
      process.env.NODE_ENV !== 'production' &&
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)
    );
    callback(allowed ? null : new Error('Origem não permitida'), allowed);
  };

  const io = new Server(server, {
    cors: { origin: allowOrigin, credentials: true, methods: ['GET', 'POST'] }
  });
  registerRealtimeServer(io);

  io.use((socket, next) => {
    const userId = getUserId(socket);
    if (!userId) return next(new Error('Não autenticado'));
    socket.data.userId = userId;
    next();
  });

  io.on('connection', async (socket) => {
    socket.on('joinRoom', async (projectId: number, callback?: (result: { ok: boolean; error?: string }) => void) => {
      if (!Number.isInteger(projectId)) return callback?.({ ok: false, error: 'Projeto inválido' });
      const member = await prisma.projectMember.findUnique({
        where: { userId_projectId: { userId: socket.data.userId, projectId } }
      });
      if (!member) return callback?.({ ok: false, error: 'Você não é membro deste projeto' });

      const room = `project:${projectId}`;
      socket.join(room);
      const connections = onlineByRoom.get(room) ?? new Set<string>();
      connections.add(socket.id);
      onlineByRoom.set(room, connections);
      io.to(room).emit('presence', { count: connections.size });
      callback?.({ ok: true });
    });

    socket.on('sendMessage', async (
      payload: { projectId: number; content: string; attachmentId?: number },
      callback?: (result: { ok: boolean; error?: string }) => void
    ) => {
      if (!payload || !Number.isInteger(payload.projectId) || typeof payload.content !== 'string' || (payload.attachmentId !== undefined && !Number.isInteger(payload.attachmentId))) {
        return callback?.({ ok: false, error: 'Mensagem inválida' });
      }
      const content = payload.content.trim();
      if (content.length > 2000) {
        return callback?.({ ok: false, error: 'A mensagem deve ter entre 1 e 2000 caracteres' });
      }

      try {
        const message = await createMessageService(socket.data.userId, payload.projectId, content, payload.attachmentId);
        const room = `project:${payload.projectId}`;
        io.to(room).emit('receiveMessage', message);

        const members = await prisma.projectMember.findMany({
          where: { projectId: payload.projectId, userId: { not: socket.data.userId } }
        });
        if (members.length) {
          const notifications = await Promise.all(members.map((member) => prisma.notification.create({
            data: {
              userId: member.userId,
              projectId: payload.projectId,
              content: `Nova mensagem no projeto ${payload.projectId}.`
            }
          })));
          notifications.forEach((notification) => {
            io.to(`user:${notification.userId}`).emit('notification', notification);
          });
        }
        callback?.({ ok: true });
      } catch (error) {
        callback?.({ ok: false, error: error instanceof Error ? error.message : 'Não foi possível enviar' });
      }
    });

    socket.join(`user:${socket.data.userId}`);
    // Restore all project rooms on every new connection, including transport
    // reconnects, so clients do not lose realtime events while re-entering.
    const memberships = await prisma.projectMember.findMany({
      where: { userId: socket.data.userId },
      select: { projectId: true }
    });
    for (const membership of memberships) {
      const room = `project:${membership.projectId}`;
      socket.join(room);
      const connections = onlineByRoom.get(room) ?? new Set<string>();
      connections.add(socket.id);
      onlineByRoom.set(room, connections);
      io.to(room).emit('presence', { count: connections.size });
    }

    socket.on('disconnect', () => {
      for (const [room, connections] of onlineByRoom) {
        if (!connections.delete(socket.id)) continue;
        if (connections.size === 0) onlineByRoom.delete(room);
        io.to(room).emit('presence', { count: connections.size });
      }
    });
  });

  return io;
}
