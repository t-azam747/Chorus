// ── Security Module Routes ──────────────────────
import { Router } from 'express';
import { SecurityController } from './security.controller';

const router = Router();
const controller = new SecurityController();

router.get('/:id/security', controller.getReport);

export { router as securityRoutes };
