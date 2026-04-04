// ── Graph Layout Computation ─────────────────────

import type { GraphNode, GraphEdge, LayoutOptions } from '@chorus/shared-types';

const DEFAULT_LAYOUT_OPTIONS: LayoutOptions = {
  direction: 'TB',
  algorithm: 'dagre',
  nodeSpacing: 50,
  rankSpacing: 100,
};

/**
 * Computes layout positions for all nodes using the specified algorithm.
 */
export function computeLayout(
  nodes: GraphNode[],
  edges: GraphEdge[],
  options?: Partial<LayoutOptions>,
): GraphNode[] {
  const opts = { ...DEFAULT_LAYOUT_OPTIONS, ...options };

  if (opts.algorithm === 'elk') {
    return createElkLayout(nodes, edges, opts);
  }
  return createDagreLayout(nodes, edges, opts);
}

/**
 * Computes layout using Dagre (hierarchical layout).
 */
export function createDagreLayout(
  nodes: GraphNode[],
  _edges: GraphEdge[],
  options: LayoutOptions,
): GraphNode[] {
  // Placeholder: actual Dagre layout computation
  // In production: use dagre to compute x,y positions
  return nodes.map((node, index) => ({
    ...node,
    position: {
      x: (index % 5) * options.nodeSpacing * 4,
      y: Math.floor(index / 5) * options.rankSpacing,
    },
  }));
}

/**
 * Computes layout using ELK.js (more advanced layout options).
 */
export function createElkLayout(
  nodes: GraphNode[],
  _edges: GraphEdge[],
  options: LayoutOptions,
): GraphNode[] {
  // Placeholder: actual ELK.js layout computation
  return nodes.map((node, index) => ({
    ...node,
    position: {
      x: (index % 4) * options.nodeSpacing * 5,
      y: Math.floor(index / 4) * options.rankSpacing * 1.5,
    },
  }));
}
