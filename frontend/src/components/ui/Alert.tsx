import React from 'react';
import { clsx } from '../../lib/utils';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  title?: string;
  onDismiss?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = 'default', title, onDismiss, children, ...props }, ref) => {
    const variants = {
      default: 'bg-blue-50 border-blue-200 text-blue-800',
      destructive: 'bg-red-50 border-red-200 text-red-800',
      success: 'bg-green-50 border-green-200 text-green-800',
      warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    };

    const iconVariants = {
      default: 'text-blue-600',
      destructive: 'text-red-600',
      success: 'text-green-600',
      warning: 'text-yellow-600',
    };

    return (
      <div
        ref={ref}
        className={clsx(
          'relative w-full rounded-md border p-4',
          variants[variant],
          className
        )}
        {...props}
      >
        <div className="flex gap-3">
          <div className={clsx('mt-0.5 flex-shrink-0', iconVariants[variant])}>
            {variant === 'destructive' && '⚠️'}
            {variant === 'success' && '✓'}
            {variant === 'warning' && '⚡'}
            {variant === 'default' && 'ℹ️'}
          </div>
          <div className="flex-1">
            {title && <h3 className="font-semibold mb-1">{title}</h3>}
            <div className="text-sm">{children}</div>
          </div>
          {onDismiss && (
            <button
              onClick={onDismiss}
              className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity"
              aria-label="Close alert"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    );
  }
);

Alert.displayName = 'Alert';

export { Alert };
