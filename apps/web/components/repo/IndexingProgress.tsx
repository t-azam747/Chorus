import React from 'react';
export const IndexingProgress: React.FC<{ status: string; progress: number; step: string }> = ({ status, progress, step }) => (
  <div className="p-4 border rounded-lg">
    <div className="flex justify-between mb-2 text-sm"><span>{step}</span><span>{progress}%</span></div>
    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-blue-600 h-2 rounded-full transition-all" style={{ width: `${progress}%` }} /></div>
  </div>
);
