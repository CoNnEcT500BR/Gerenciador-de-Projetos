import { Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import { getUserByIdService, updateUserService } from './user.service.js';
import { z } from 'zod';

const updateProfileSchema = z.object({
  name: z.string().trim().min(1).max(120).optional(),
  email: z.string().trim().email().optional(),
  password: z.string().min(8).max(128).optional(),
  currentPassword: z.string().min(1).optional()
}).strict();

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return 'Erro desconhecido';
}

export async function updateMeController(req: AuthRequest, res: Response) {
  if (!req.user) return res.status(401).json({ error: 'Não autenticado' });
  const parsed = updateProfileSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Dados de perfil inválidos' });
  try {
    res.json(await updateUserService(req.user.userId, parsed.data));
  } catch (error) {
    res.status(400).json({ error: getErrorMessage(error) });
  }
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
