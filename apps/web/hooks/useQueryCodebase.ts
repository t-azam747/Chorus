'use client';
import { useState, useCallback } from 'react';
import type { QueryResponse } from '@chorus/shared-types';
import { apiClient } from '../lib/api-client';

export function useQueryCodebase(repoId: string) {
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const query = useCallback(async (question: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiClient.queryCodebase(repoId, question);
      setResponse(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [repoId]);

  return { response, loading, error, query };
}
