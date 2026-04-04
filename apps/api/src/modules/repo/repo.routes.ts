// ── Repo Module Routes ──────────────────────────

import { Router } from 'express';
import { RepoController } from './repo.controller';

const router = Router();
const controller = new RepoController();

router.post('/analyze', controller.analyze);
router.get('/:id', controller.getById);
router.get('/', controller.list);

export { router as repoRoutes };
