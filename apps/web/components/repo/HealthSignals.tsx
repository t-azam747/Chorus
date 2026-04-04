import React from 'react';
import type { HealthSignal } from '@chorus/shared-types';
export const HealthSignals: React.FC<{ health: HealthSignal }> = ({ health }) => (
  <div className="grid grid-cols-3 gap-2 text-sm">
    <div>Score: {health.overallScore}</div>
    <div>Activity: {health.activityLevel}</div>
    <div>Contributors: {health.contributorCount}</div>
  </div>
);
