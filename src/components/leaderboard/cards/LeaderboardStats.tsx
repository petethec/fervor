import React from 'react';

interface LeaderboardStatsProps {
  totalContribution: number;
  votes: number;
}

export default function LeaderboardStats({ totalContribution, votes }: LeaderboardStatsProps) {
  return (
    <p className="text-sm text-gray-500">
      {totalContribution > 0 && (
        <span className="font-medium">${totalContribution.toLocaleString()} contributed</span>
      )}
      {votes > 0 && (
        <>
          {totalContribution > 0 && ' • '}
          <span>{votes} votes</span>
        </>
      )}
    </p>
  );
}