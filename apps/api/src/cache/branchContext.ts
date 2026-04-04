// ── Branch Context Cache ────────────────────────
import type { BranchContext } from '@chorus/shared-types';
import { redis } from './client';

const PREFIX = 'branch-context';
const TTL = 60 * 60; // 1 hour

export async function getCachedBranchContext(repoId: string, commitSha: string): Promise<BranchContext | null> {
  const data = await redis.get(`${PREFIX}:${repoId}:${commitSha}`);
  return data ? JSON.parse(data) : null;
}

export async function setCachedBranchContext(repoId: string, commitSha: string, context: BranchContext): Promise<void> {
  await redis.set(`${PREFIX}:${repoId}:${commitSha}`, JSON.stringify(context), 'EX', TTL);
}
