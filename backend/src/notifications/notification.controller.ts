import { Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import {
  getNotificationsService,
  markAllNotificationsReadService,
  markNotificationReadService
} from './notification.service.js';

export async function getNotificationsController(req: AuthRequest, res: Response) {
  res.json(await getNotificationsService(req.user!.userId));
}

export async function markNotificationReadController(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });
  await markNotificationReadService(req.user!.userId, id);
  res.status(204).send();
}

export async function markAllNotificationsReadController(req: AuthRequest, res: Response) {
  await markAllNotificationsReadService(req.user!.userId);
  res.status(204).send();
}
