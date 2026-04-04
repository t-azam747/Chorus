import React from 'react';
import type { QueryResponse } from '@chorus/shared-types';
export const AnswerPanel: React.FC<{ response?: QueryResponse; loading?: boolean }> = ({ response, loading }) => {
  if (loading) return <div className="p-4 animate-pulse">Thinking...</div>;
  if (!response) return null;
  return (
    <div className="p-4 border rounded-lg mt-4">
      <p className="mb-4">{response.answer}</p>
      <div className="text-sm text-gray-500">
        {response.citations.length} citations · {response.processingTimeMs}ms · {Math.round(response.confidence * 100)}% confidence
      </div>
    </div>
  );
};
