// ── MCP Tool: get_data_flow_diagram ──────────────
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../client';
import type { GetDataFlowDiagramOutput } from '@chorus/shared-types';

export function registerGetDataFlowDiagram(server: McpServer) {
  server.tool(
    'get_data_flow_diagram',
    'Get the data flow diagram for a specific entrypoint, showing how data flows through the codebase with certainty annotations.',
    { repoId: z.string(), entrypoint: z.string().describe('File path or function name to trace data flow from') },
    async ({ repoId, entrypoint }) => {
      const result = await apiRequest<GetDataFlowDiagramOutput>(`/repo/${repoId}/graph?entrypoint=${entrypoint}`);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    },
  );
}
