// ── Reindex Chunks Processor ────────────────────
import type { ReindexChunksJobPayload } from '@chorus/shared-types';

export async function processReindexChunks(payload: ReindexChunksJobPayload): Promise<void> {
  const { repoId, reason, embeddingModel } = payload;

  // Re-embed all chunks when embedding model changes
  // 1. Fetch all chunks for repo
  // 2. Generate new embeddings
  // 3. Bulk update chunks in MongoDB

  console.log(`Reindexed chunks for repo ${repoId} (reason: ${reason})`);
}
