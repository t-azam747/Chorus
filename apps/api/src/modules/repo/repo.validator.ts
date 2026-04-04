// ── Repo Input Validation ────────────────────────

import { z } from 'zod';

export const analyzeRepoSchema = z.object({
  url: z
    .string()
    .url()
    .regex(/^https:\/\/github\.com\/[\w.-]+\/[\w.-]+/, 'Must be a valid GitHub repository URL'),
  branch: z.string().optional(),
});

export type AnalyzeRepoInput = z.infer<typeof analyzeRepoSchema>;
