// ── RAG Controller ──────────────────────────────
import type { Request, Response } from 'express';
import { RagService } from './rag.service';
import { logger } from '../../observability/logger';

const ragService = new RagService();

export class RagController {
  async query(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { question, maxCitations, filters } = req.body;
      if (!question) return res.status(400).json({ error: 'Question is required' });

      const response = await ragService.query({ repoId: id, question, maxCitations, filters });
      return res.json(response);
    } catch (err) {
      logger.error({ err }, 'Failed to process RAG query');
      return res.status(500).json({ error: 'Failed to process query' });
    }
  }
}
