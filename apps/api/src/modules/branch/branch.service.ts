// ── Branch Service ──────────────────────────────
import type { BranchContext } from '@chorus/shared-types';
import { getCachedBranchContext, setCachedBranchContext } from '../../cache/branchContext';

export class BranchService {
  async getBranchContext(repoId: string, branch: string, files?: string[]): Promise<BranchContext | null> {
    const commitSha = 'latest'; // In production: resolve from git
    const cached = await getCachedBranchContext(repoId, commitSha);
    if (cached) return cached;

    // Compute branch context from git data
    const context: BranchContext = {
      repoId,
      currentBranch: branch,
      commitSha,
      activeBranches: [],
      conflicts: [],
      generatedAt: new Date(),
    };

    await setCachedBranchContext(repoId, commitSha, context);
    return context;
  }
}
