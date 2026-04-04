// ── Graph Layout Engine ─────────────────────────
import { computeLayout as compute } from '@chorus/graph-utils';
import type { GraphNode, GraphEdge, LayoutOptions } from '@chorus/shared-types';

export function layoutGraph(
  nodes: GraphNode[],
  edges: GraphEdge[],
  options?: Partial<LayoutOptions>,
): GraphNode[] {
  return compute(nodes, edges, options);
}
