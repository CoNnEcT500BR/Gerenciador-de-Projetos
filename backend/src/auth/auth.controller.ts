import { Request, Response } from 'express';
import { loginService, registerService } from './auth.service.js';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erro desconhecido';
}

export async function loginController(req: Request, res: Response) {
  try {
    const result = await loginService(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}

export async function registerController(req: Request, res: Response) {
  try {
    const result = await registerService(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
}
