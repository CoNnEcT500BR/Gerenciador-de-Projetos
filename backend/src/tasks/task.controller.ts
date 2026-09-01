import { Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import { createTaskService, getTasksService, updateTaskStatusService } from './task.service.js';
import { isProjectMemberService } from '../projects/project.service.js';

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
    const task = await createTaskService({ ...req.body, projectId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function updateTaskStatusController(req: AuthRequest, res: Response) {
  const taskId = Number(req.params.id);
  const { status } = req.body;

  if (Number.isNaN(taskId) || !status) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }

  try {
    const task = await updateTaskStatusService(taskId, status);
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}
