// ── BullMQ Queue Client ─────────────────────────
import { Queue } from 'bullmq';
import { redis } from '../cache/client';

export function createQueue<T>(name: string): Queue<T> {
  return new Queue<T>(name, {
    connection: redis,
    defaultJobOptions: {
      removeOnComplete: 100,
      removeOnFail: 50,
      attempts: 3,
      backoff: { type: 'exponential', delay: 5000 },
    },
  });
}
