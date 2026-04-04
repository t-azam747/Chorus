// ── Worker Tracer ───────────────────────────────
export function initWorkerTracer(): void {
  // Placeholder: OTel tracer for job stages
}

export function traceJobStage(jobId: string, stage: string) {
  return { jobId, stage, end: () => {} };
}
