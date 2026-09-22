import { Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import {
  addProjectMemberService,
  createProjectService,
  deleteProjectService,
  getProjectByIdService,
  getProjectsService,
  removeProjectMemberService,
  updateProjectService
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

export async function updateProjectController(req: AuthRequest, res: Response) {
  const projectId = Number(req.params.id);
  const parsed = createProjectSchema.safeParse(req.body);
  if (Number.isNaN(projectId) || !parsed.success) {
    return res.status(400).json({ error: 'Dados de projeto inválidos' });
  }
  try {
    res.json(await updateProjectService(req.user!.userId, projectId, parsed.data));
  } catch (error) {
    res.status(403).json({ error: getErrorMessage(error) });
  }
}

export async function deleteProjectController(req: AuthRequest, res: Response) {
  const projectId = Number(req.params.id);
  if (Number.isNaN(projectId)) return res.status(400).json({ error: 'ID inválido' });
  try {
    await deleteProjectService(req.user!.userId, projectId);
    res.status(204).send();
  } catch (error) {
    res.status(403).json({ error: getErrorMessage(error) });
  }
}

export async function addProjectMemberController(req: AuthRequest, res: Response) {
  const projectId = Number(req.params.id);
  if (Number.isNaN(projectId) || typeof req.body.email !== 'string') {
    return res.status(400).json({ error: 'Email do membro é obrigatório' });
  }
  try {
    const member = await addProjectMemberService(req.user!.userId, projectId, req.body);
    res.status(201).json(member);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function removeProjectMemberController(req: AuthRequest, res: Response) {
  const projectId = Number(req.params.id);
  const memberId = Number(req.params.memberId);
  if (Number.isNaN(projectId) || Number.isNaN(memberId)) {
    return res.status(400).json({ error: 'IDs inválidos' });
  }
  try {
    await removeProjectMemberService(req.user!.userId, projectId, memberId);
    res.status(204).send();
  } catch (error) {
    res.status(403).json({ error: getErrorMessage(error) });
  }
}
