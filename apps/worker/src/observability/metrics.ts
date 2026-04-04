// ── Worker Metrics ──────────────────────────────
export const workerMetrics = {
  jobDuration: (queue: string, durationMs: number) => { void queue; void durationMs; },
  jobSuccess: (queue: string) => { void queue; },
  jobFailure: (queue: string) => { void queue; },
  chunkCount: (repoId: string, count: number) => { void repoId; void count; },
};
