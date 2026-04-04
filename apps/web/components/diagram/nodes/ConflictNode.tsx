import React from 'react';
export const ConflictNode: React.FC<{ data: { label: string; severity: string } }> = ({ data }) => (
  <div className="px-3 py-2 rounded border-2 bg-red-50 border-red-400 animate-pulse">
    <div className="font-medium text-red-700">{data.label}</div>
    <div className="text-xs text-red-500">Conflict: {data.severity}</div>
  </div>
);
