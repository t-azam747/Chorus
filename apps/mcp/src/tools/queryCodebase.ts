// ── MCP Tool: query_codebase ─────────────────────
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../client';
import type { QueryCodebaseOutput } from '@chorus/shared-types';

export function registerQueryCodebase(server: McpServer) {
  server.tool(
    'query_codebase',
    'Ask a natural language question about a repository and get a grounded answer with file citations.',
    { repoId: z.string().describe('Repository ID'), question: z.string().describe('Natural language question about the codebase') },
    async ({ repoId, question }) => {
      const result = await apiRequest<QueryCodebaseOutput>(`/repo/${repoId}/query`, {
        method: 'POST',
        body: JSON.stringify({ question }),
      });
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    },
  );
}
