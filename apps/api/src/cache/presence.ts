// ── Presence Cache ──────────────────────────────
import { redis } from './client';

const PREFIX = 'presence';
const TTL = 5 * 60; // 5 minutes

export interface PresenceData {
  userId: string;
  username: string;
  activeFile?: string;
  cursor?: { line: number; column: number };
  lastSeen: Date;
}

export async function setPresence(repoId: string, userId: string, data: PresenceData): Promise<void> {
  await redis.set(`${PREFIX}:${repoId}:${userId}`, JSON.stringify(data), 'EX', TTL);
}

export async function getPresence(repoId: string, userId: string): Promise<PresenceData | null> {
  const data = await redis.get(`${PREFIX}:${repoId}:${userId}`);
  return data ? JSON.parse(data) : null;
}

export async function removePresence(repoId: string, userId: string): Promise<void> {
  await redis.del(`${PREFIX}:${repoId}:${userId}`);
}
