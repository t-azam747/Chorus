// ── RAG Module Routes ───────────────────────────
import { Router } from 'express';
import { RagController } from './rag.controller';

const router = Router();
const controller = new RagController();

router.post('/:id/query', controller.query);

export { router as ragRoutes };
