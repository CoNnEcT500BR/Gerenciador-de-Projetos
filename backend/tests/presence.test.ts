import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { PresenceTracker } from '../src/chat/presence.js';

describe('PresenceTracker', () => {
  it('counts distinct users, not sockets or repeated joins', () => {
    const presence = new PresenceTracker();

    assert.equal(presence.join('project:4', 1, 'socket-a'), 1);
    assert.equal(presence.join('project:4', 1, 'socket-a'), 1);
    assert.equal(presence.join('project:4', 1, 'socket-b'), 1);
    assert.equal(presence.join('project:4', 2, 'socket-c'), 2);
  });

  it('keeps a user online until their last socket leaves', () => {
    const presence = new PresenceTracker();
    presence.join('project:4', 1, 'socket-a');
    presence.join('project:4', 1, 'socket-b');
    presence.join('project:4', 2, 'socket-c');

    assert.deepEqual(presence.leave('socket-a'), []);
    assert.deepEqual(presence.leave('socket-c'), [{ room: 'project:4', count: 1 }]);
    assert.deepEqual(presence.leave('socket-b'), [{ room: 'project:4', count: 0 }]);
  });
});
