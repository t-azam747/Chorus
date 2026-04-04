// ── Graph Dependency Extractor ───────────────────
import { extractImports, extractExports } from '@chorus/tree-sitter-utils';
import type { GraphNode, GraphEdge } from '@chorus/shared-types';

export function extractDependencyGraph(
  files: Array<{ path: string; content: string; language: string }>,
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const nodes: GraphNode[] = [];
  const edges: GraphEdge[] = [];

  for (const file of files) {
    nodes.push({
      id: file.path,
      label: file.path.split('/').pop() || file.path,
      type: 'file',
      level: 'file',
      filePath: file.path,
      language: file.language,
      linesOfCode: file.content.split('\n').length,
      position: { x: 0, y: 0 },
      metadata: {},
    });
  }

  // In production: use tree-sitter to extract actual import/export relationships
  return { nodes, edges };
}
