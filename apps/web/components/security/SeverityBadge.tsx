import React from 'react';
export const SeverityBadge: React.FC<{ severity: string }> = ({ severity }) => {
  const colors: Record<string, string> = { low: 'bg-blue-100 text-blue-800', medium: 'bg-yellow-100 text-yellow-800', high: 'bg-orange-100 text-orange-800', critical: 'bg-red-100 text-red-800' };
  return <span className={`px-2 py-0.5 rounded text-xs font-medium ${colors[severity] || ''}`}>{severity}</span>;
};
