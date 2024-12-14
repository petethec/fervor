import React from 'react';

interface LeaderboardLoadingProps {
  count?: number;
}

export default function LeaderboardLoading({ count = 3 }: LeaderboardLoadingProps) {
  return (
    <div 
      className="animate-pulse space-y-4"
      role="status"
      aria-label="Loading leaderboard"
    >
      {[...Array(count)].map((_, i) => (
        <div 
          key={i} 
          className="bg-gray-200 h-20 rounded-lg"
          aria-hidden="true"
        />
      ))}
    </div>
  );
}