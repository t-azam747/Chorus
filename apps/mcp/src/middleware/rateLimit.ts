// ── MCP Rate Limiting ───────────────────────────

const rateLimits = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 60;

export function checkRateLimit(clientId: string): boolean {
  const now = Date.now();
  const entry = rateLimits.get(clientId);

  if (!entry || now > entry.resetAt) {
    rateLimits.set(clientId, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS) return false;

  entry.count++;
  return true;
}
