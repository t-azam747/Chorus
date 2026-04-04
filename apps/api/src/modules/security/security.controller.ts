// ── Security Controller ─────────────────────────
import type { Request, Response } from 'express';
import { SecurityService } from './security.service';
import { logger } from '../../observability/logger';

const securityService = new SecurityService();

export class SecurityController {
  async getReport(req: Request, res: Response) {
    try {
      const report = await securityService.getReport(req.params.id);
      if (!report) return res.status(404).json({ error: 'Security report not found' });
      return res.json(report);
    } catch (err) {
      logger.error({ err }, 'Failed to get security report');
      return res.status(500).json({ error: 'Failed to retrieve security report' });
    }
  }
}
