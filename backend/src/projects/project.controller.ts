import { Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import {
  createProjectService,
  getProjectByIdService,
  getProjectsService
} from './project.service.js';
import { createProjectSchema } from './project.schema.js';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erro desconhecido';
}

export async function getProjectsController(req: AuthRequest, res: Response) {
  try {
    const projects = await getProjectsService(req.user!.userId);
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function getProjectByIdController(req: AuthRequest, res: Response) {
  const projectId = Number(req.params.id);

  if (Number.isNaN(projectId)) {
    return res.status(400).json({ error: 'ID de projeto inválido' });
  }

  try {
    const project = await getProjectByIdService(req.user!.userId, projectId);
    res.json(project);
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
}

export async function createProjectController(req: AuthRequest, res: Response) {
  const parsed = createProjectSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({ error: 'Dados de projeto inválidos' });
  }

  try {
    const project = await createProjectService(req.user!.userId, parsed.data);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}
