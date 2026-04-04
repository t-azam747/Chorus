// ── User Module Routes ──────────────────────────
import { Router } from 'express';
import { UserController } from './user.controller';

const router = Router();
const controller = new UserController();

router.get('/profile', controller.getProfile);
router.get('/skill-profile', controller.getSkillProfile);

export { router as userRoutes };
