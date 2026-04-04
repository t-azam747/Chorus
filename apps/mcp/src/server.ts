// ── MCP Server Bootstrap ────────────────────────

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerAnalyzeRepo } from './tools/analyzeRepo';
import { registerQueryCodebase } from './tools/queryCodebase';
import { registerGetBranchContext } from './tools/getBranchContext';
import { registerGetArchitectureDiagram } from './tools/getArchitectureDiagram';
import { registerGetDataFlowDiagram } from './tools/getDataFlowDiagram';
import { registerGetSecurityReport } from './tools/getSecurityReport';
import { registerGetSkillProfile } from './tools/getSkillProfile';

const server = new McpServer({
  name: 'chorus',
  version: '0.1.0',
});

// Register all tools
registerAnalyzeRepo(server);
registerQueryCodebase(server);
registerGetBranchContext(server);
registerGetArchitectureDiagram(server);
registerGetDataFlowDiagram(server);
registerGetSecurityReport(server);
registerGetSkillProfile(server);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Chorus MCP server running on stdio');
}

main().catch(console.error);
