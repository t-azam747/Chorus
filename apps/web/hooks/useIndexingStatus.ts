'use client';
import { useState, useEffect } from 'react';
import type { IndexingProgress } from '@chorus/shared-types';
import { createWebSocket } from '../lib/websocket';

export function useIndexingStatus(repoId: string) {
  const [status, setStatus] = useState<IndexingProgress | null>(null);

  useEffect(() => {
    const ws = createWebSocket(repoId);
    ws.onMessage('indexing:progress', (data) => setStatus(data as IndexingProgress));
    ws.onMessage('indexing:complete', (data) => setStatus(data as IndexingProgress));
    return () => ws.close();
  }, [repoId]);

  return status;
}
