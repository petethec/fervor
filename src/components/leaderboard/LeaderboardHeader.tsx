import React from 'react';
import { Trophy } from 'lucide-react';

interface LeaderboardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function LeaderboardHeader({ title, subtitle }: LeaderboardHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-2">
        <Trophy className="h-6 w-6 text-indigo-600" aria-hidden="true" />
        <div>
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {subtitle && (
            <p className="text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}