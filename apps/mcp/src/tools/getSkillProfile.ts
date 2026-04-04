// ── MCP Tool: get_skill_profile ──────────────────
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiRequest } from '../client';
import type { GetSkillProfileOutput } from '@chorus/shared-types';

export function registerGetSkillProfile(server: McpServer) {
  server.tool(
    'get_skill_profile',
    'Get the skill profile for a developer including language proficiency, framework experience, and contribution stats.',
    { userId: z.string() },
    async ({ userId }) => {
      const result = await apiRequest<GetSkillProfileOutput>(`/user/skill-profile?userId=${userId}`);
      return { content: [{ type: 'text' as const, text: JSON.stringify(result, null, 2) }] };
    },
  );
}
