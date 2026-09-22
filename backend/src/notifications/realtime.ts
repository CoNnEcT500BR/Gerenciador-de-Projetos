import type { Server } from 'socket.io';

let io: Server | undefined;

export function registerRealtimeServer(server: Server) {
  io = server;
}

export function emitUserNotification(userId: number, notification: unknown) {
  io?.to(`user:${userId}`).emit('notification', notification);
}

export function emitProjectEvent(projectId: number, event: string, payload: unknown) {
  io?.to(`project:${projectId}`).emit(event, payload);
}
