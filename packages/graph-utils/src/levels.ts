// ── Graph Level Aggregation ──────────────────────

import type { GraphNode, GraphEdge } from '@chorus/shared-types';

/**
 * Aggregates file-level nodes into module-level (directory) clusters.
 */
export function aggregateToModuleLevel(
  nodes: GraphNode[],
  edges: GraphEdge[],
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const moduleMap = new Map<string, GraphNode[]>();

  // Group file nodes by their parent directory
  for (const node of nodes) {
    if (node.filePath) {
      const dir = node.filePath.split('/').slice(0, -1).join('/') || '/';
      if (!moduleMap.has(dir)) moduleMap.set(dir, []);
      moduleMap.get(dir)!.push(node);
    }
  }

  // Create module nodes
  const moduleNodes: GraphNode[] = Array.from(moduleMap.entries()).map(
    ([dir, fileNodes], index) => ({
      id: `module-${index}`,
      label: dir.split('/').pop() || dir,
      type: 'module' as const,
      level: 'module' as const,
      filePath: dir,
      linesOfCode: fileNodes.reduce((sum, n) => sum + (n.linesOfCode ?? 0), 0),
      position: { x: 0, y: 0 },
      metadata: {
        fileCount: fileNodes.length,
        originalNodeIds: fileNodes.map((n) => n.id),
      },
    }),
  );

  // Create module-level edges (aggregate cross-directory edges)
  const moduleEdges = aggregateEdges(edges, nodes, moduleNodes);

  return { nodes: moduleNodes, edges: moduleEdges };
}

/**
 * Aggregates module-level nodes into service-level (top-level directory) groups.
 */
export function aggregateToServiceLevel(
  nodes: GraphNode[],
  edges: GraphEdge[],
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  const serviceMap = new Map<string, GraphNode[]>();

  for (const node of nodes) {
    if (node.filePath) {
      const topDir = node.filePath.split('/')[0] || 'root';
      if (!serviceMap.has(topDir)) serviceMap.set(topDir, []);
      serviceMap.get(topDir)!.push(node);
    }
  }

  const serviceNodes: GraphNode[] = Array.from(serviceMap.entries()).map(
    ([dir, moduleNodes], index) => ({
      id: `service-${index}`,
      label: dir,
      type: 'service' as const,
      level: 'service' as const,
      filePath: dir,
      linesOfCode: moduleNodes.reduce((sum, n) => sum + (n.linesOfCode ?? 0), 0),
      position: { x: 0, y: 0 },
      metadata: {
        moduleCount: moduleNodes.length,
        originalNodeIds: moduleNodes.map((n) => n.id),
      },
    }),
  );

  const serviceEdges = aggregateEdges(edges, nodes, serviceNodes);
  return { nodes: serviceNodes, edges: serviceEdges };
}

function aggregateEdges(
  originalEdges: GraphEdge[],
  originalNodes: GraphNode[],
  aggregatedNodes: GraphNode[],
): GraphEdge[] {
  // Placeholder: map original edges to aggregated node IDs
  void originalEdges;
  void originalNodes;
  void aggregatedNodes;
  return [];
}
