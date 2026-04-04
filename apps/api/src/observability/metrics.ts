// ── Custom Metrics ──────────────────────────────

export const metrics = {
  ragRetrievalScore: (score: number) => {
    // Placeholder: record retrieval quality metric
    void score;
  },
  ragLatency: (durationMs: number) => {
    void durationMs;
  },
  graphBuildDuration: (durationMs: number) => {
    void durationMs;
  },
  indexingDuration: (durationMs: number) => {
    void durationMs;
  },
  chunkCount: (count: number) => {
    void count;
  },
};
