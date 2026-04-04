// ── Redis Client ────────────────────────────────
import Redis from 'ioredis';
import { config } from '../config';
import { logger } from '../observability/logger';

export const redis = new Redis(config.redis.url, {
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 5000);
    return delay;
  },
});

redis.on('connect', () => logger.info('Connected to Redis'));
redis.on('error', (err) => logger.error({ err }, 'Redis error'));
