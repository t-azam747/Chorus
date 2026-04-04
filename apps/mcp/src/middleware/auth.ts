// ── MCP Auth Middleware ──────────────────────────

export interface AuthContext {
  userId: string;
  token: string;
}

export function authenticateRequest(headers: Record<string, string>): AuthContext | null {
  const token = headers['authorization']?.replace('Bearer ', '');
  if (!token) return null;

  // In production: verify JWT token
  return { userId: 'placeholder', token };
}
