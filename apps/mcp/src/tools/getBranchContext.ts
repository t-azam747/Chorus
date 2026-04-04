// ── MCP Tool: get_branch_context ─────────────────
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../client';
import type { GetBranchContextOutput } from '@chorus/shared-types';

export function registerGetBranchContext(server: McpServer) {
  server.tool(
    'get_branch_context',
    'Get cross-branch awareness: see what other developers are working on and detect potential semantic conflicts.',
    { repoId: z.string(), branch: z.string(), files: z.array(z.string()).optional() },
    async ({ repoId, branch, files }) => {
      const params = new URLSearchParams({ branch });
      if (files?.length) params.set('files', files.join(','));
      const result = await apiRequest<GetBranchContextOutput>(`/repo/${repoId}/branch-context?${params}`);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    },
  );
}
