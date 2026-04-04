import React from 'react';
export const ConflictWarning: React.FC<{ severity: string; files: string[] }> = ({ severity, files }) => (
  <div className="p-3 bg-red-50 border border-red-200 rounded text-sm">
    <strong className="text-red-700">Conflict ({severity})</strong>
    <ul className="mt-1">{files.map((f) => <li key={f} className="text-red-600 font-mono text-xs">{f}</li>)}</ul>
  </div>
);
