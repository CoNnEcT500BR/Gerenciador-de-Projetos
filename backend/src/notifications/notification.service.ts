import prisma from '../prisma/client.js';
import { emitUserNotification, emitProjectEvent } from './realtime.js';

export async function getNotificationsService(userId: number) {
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: 50
  });
}

export async function markNotificationReadService(userId: number, notificationId: number) {
  return prisma.notification.updateMany({
    where: { id: notificationId, userId },
    data: { read: true }
  });
}

export async function markAllNotificationsReadService(userId: number) {
  return prisma.notification.updateMany({
    where: { userId, read: false },
    data: { read: true }
  });
}

export async function notifyProjectMembersService(
  projectId: number,
  content: string,
  excludeUserId?: number
) {
  const members = await prisma.projectMember.findMany({
    where: {
      projectId,
      ...(excludeUserId ? { userId: { not: excludeUserId } } : {})
    },
    select: { userId: true }
  });

  if (!members.length) return;

  const notifications = await Promise.all(members.map((member) => prisma.notification.create({
    data: { userId: member.userId, projectId, content }
  })));
  notifications.forEach((notification) => emitUserNotification(notification.userId, notification));
  emitProjectEvent(projectId, 'projectNotification', { projectId, content });
}
