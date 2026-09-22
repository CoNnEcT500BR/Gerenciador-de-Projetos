import fs from 'node:fs';
import path from 'node:path';
import { Request, Response } from 'express';
import { AuthRequest } from '../auth/auth.middleware.js';
import { ATTACHMENT_DIR, getAttachment, saveAttachment } from './attachment.service.js';

export async function uploadAttachmentController(req: AuthRequest, res: Response) {
  const projectId = Number(req.params.projectId);
  const file = (req as Request & { file?: Express.Multer.File }).file;
  if (!Number.isInteger(projectId) || !file) return res.status(400).json({ error: 'Arquivo inválido' });
  try {
    const attachment = await saveAttachment(req.user!.userId, projectId, file);
    return res.status(201).json({ attachment });
  } catch (error) {
    return res.status(400).json({ error: error instanceof Error ? error.message : 'Não foi possível enviar o arquivo' });
  }
}

export async function downloadAttachmentController(req: AuthRequest, res: Response) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Arquivo inválido' });
  try {
    const attachment = await getAttachment(req.user!.userId, id);
    const filePath = path.join(ATTACHMENT_DIR, attachment.storedName);
    if (!fs.existsSync(filePath)) return res.status(404).json({ error: 'Arquivo não encontrado' });
    res.type(attachment.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${attachment.originalName.replace(/["\r\n]/g, '')}"`);
    return res.sendFile(filePath);
  } catch (error) {
    return res.status(403).json({ error: error instanceof Error ? error.message : 'Acesso negado' });
  }
}
