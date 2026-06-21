import { Request, Response } from 'express';
import { createProjectService, getProjectsService } from './project.service.js';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erro desconhecido';
}

export async function getProjectsController(req: Request, res: Response) {
  try {
    const projects = await getProjectsService();
    res.json(projects);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function createProjectController(req: Request, res: Response) {
  try {
    const project = await createProjectService(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}
