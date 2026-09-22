import { Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import {
  createTaskService,
  deleteTaskService,
  getTaskProjectIdService,
  getTasksService,
  updateTaskService,
  updateTaskStatusService
} from './task.service.js';
import { isProjectMemberService } from '../projects/project.service.js';
import { createTaskSchema, updateTaskStatusSchema } from './task.schema.js';
import { notifyProjectMembersService } from '../notifications/notification.service.js';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erro desconhecido';
}

export async function getTasksController(req: AuthRequest, res: Response) {
  const projectId = Number(req.query.projectId);

  if (Number.isNaN(projectId)) {
    return res.status(400).json({ error: 'projectId é obrigatório' });
  }

  const isMember = await isProjectMemberService(req.user!.userId, projectId);

  if (!isMember) {
    return res.status(403).json({ error: 'Você não é membro deste projeto' });
  }

  try {
    const tasks = await getTasksService(projectId);
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function createTaskController(req: AuthRequest, res: Response) {
  const projectId = Number(req.body.projectId);

  if (Number.isNaN(projectId)) {
    return res.status(400).json({ error: 'projectId é obrigatório' });
  }

  const isMember = await isProjectMemberService(req.user!.userId, projectId);

  if (!isMember) {
    return res.status(403).json({ error: 'Você não é membro deste projeto' });
  }

  try {
    const parsed = createTaskSchema.safeParse({ ...req.body, projectId });

    if (!parsed.success) {
      return res.status(400).json({ error: 'Dados de tarefa inválidos' });
    }

    const task = await createTaskService(parsed.data);
    await notifyProjectMembersService(projectId, `Nova tarefa criada: ${task.title}`, req.user!.userId);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function updateTaskStatusController(req: AuthRequest, res: Response) {
  const taskId = Number(req.params.id);
  const parsed = updateTaskStatusSchema.safeParse(req.body);

  if (Number.isNaN(taskId) || !parsed.success) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  const projectId = await getTaskProjectIdService(taskId);
  if (!projectId || !(await isProjectMemberService(req.user!.userId, projectId))) {
    return res.status(403).json({ error: 'Você não tem acesso a esta tarefa' });
  }

  try {
    const task = await updateTaskStatusService(taskId, parsed.data.status);
    await notifyProjectMembersService(projectId, `Tarefa atualizada para ${parsed.data.status}.`, req.user!.userId);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function updateTaskController(req: AuthRequest, res: Response) {
  const taskId = Number(req.params.id);
  const projectId = await getTaskProjectIdService(taskId);
  if (Number.isNaN(taskId) || !projectId || !(await isProjectMemberService(req.user!.userId, projectId))) {
    return res.status(403).json({ error: 'Você não tem acesso a esta tarefa' });
  }

  const parsed = createTaskSchema.partial().safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Dados de tarefa inválidos' });

  try {
    const task = await updateTaskService(taskId, parsed.data);
    await notifyProjectMembersService(projectId, `Tarefa atualizada: ${task.title}`, req.user!.userId);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function deleteTaskController(req: AuthRequest, res: Response) {
  const taskId = Number(req.params.id);
  const projectId = await getTaskProjectIdService(taskId);
  if (Number.isNaN(taskId) || !projectId || !(await isProjectMemberService(req.user!.userId, projectId))) {
    return res.status(403).json({ error: 'Você não tem acesso a esta tarefa' });
  }

  try {
    await deleteTaskService(taskId);
    await notifyProjectMembersService(projectId, 'Uma tarefa foi removida.', req.user!.userId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}
