import React from 'react';
import { clsx } from '../../lib/utils';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'white' | 'muted';
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', color = 'primary', ...props }, ref) => {
    const sizes = {
      sm: 'w-4 h-4 border-2',
      md: 'w-8 h-8 border-3',
      lg: 'w-12 h-12 border-4',
    };

    const colors = {
      primary: 'border-blue-200 border-t-blue-600',
      white: 'border-white/30 border-t-white',
      muted: 'border-gray-200 border-t-gray-400',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'inline-block animate-spin rounded-full',
          sizes[size],
          colors[color],
          className
        )}
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
