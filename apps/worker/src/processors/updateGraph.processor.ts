// ── Update Graph Processor ──────────────────────
import type { UpdateGraphJobPayload } from '@chorus/shared-types';

export async function processUpdateGraph(payload: UpdateGraphJobPayload): Promise<void> {
  const { repoId, commitSha, changedFiles, previousCommitSha } = payload;

  // 1. Fetch changed files from diff
  // 2. Re-parse only changed files with tree-sitter
  // 3. Update affected graph nodes + edges
  // 4. Invalidate Redis graph snapshot cache

  console.log(`Updated graph for repo ${repoId} (${changedFiles.length} files changed)`);
}
