// ── Branch Controller ───────────────────────────
import type { Request, Response } from 'express';
import { BranchService } from './branch.service';
import { logger } from '../../observability/logger';

const branchService = new BranchService();

export class BranchController {
  async getBranchContext(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const branch = (req.query.branch as string) || 'main';
      const files = req.query.files ? (req.query.files as string).split(',') : undefined;
      const context = await branchService.getBranchContext(id, branch, files);
      if (!context) return res.status(404).json({ error: 'Branch context not found' });
      return res.json(context);
    } catch (err) {
      logger.error({ err }, 'Failed to get branch context');
      return res.status(500).json({ error: 'Failed to retrieve branch context' });
    }
  }
}
