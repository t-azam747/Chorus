import React from 'react';
export const EmptyState: React.FC<{ title: string; description?: string; action?: ReactNode }> = ({ title, description, action }) => (
  <div className="flex flex-col items-center justify-center p-12 text-center">
    <h3 className="text-lg font-medium text-gray-900 mb-1">{title}</h3>
    {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
    {action}
  </div>
);
import type { ReactNode } from 'react';
