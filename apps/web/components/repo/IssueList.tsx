import React from 'react';
import type { BeginnerIssue } from '@chorus/shared-types';
export const IssueList: React.FC<{ issues: BeginnerIssue[] }> = ({ issues }) => (
  <ul className="space-y-2">{issues.map((i) => (
    <li key={i.issueNumber} className="p-2 border rounded text-sm">
      <a href={i.url} target="_blank" className="text-blue-600 hover:underline">#{i.issueNumber}: {i.title}</a>
      <div className="flex gap-1 mt-1">{i.labels.map((l) => <span key={l} className="px-1 bg-gray-100 rounded text-xs">{l}</span>)}</div>
    </li>
  ))}</ul>
);
