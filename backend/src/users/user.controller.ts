import { Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import { getUserByIdService } from './user.service.js';

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erro desconhecido';
}

export async function getMeController(req: AuthRequest, res: Response) {
  if (!req.user) {
    return res.status(401).json({ error: 'Não autenticado' });
  }

  try {
    const user = await getUserByIdService(req.user.userId);
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: getErrorMessage(error) });
  }
}
