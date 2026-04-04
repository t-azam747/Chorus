// ── Webhook Routes ──────────────────────────────
import { Router } from 'express';
import { handlePush } from './push.handler';
import { handlePR } from './pr.handler';
import { verifyWebhookSignature } from './verify';

const router = Router();

router.post('/github', verifyWebhookSignature, (req, res) => {
  const event = req.headers['x-github-event'] as string;

  switch (event) {
    case 'push':
      handlePush(req.body);
      break;
    case 'pull_request':
      handlePR(req.body);
      break;
    default:
      break;
  }

  res.status(200).json({ received: true });
});

export { router as webhookRoutes };
