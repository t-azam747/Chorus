import React from 'react';
export const FileNode: React.FC<{ data: { label: string; linesOfCode?: number; language?: string } }> = ({ data }) => (
  <div className="px-3 py-2 rounded border bg-white shadow-sm text-sm">
    <div className="font-medium">{data.label}</div>
    {data.linesOfCode && <div className="text-xs text-gray-500">{data.linesOfCode} LOC</div>}
  </div>
);
