// ── Webhook Signature Verification ───────────────
import type { Request, Response, NextFunction } from 'express';
import { createHmac, timingSafeEqual } from 'crypto';
import { config } from '../config';
import { logger } from '../observability/logger';

export function verifyWebhookSignature(req: Request, res: Response, next: NextFunction): void {
  const signature = req.headers['x-hub-signature-256'] as string;
  const secret = config.github.webhookSecret;

  if (!secret) {
    logger.warn('Webhook secret not configured, skipping verification');
    next();
    return;
  }

  if (!signature) {
    res.status(401).json({ error: 'Missing webhook signature' });
    return;
  }

  const body = JSON.stringify(req.body);
  const expected = `sha256=${createHmac('sha256', secret).update(body).digest('hex')}`;

  const sigBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);

  if (sigBuffer.length !== expectedBuffer.length || !timingSafeEqual(sigBuffer, expectedBuffer)) {
    res.status(401).json({ error: 'Invalid webhook signature' });
    return;
  }

  next();
}
