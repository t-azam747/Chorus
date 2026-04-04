// ── Graph Service ───────────────────────────────

import type { DiagramData, GraphLevel } from '@chorus/shared-types';
import { GraphModel } from '../../db/models/Graph.model';
import { getCachedGraph, setCachedGraph } from '../../cache/graphSnapshots';

export class GraphService {
  async getGraph(repoId: string, level: GraphLevel = 'module', commitSha?: string): Promise<DiagramData | null> {
    // Try cache first
    if (commitSha) {
      const cached = await getCachedGraph(repoId, level, commitSha);
      if (cached) return cached;
    }

    // Fall back to MongoDB
    const query: Record<string, unknown> = { repoId, level };
    if (commitSha) query.commitSha = commitSha;

    const graph = await GraphModel.findOne(query).sort({ generatedAt: -1 });
    if (!graph) return null;

    const data = graph.toObject() as unknown as DiagramData;

    // Cache for next time
    if (data.commitSha) {
      await setCachedGraph(repoId, level, data.commitSha, data);
    }

    return data;
  }
}
