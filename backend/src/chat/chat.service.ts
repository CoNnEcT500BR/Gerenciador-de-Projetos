import prisma from '../prisma/client.js';
import type { Prisma } from '@prisma/client';

type MessageWithAttachment = Prisma.MessageGetPayload<{
  include: { user: { select: { id: true; name: true } }; attachment: true };
}>;

function serializeMessage(message: MessageWithAttachment) {
  return {
    ...message,
    attachment: message.attachment
      ? { id: message.attachment.id, originalName: message.attachment.originalName, mimeType: message.attachment.mimeType, size: message.attachment.size, downloadUrl: `/chat/attachments/${message.attachment.id}/download` }
      : null
  };
}

export async function getProjectMessagesService(userId: number, projectId: number, cursor?: number) {
  const member = await prisma.projectMember.findUnique({
    where: { userId_projectId: { userId, projectId } }
  });
  if (!member) throw new Error('Você não é membro deste projeto');

  const messages = await prisma.message.findMany({
    where: { projectId },
    orderBy: { createdAt: 'desc' },
    take: 50,
    ...(cursor ? { skip: 1, cursor: { id: cursor } } : {}),
    include: { user: { select: { id: true, name: true } }, attachment: true }
  });

  return messages.reverse().map(serializeMessage);
}

export async function createMessageService(userId: number, projectId: number, content: string, attachmentId?: number) {
  const member = await prisma.projectMember.findUnique({
    where: { userId_projectId: { userId, projectId } }
  });
  if (!member) throw new Error('Você não é membro deste projeto');

  if (!content.trim() && !attachmentId) throw new Error('Mensagem ou arquivo é obrigatório');
  if (attachmentId) {
    const attachment = await prisma.attachment.findFirst({ where: { id: attachmentId, projectId, messageId: null } });
    if (!attachment) throw new Error('Anexo inválido');
  }
  const message = await prisma.message.create({
    data: { userId, projectId, content, ...(attachmentId ? { attachment: { connect: { id: attachmentId } } } : {}) },
    include: { user: { select: { id: true, name: true } }, attachment: true }
  });
  return serializeMessage(message);
}
