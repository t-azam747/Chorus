// ── Environment Configuration ────────────────────

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3001),
  MONGODB_URI: z.string().url(),
  MONGODB_DB_NAME: z.string().default('chorus'),
  REDIS_URL: z.string().url(),
  GEMINI_API_KEY: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  GITHUB_APP_ID: z.string().optional(),
  GITHUB_APP_PRIVATE_KEY: z.string().optional(),
  GITHUB_WEBHOOK_SECRET: z.string().optional(),
  JWT_SECRET: z.string().min(32),
  JWT_EXPIRY: z.string().default('7d'),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
  CORS_ORIGINS: z.string().default('http://localhost:3000'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

export const config = {
  env: parsed.data.NODE_ENV,
  port: parsed.data.PORT,
  mongodb: {
    uri: parsed.data.MONGODB_URI,
    dbName: parsed.data.MONGODB_DB_NAME,
  },
  redis: {
    url: parsed.data.REDIS_URL,
  },
  ai: {
    geminiApiKey: parsed.data.GEMINI_API_KEY,
    openaiApiKey: parsed.data.OPENAI_API_KEY,
  },
  github: {
    appId: parsed.data.GITHUB_APP_ID,
    privateKey: parsed.data.GITHUB_APP_PRIVATE_KEY,
    webhookSecret: parsed.data.GITHUB_WEBHOOK_SECRET,
  },
  auth: {
    jwtSecret: parsed.data.JWT_SECRET,
    jwtExpiry: parsed.data.JWT_EXPIRY,
  },
  otel: {
    endpoint: parsed.data.OTEL_EXPORTER_OTLP_ENDPOINT,
  },
  logLevel: parsed.data.LOG_LEVEL,
  corsOrigins: parsed.data.CORS_ORIGINS.split(','),
} as const;
