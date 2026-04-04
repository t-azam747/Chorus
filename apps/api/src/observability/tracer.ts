// ── OpenTelemetry Tracer ────────────────────────

export function initTracer(): void {
  // Placeholder: OTel SDK setup
  // In production: configure NodeTracerProvider, BatchSpanProcessor, OTLPTraceExporter
}

export function createSpan(name: string, attributes?: Record<string, string>) {
  // Placeholder: create OTel span
  return {
    name,
    attributes,
    end: () => {},
    setStatus: (_status: unknown) => {},
  };
}
