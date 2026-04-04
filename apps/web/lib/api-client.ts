// ── API Client ──────────────────────────────────
import type { DiagramData, GraphLevel, QueryResponse, Repository, SecurityReport, BranchContext, SkillProfile } from '@chorus/shared-types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const apiClient = {
  analyzeRepo: (url: string) => request<{ repo: Repository; jobId: string }>('/repo/analyze', { method: 'POST', body: JSON.stringify({ url }) }),
  getRepo: (id: string) => request<Repository>(`/repo/${id}`),
  getGraph: (repoId: string, level: GraphLevel) => request<DiagramData>(`/repo/${repoId}/graph?level=${level}`),
  queryCodebase: (repoId: string, question: string) => request<QueryResponse>(`/repo/${repoId}/query`, { method: 'POST', body: JSON.stringify({ question }) }),
  getBranchContext: (repoId: string, branch: string) => request<BranchContext>(`/repo/${repoId}/branch-context?branch=${branch}`),
  getSecurityReport: (repoId: string) => request<SecurityReport>(`/repo/${repoId}/security`),
  getSkillProfile: (userId: string) => request<SkillProfile>(`/user/skill-profile?userId=${userId}`),
};
