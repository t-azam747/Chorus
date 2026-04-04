// ── Repo Service ────────────────────────────────

import type { Repository, RepoAnalysis, IndexingProgress } from '@chorus/shared-types';
import { RepoModel } from '../../db/models/Repo.model';
import { indexRepoQueue } from '../../queue/indexRepo.queue';

export class RepoService {
  /**
   * Analyzes a repository by URL. Enqueues a background indexing job.
   */
  async analyzeRepo(repoUrl: string, userId: string): Promise<{ repo: Repository; jobId: string }> {
    // Check if repo already exists
    let repo = await RepoModel.findOne({ repoUrl });

    if (!repo) {
      // Parse owner/name from URL
      const [owner, name] = repoUrl.replace('https://github.com/', '').split('/');
      repo = await RepoModel.create({
        repoUrl,
        owner,
        name,
        defaultBranch: 'main',
        stars: 0,
        forks: 0,
        openIssues: 0,
      });
    }

    // Enqueue indexing job
    const job = await indexRepoQueue.add('index-repo', {
      repoId: repo.id,
      repoUrl,
      branch: repo.defaultBranch,
      userId,
    });

    return { repo: repo.toObject() as unknown as Repository, jobId: job.id! };
  }

  /**
   * Gets a repository by ID.
   */
  async getRepoById(repoId: string): Promise<Repository | null> {
    const repo = await RepoModel.findById(repoId);
    return repo ? (repo.toObject() as unknown as Repository) : null;
  }

  /**
   * Lists all analyzed repositories.
   */
  async listRepos(limit = 20, offset = 0): Promise<Repository[]> {
    const repos = await RepoModel.find()
      .sort({ updatedAt: -1 })
      .skip(offset)
      .limit(limit);
    return repos.map((r) => r.toObject() as unknown as Repository);
  }
}
