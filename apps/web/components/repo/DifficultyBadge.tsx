import React from 'react';
export const DifficultyBadge: React.FC<{ label: string; score: number }> = ({ label, score }) => {
  const colors: Record<string, string> = { beginner: 'bg-green-100 text-green-800', intermediate: 'bg-yellow-100 text-yellow-800', advanced: 'bg-orange-100 text-orange-800', expert: 'bg-red-100 text-red-800' };
  return <span className={`px-2 py-1 rounded text-xs font-medium ${colors[label] || ''}`}>{label} ({score}/10)</span>;
};
