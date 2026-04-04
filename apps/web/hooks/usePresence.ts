'use client';
import { useState, useEffect } from 'react';
import { createWebSocket } from '../lib/websocket';

interface PresenceUser { userId: string; username: string; activeFile?: string; }

export function usePresence(repoId: string) {
  const [users, setUsers] = useState<PresenceUser[]>([]);

  useEffect(() => {
    const ws = createWebSocket(repoId);
    ws.onMessage('presence:update', (data) => {
      const user = data as PresenceUser;
      setUsers((prev) => {
        const filtered = prev.filter((u) => u.userId !== user.userId);
        return [...filtered, user];
      });
    });
    return () => ws.close();
  }, [repoId]);

  return users;
}
