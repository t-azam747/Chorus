import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', children, ...props }, ref) => {
    return (
      <div ref={ref} data-variant={variant} data-padding={padding} {...props}>
        {children}
      </div>
    );
  },
);

Card.displayName = 'Card';
