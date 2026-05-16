import React from 'react';
import { clsx } from '../../lib/utils';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  count?: number;
  height?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

const Skeleton = React.forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, count = 1, height = 'h-4', variant = 'rectangular', ...props }, ref) => {
    const baseClasses = 'bg-gray-200 animate-pulse';
    const variantClasses = {
      text: 'rounded',
      circular: 'rounded-full',
      rectangular: 'rounded-md',
    };

    const skeletons = Array(count).fill(null);

    if (count > 1) {
      return (
        <div ref={ref} className="space-y-2" {...props}>
          {skeletons.map((_, i) => (
            <div
              key={i}
              className={clsx(baseClasses, variantClasses[variant], height, className)}
            />
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={clsx(baseClasses, variantClasses[variant], height, className)}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
