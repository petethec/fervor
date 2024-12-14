import React from 'react';
import { AlertCircle } from 'lucide-react';

interface LeaderboardErrorProps {
  message: string;
}

export default function LeaderboardError({ message }: LeaderboardErrorProps) {
  return (
    <div 
      className="text-center py-12 bg-gray-50 rounded-lg"
      role="alert"
    >
      <AlertCircle className="mx-auto h-12 w-12 text-red-500" aria-hidden="true" />
      <p className="mt-2 text-red-600">{message}</p>
    </div>
  );
}