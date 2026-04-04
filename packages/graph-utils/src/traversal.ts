// ── Graph Traversal Algorithms ───────────────────

import type { GraphNode, GraphEdge } from '@chorus/shared-types';

/**
 * Breadth-first search starting from a given node.
 */
export function bfs(
  startId: string,
  nodes: GraphNode[],
  edges: GraphEdge[],
): GraphNode[] {
  const adjacency = buildAdjacencyList(edges);
  const visited = new Set<string>();
  const queue: string[] = [startId];
  const result: GraphNode[] = [];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  while (queue.length > 0) {
    const current = queue.shift()!;
    if (visited.has(current)) continue;
    visited.add(current);

    const node = nodeMap.get(current);
    if (node) result.push(node);

    const neighbors = adjacency.get(current) ?? [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }
  }

  return result;
}

/**
 * Depth-first search starting from a given node.
 */
export function dfs(
  startId: string,
  nodes: GraphNode[],
  edges: GraphEdge[],
): GraphNode[] {
  const adjacency = buildAdjacencyList(edges);
  const visited = new Set<string>();
  const result: GraphNode[] = [];
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  function visit(id: string) {
    if (visited.has(id)) return;
    visited.add(id);

    const node = nodeMap.get(id);
    if (node) result.push(node);

    const neighbors = adjacency.get(id) ?? [];
    for (const neighbor of neighbors) {
      visit(neighbor);
    }
  }

  visit(startId);
  return result;
}

/**
 * Computes centrality scores for all nodes (degree centrality).
 */
export function computeCentrality(
  nodes: GraphNode[],
  edges: GraphEdge[],
): Map<string, number> {
  const centrality = new Map<string, number>();
  const n = nodes.length;

  for (const node of nodes) {
    centrality.set(node.id, 0);
  }

  for (const edge of edges) {
    centrality.set(edge.source, (centrality.get(edge.source) ?? 0) + 1);
    centrality.set(edge.target, (centrality.get(edge.target) ?? 0) + 1);
  }

  // Normalize by maximum possible connections
  if (n > 1) {
    for (const [id, score] of centrality) {
      centrality.set(id, score / (n - 1));
    }
  }

  return centrality;
}

/**
 * Clusters nodes into modules based on connectivity.
 */
export function clusterModules(
  nodes: GraphNode[],
  edges: GraphEdge[],
): Map<string, GraphNode[]> {
  const clusters = new Map<string, GraphNode[]>();
  const visited = new Set<string>();

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      const component = bfs(node.id, nodes, edges);
      component.forEach((n) => visited.add(n.id));
      const clusterId = `cluster-${clusters.size}`;
      clusters.set(clusterId, component);
    }
  }

  return clusters;
}

function buildAdjacencyList(edges: GraphEdge[]): Map<string, string[]> {
  const adjacency = new Map<string, string[]>();
  for (const edge of edges) {
    if (!adjacency.has(edge.source)) adjacency.set(edge.source, []);
    if (!adjacency.has(edge.target)) adjacency.set(edge.target, []);
    adjacency.get(edge.source)!.push(edge.target);
    adjacency.get(edge.target)!.push(edge.source);
  }
  return adjacency;
}
