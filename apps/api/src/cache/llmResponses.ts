// ── LLM Response Cache ──────────────────────────
import type { QueryRequest, QueryResponse } from '@chorus/shared-types';
import { redis } from './client';
import { createHash } from 'crypto';

const PREFIX = 'llm';
const TTL = 24 * 60 * 60; // 24 hours

function hashPrompt(request: QueryRequest): string {
  const key = `${request.repoId}:${request.question}:${JSON.stringify(request.filters ?? {})}`;
  return createHash('sha256').update(key).digest('hex').slice(0, 16);
}

export async function getCachedLLMResponse(request: QueryRequest): Promise<QueryResponse | null> {
  const hash = hashPrompt(request);
  const data = await redis.get(`${PREFIX}:${hash}`);
  return data ? JSON.parse(data) : null;
}

export async function setCachedLLMResponse(request: QueryRequest, response: QueryResponse): Promise<void> {
  const hash = hashPrompt(request);
  await redis.set(`${PREFIX}:${hash}`, JSON.stringify(response), 'EX', TTL);
}
