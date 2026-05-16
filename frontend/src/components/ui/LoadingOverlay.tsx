import React from 'react';
import { Spinner } from './Spinner';

export interface LoadingOverlayProps {
  isLoading: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading, message }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <Spinner size="lg" />
        {message && <p className="mt-4 text-gray-600 font-medium">{message}</p>}
      </div>
    </div>
  );
};

LoadingOverlay.displayName = 'LoadingOverlay';

export { LoadingOverlay };
