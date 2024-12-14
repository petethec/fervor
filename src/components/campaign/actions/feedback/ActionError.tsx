import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ActionErrorProps {
  message: string;
}

export default function ActionError({ message }: ActionErrorProps) {
  return (
    <div 
      className="rounded-md bg-red-50 p-4 animate-fade-in"
      role="alert"
      aria-live="polite"
    >
      <div className="flex">
        <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
}