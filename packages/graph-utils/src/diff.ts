// ── Graph Diffing ────────────────────────────────

import type { GraphNode, GraphEdge } from '@chorus/shared-types';

export interface GraphDiff {
  addedNodes: GraphNode[];
  removedNodes: GraphNode[];
  changedNodes: Array<{ before: GraphNode; after: GraphNode }>;
  addedEdges: GraphEdge[];
  removedEdges: GraphEdge[];
  changedEdges: Array<{ before: GraphEdge; after: GraphEdge }>;
}

/**
 * Computes the diff between two graph snapshots.
 */
export function diffGraphs(
  before: { nodes: GraphNode[]; edges: GraphEdge[] },
  after: { nodes: GraphNode[]; edges: GraphEdge[] },
): GraphDiff {
  return {
    addedNodes: findChangedNodes(before.nodes, after.nodes).added,
    removedNodes: findChangedNodes(before.nodes, after.nodes).removed,
    changedNodes: findChangedNodes(before.nodes, after.nodes).changed,
    addedEdges: findChangedEdges(before.edges, after.edges).added,
    removedEdges: findChangedEdges(before.edges, after.edges).removed,
    changedEdges: findChangedEdges(before.edges, after.edges).changed,
  };
}

/**
 * Finds added, removed, and changed nodes between two snapshots.
 */
export function findChangedNodes(
  before: GraphNode[],
  after: GraphNode[],
): {
  added: GraphNode[];
  removed: GraphNode[];
  changed: Array<{ before: GraphNode; after: GraphNode }>;
} {
  const beforeMap = new Map(before.map((n) => [n.id, n]));
  const afterMap = new Map(after.map((n) => [n.id, n]));

  const added = after.filter((n) => !beforeMap.has(n.id));
  const removed = before.filter((n) => !afterMap.has(n.id));
  const changed: Array<{ before: GraphNode; after: GraphNode }> = [];

  for (const [id, beforeNode] of beforeMap) {
    const afterNode = afterMap.get(id);
    if (afterNode && JSON.stringify(beforeNode) !== JSON.stringify(afterNode)) {
      changed.push({ before: beforeNode, after: afterNode });
    }
  }

  return { added, removed, changed };
}

/**
 * Finds added, removed, and changed edges between two snapshots.
 */
export function findChangedEdges(
  before: GraphEdge[],
  after: GraphEdge[],
): {
  added: GraphEdge[];
  removed: GraphEdge[];
  changed: Array<{ before: GraphEdge; after: GraphEdge }>;
} {
  const beforeMap = new Map(before.map((e) => [e.id, e]));
  const afterMap = new Map(after.map((e) => [e.id, e]));

  const added = after.filter((e) => !beforeMap.has(e.id));
  const removed = before.filter((e) => !afterMap.has(e.id));
  const changed: Array<{ before: GraphEdge; after: GraphEdge }> = [];

  for (const [id, beforeEdge] of beforeMap) {
    const afterEdge = afterMap.get(id);
    if (afterEdge && JSON.stringify(beforeEdge) !== JSON.stringify(afterEdge)) {
      changed.push({ before: beforeEdge, after: afterEdge });
    }
  }

  return { added, removed, changed };
}
