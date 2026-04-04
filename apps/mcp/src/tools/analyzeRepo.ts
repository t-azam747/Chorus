// ── MCP Tool: analyze_repository ─────────────────
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../client';
import type { AnalyzeRepoOutput } from '@chorus/shared-types';

export function registerAnalyzeRepo(server: McpServer) {
  server.tool(
    'analyze_repository',
    'Analyze a GitHub repository: clone, index code, build dependency graph, and generate analysis report.',
    { url: z.string().url().describe('GitHub repository URL'), branch: z.string().optional().describe('Branch to analyze') },
    async ({ url, branch }) => {
      const result = await apiRequest<AnalyzeRepoOutput>('/repo/analyze', {
        method: 'POST',
        body: JSON.stringify({ url, branch }),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    },
  );
}
