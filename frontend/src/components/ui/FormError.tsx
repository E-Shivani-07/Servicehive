import React from 'react';
import { clsx } from '../../lib/utils';

export interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement> {
  message?: string;
  errors?: Record<string, string | string[]>;
}

const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>(
  ({ className, message, errors, ...props }, ref) => {
    if (!message && !errors) return null;

    const errorMessages = message
      ? [message]
      : Object.values(errors || {}).flat();

    return (
      <div
        ref={ref}
        className={clsx('rounded-md bg-red-50 p-4', className)}
        {...props}
      >
        <div className="flex">
          <div className="flex-shrink-0 text-red-600 mt-0.5">⚠️</div>
          <div className="ml-3">
            {errorMessages.length === 1 ? (
              <p className="text-sm font-medium text-red-800">{errorMessages[0]}</p>
            ) : (
              <div className="text-sm text-red-800">
                <ul className="list-disc list-inside space-y-1">
                  {errorMessages.map((err, i) => (
                    <li key={i}>{err}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

FormError.displayName = 'FormError';

export { FormError };
