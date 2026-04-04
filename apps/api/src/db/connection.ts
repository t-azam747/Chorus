// ── MongoDB Connection ──────────────────────────
import mongoose from 'mongoose';
import { config } from '../config';
import { logger } from '../observability/logger';

const MAX_RETRIES = 5;
const RETRY_DELAY_MS = 5000;

export async function connectDatabase(): Promise<void> {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      await mongoose.connect(config.mongodb.uri, { dbName: config.mongodb.dbName });
      logger.info('Connected to MongoDB');
      return;
    } catch (err) {
      retries++;
      logger.warn({ err, retries }, `MongoDB connection failed, retrying in ${RETRY_DELAY_MS}ms...`);
      if (retries >= MAX_RETRIES) throw err;
      await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
    }
  }
}

mongoose.connection.on('disconnected', () => logger.warn('MongoDB disconnected'));
mongoose.connection.on('error', (err) => logger.error({ err }, 'MongoDB error'));
