export interface PresenceUpdate {
  room: string;
  count: number;
}

export class PresenceTracker {
  private readonly usersByRoom = new Map<string, Map<number, Set<string>>>();

  join(room: string, userId: number, socketId: string) {
    const users = this.usersByRoom.get(room) ?? new Map<number, Set<string>>();
    const sockets = users.get(userId) ?? new Set<string>();
    sockets.add(socketId);
    users.set(userId, sockets);
    this.usersByRoom.set(room, users);
    return users.size;
  }

  leave(socketId: string): PresenceUpdate[] {
    const updates: PresenceUpdate[] = [];

    for (const [room, users] of this.usersByRoom) {
      const previousCount = users.size;
      for (const [userId, sockets] of users) {
        sockets.delete(socketId);
        if (sockets.size === 0) users.delete(userId);
      }

      if (users.size === 0) this.usersByRoom.delete(room);
      if (users.size !== previousCount) updates.push({ room, count: users.size });
    }

    return updates;
  }
}
