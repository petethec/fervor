import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  icon?: React.ReactNode;
}

export default function ErrorMessage({ message, icon }: ErrorMessageProps) {
  return (
    <div 
      className="rounded-md bg-red-50 p-4 animate-fade-in"
      role="alert"
      aria-live="polite"
    >
      <div className="flex">
        {icon || <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />}
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
      </div>
    </div>
  );
}