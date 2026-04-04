'use client';
// ── Data Flow Graph Component ───────────────────
import React from 'react';

interface DataFlowGraphProps { repoId: string; entrypoint?: string; }

export const DataFlowGraph: React.FC<DataFlowGraphProps> = ({ repoId, entrypoint }) => {
  return (
    <div className="w-full h-full border rounded-lg bg-gray-50">
      <p className="p-4 text-gray-500">Data flow diagram for {repoId}</p>
    </div>
  );
};
