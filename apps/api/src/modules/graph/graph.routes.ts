// ── Graph Module Routes ─────────────────────────

import { Router } from 'express';
import { GraphController } from './graph.controller';

const router = Router();
const controller = new GraphController();

router.get('/:id/graph', controller.getGraph);

export { router as graphRoutes };
