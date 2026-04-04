'use client';
import React from 'react';
export const DiagramControls: React.FC<{
  onLevelChange: (level: string) => void;
  onZoom: (direction: 'in' | 'out') => void;
}> = ({ onLevelChange, onZoom }) => (
  <div className="flex gap-2 p-2 bg-white rounded shadow">
    <button onClick={() => onZoom('in')}>+</button>
    <button onClick={() => onZoom('out')}>-</button>
    <select onChange={(e) => onLevelChange(e.target.value)}>
      <option value="file">File</option>
      <option value="module">Module</option>
      <option value="service">Service</option>
    </select>
  </div>
);
