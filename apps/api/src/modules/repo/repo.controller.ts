// ── Repo Controller ──────────────────────────────

import type { Request, Response } from 'express';
import { RepoService } from './repo.service';
import { analyzeRepoSchema } from './repo.validator';
import { logger } from '../../observability/logger';

const repoService = new RepoService();

export class RepoController {
  async analyze(req: Request, res: Response) {
    try {
      const parsed = analyzeRepoSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }

      const result = await repoService.analyzeRepo(parsed.data.url, req.body.userId);
      return res.status(202).json(result);
    } catch (err) {
      logger.error({ err }, 'Failed to analyze repo');
      return res.status(500).json({ error: 'Failed to analyze repository' });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const repo = await repoService.getRepoById(req.params.id);
      if (!repo) return res.status(404).json({ error: 'Repository not found' });
      return res.json(repo);
    } catch (err) {
      logger.error({ err }, 'Failed to get repo');
      return res.status(500).json({ error: 'Failed to retrieve repository' });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = parseInt(req.query.offset as string) || 0;
      const repos = await repoService.listRepos(limit, offset);
      return res.json(repos);
    } catch (err) {
      logger.error({ err }, 'Failed to list repos');
      return res.status(500).json({ error: 'Failed to list repositories' });
    }
  }
}
