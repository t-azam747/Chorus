// ── Branch Module Routes ────────────────────────
import { Router } from 'express';
import { BranchController } from './branch.controller';

const router = Router();
const controller = new BranchController();

router.get('/:id/branch-context', controller.getBranchContext);

export { router as branchRoutes };
