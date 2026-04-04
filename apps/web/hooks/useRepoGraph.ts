// ── useRepoGraph Hook ───────────────────────────
'use client';
import { useState, useEffect } from 'react';
import type { DiagramData, GraphLevel } from '@chorus/shared-types';
import { apiClient } from '../lib/api-client';

export function useRepoGraph(repoId: string, level: GraphLevel = 'module') {
  const [data, setData] = useState<DiagramData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    apiClient.getGraph(repoId, level)
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [repoId, level]);

  return { data, loading, error };
}
