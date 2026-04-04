// ── MCP Tool: get_architecture_diagram ───────────
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../client';
import type { GetArchitectureDiagramOutput } from '@chorus/shared-types';

export function registerGetArchitectureDiagram(server: McpServer) {
  server.tool(
    'get_architecture_diagram',
    'Get the dependency graph (nodes and edges) for a repository at file, module, or service level.',
    { repoId: z.string(), level: z.enum(['file', 'module', 'service']).optional() },
    async ({ repoId, level }) => {
      const params = level ? `?level=${level}` : '';
      const result = await apiRequest<GetArchitectureDiagramOutput>(`/repo/${repoId}/graph${params}`);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    },
  );
}
