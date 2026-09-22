import { Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import { getProjectMessagesService } from './chat.service.js';

export async function getProjectMessagesController(req: AuthRequest, res: Response) {
  const projectId = Number(req.params.projectId);
  const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
  if (Number.isNaN(projectId) || (cursor !== undefined && Number.isNaN(cursor))) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  try {
    res.json(await getProjectMessagesService(req.user!.userId, projectId, cursor));
  } catch (error) {
    res.status(403).json({ error: error instanceof Error ? error.message : 'Acesso negado' });
  }
}
