import { Request, Response } from 'express';
import { createTaskService, getTasksService } from './task.service.js';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erro desconhecido';
}

export async function getTasksController(req: Request, res: Response) {
  try {
    const tasks = await getTasksService();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function createTaskController(req: Request, res: Response) {
  try {
    const task = await createTaskService(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}
