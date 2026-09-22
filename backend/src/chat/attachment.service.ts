import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import prisma from '../prisma/client.js';

export const MAX_ATTACHMENT_SIZE = 10 * 1024 * 1024;
export const ATTACHMENT_DIR = process.env.ATTACHMENT_DIR ?? path.resolve(process.cwd(), 'uploads');
const ALLOWED_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'application/pdf', 'text/plain']);

export function isAllowedMimeType(mimeType: string) {
  return ALLOWED_TYPES.has(mimeType);
}

export async function saveAttachment(userId: number, projectId: number, file: { originalname: string; mimetype: string; size: number; buffer: Buffer }) {
  const member = await prisma.projectMember.findUnique({ where: { userId_projectId: { userId, projectId } } });
  if (!member) throw new Error('Você não é membro deste projeto');
  if (file.size > MAX_ATTACHMENT_SIZE) throw new Error('O arquivo deve ter no máximo 10 MB');
  if (!isAllowedMimeType(file.mimetype)) throw new Error('Tipo de arquivo não permitido');

  await fs.mkdir(ATTACHMENT_DIR, { recursive: true });
  const storedName = `${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`;
  await fs.writeFile(path.join(ATTACHMENT_DIR, storedName), file.buffer);
  try {
    const attachment = await prisma.attachment.create({
      data: { originalName: path.basename(file.originalname), storedName, mimeType: file.mimetype, size: file.size, userId, projectId }
    });
    return { ...attachment, downloadUrl: `/chat/attachments/${attachment.id}/download` };
  } catch (error) {
    await fs.rm(path.join(ATTACHMENT_DIR, storedName), { force: true });
    throw error;
  }
}

export async function getAttachment(userId: number, id: number) {
  const attachment = await prisma.attachment.findUnique({ where: { id } });
  if (!attachment) throw new Error('Arquivo não encontrado');
  const member = await prisma.projectMember.findUnique({ where: { userId_projectId: { userId, projectId: attachment.projectId } } });
  if (!member) throw new Error('Acesso negado');
  return attachment;
}
