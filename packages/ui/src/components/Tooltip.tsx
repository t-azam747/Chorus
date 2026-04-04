import React from 'react';

export interface TooltipProps {
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  children,
}) => {
  return (
    <div className="tooltip-wrapper" data-position={position}>
      {children}
      <div className="tooltip-content">{content}</div>
    </div>
  );
};
