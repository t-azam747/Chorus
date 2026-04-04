'use client';
// ── Architecture Graph Component ────────────────
import React from 'react';

interface ArchitectureGraphProps {
  repoId: string;
  level?: 'file' | 'module' | 'service';
}

export const ArchitectureGraph: React.FC<ArchitectureGraphProps> = ({ repoId, level = 'module' }) => {
  return (
    <div className="w-full h-full border rounded-lg bg-gray-50">
      {/* ReactFlow canvas for architecture diagram */}
      <p className="p-4 text-gray-500">Architecture diagram for {repoId} at {level} level</p>
    </div>
  );
};
