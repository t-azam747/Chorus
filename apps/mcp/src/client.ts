// ── MCP → API Client ────────────────────────────

const API_URL = process.env.MCP_API_URL || 'http://localhost:3001';

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_URL}/api${path}`;
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`API request failed (${response.status}): ${error}`);
  }

  return response.json() as Promise<T>;
}
