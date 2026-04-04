// ── Graph Snapshot Cache ────────────────────────
import type { DiagramData, GraphLevel } from '@chorus/shared-types';
import { redis } from './client';

const PREFIX = 'graph';
const TTL = 6 * 60 * 60; // 6 hours

export async function getCachedGraph(repoId: string, level: GraphLevel, commitSha: string): Promise<DiagramData | null> {
  const data = await redis.get(`${PREFIX}:${repoId}:${level}:${commitSha}`);
  return data ? JSON.parse(data) : null;
}

export async function setCachedGraph(repoId: string, level: GraphLevel, commitSha: string, graph: DiagramData): Promise<void> {
  await redis.set(`${PREFIX}:${repoId}:${level}:${commitSha}`, JSON.stringify(graph), 'EX', TTL);
}
