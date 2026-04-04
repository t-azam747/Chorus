'use client';
import React, { useState } from 'react';
export const QueryInput: React.FC<{ repoId: string; onSubmit: (q: string) => void }> = ({ repoId, onSubmit }) => {
  const [query, setQuery] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(query); }} className="flex gap-2">
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ask a question about the code..." className="flex-1 p-3 border rounded-lg" />
      <button type="submit" className="bg-blue-600 text-white px-4 rounded-lg">Ask</button>
    </form>
  );
};
