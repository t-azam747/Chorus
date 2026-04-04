import React from 'react';
export const BranchContextPanel: React.FC<{ repoId: string }> = ({ repoId }) => (
  <div className="border rounded-lg p-4">
    <h3 className="font-semibold mb-2">Active Branches</h3>
  </div>
);
