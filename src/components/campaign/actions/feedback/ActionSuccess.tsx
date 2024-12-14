import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ActionSuccessProps {
  message: string;
}

export default function ActionSuccess({ message }: ActionSuccessProps) {
  return (
    <div 
      className="rounded-md bg-green-50 p-4 animate-fade-in"
      role="alert"
      aria-live="polite"
    >
      <div className="flex">
        <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
        <div className="ml-3">
          <p className="text-sm text-green-700">{message}</p>
        </div>
      </div>
    </div>
  );
}