'use client';
import { useState, useEffect, useCallback } from 'react';
import type { BranchContext } from '@chorus/shared-types';
import { createWebSocket } from '../lib/websocket';

export function useBranchContext(repoId: string) {
  const [context, setContext] = useState<BranchContext | null>(null);

  useEffect(() => {
    const ws = createWebSocket(repoId);
    ws.onMessage('branch:activity', (data) => setContext(data as BranchContext));
    return () => ws.close();
  }, [repoId]);

  return context;
}
