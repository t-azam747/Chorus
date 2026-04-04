import React from 'react';
export const ModuleNode: React.FC<{ data: { label: string; fileCount?: number } }> = ({ data }) => (
  <div className="px-4 py-3 rounded-lg border-2 bg-blue-50 border-blue-200">
    <div className="font-semibold">{data.label}</div>
    {data.fileCount && <div className="text-xs text-gray-500">{data.fileCount} files</div>}
  </div>
);
