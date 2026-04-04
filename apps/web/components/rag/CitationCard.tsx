import React from 'react';
import type { Citation } from '@chorus/shared-types';
export const CitationCard: React.FC<{ citation: Citation }> = ({ citation }) => (
  <div className="p-3 border rounded bg-gray-50 text-sm">
    <div className="font-mono text-xs text-blue-600 mb-1">{citation.filePath}:{citation.startLine}-{citation.endLine}</div>
    <pre className="text-xs overflow-x-auto">{citation.snippet}</pre>
  </div>
);
