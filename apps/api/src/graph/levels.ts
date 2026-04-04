// ── Graph Level Aggregation ─────────────────────
import { aggregateToModuleLevel, aggregateToServiceLevel } from '@chorus/graph-utils';
import type { GraphNode, GraphEdge, GraphLevel } from '@chorus/shared-types';

export function aggregateGraph(
  nodes: GraphNode[],
  edges: GraphEdge[],
  targetLevel: GraphLevel,
): { nodes: GraphNode[]; edges: GraphEdge[] } {
  switch (targetLevel) {
    case 'module':
      return aggregateToModuleLevel(nodes, edges);
    case 'service':
      return aggregateToServiceLevel(nodes, edges);
    case 'file':
    default:
      return { nodes, edges };
  }
}
