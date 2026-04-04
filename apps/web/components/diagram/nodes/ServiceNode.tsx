import React from 'react';
export const ServiceNode: React.FC<{ data: { label: string } }> = ({ data }) => (
  <div className="px-6 py-4 rounded-xl border-2 bg-purple-50 border-purple-300 font-bold">{data.label}</div>
);
