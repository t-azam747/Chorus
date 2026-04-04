// ── RAG Chunker ─────────────────────────────────
import { chunkFile } from '@chorus/tree-sitter-utils';
import type { CodeChunk } from '@chorus/shared-types';

export async function chunkCode(
  filePath: string,
  source: string,
  language: string,
  repoId: string,
): Promise<Omit<CodeChunk, 'id' | 'embedding'>[]> {
  const rawChunks = await chunkFile(filePath, source, language);
  return rawChunks.map((chunk) => ({ ...chunk, repoId }));
}
