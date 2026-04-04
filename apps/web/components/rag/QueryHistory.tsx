import React from 'react';
export const QueryHistory: React.FC<{ queries: Array<{ question: string; timestamp: Date }> }> = ({ queries }) => (
  <div className="space-y-2">
    {queries.map((q, i) => (
      <div key={i} className="p-2 text-sm text-gray-600 hover:bg-gray-50 rounded cursor-pointer">{q.question}</div>
    ))}
  </div>
);
