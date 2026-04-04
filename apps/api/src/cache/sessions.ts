// ── Session Cache ───────────────────────────────
import { redis } from './client';

const PREFIX = 'session';
const TTL = 7 * 24 * 60 * 60; // 7 days

export async function getSession(userId: string): Promise<string | null> {
  return redis.get(`${PREFIX}:${userId}`);
}

export async function setSession(userId: string, data: string): Promise<void> {
  await redis.set(`${PREFIX}:${userId}`, data, 'EX', TTL);
}

export async function deleteSession(userId: string): Promise<void> {
  await redis.del(`${PREFIX}:${userId}`);
}
