// ── MCP Tool: get_security_report ────────────────
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../client';
import type { GetSecurityReportOutput } from '@chorus/shared-types';

export function registerGetSecurityReport(server: McpServer) {
  server.tool(
    'get_security_report',
    'Get the latest security report for a repository including vulnerabilities, secret findings, and license info.',
    { repoId: z.string() },
    async ({ repoId }) => {
      const result = await apiRequest<GetSecurityReportOutput>(`/repo/${repoId}/security`);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    },
  );
}
