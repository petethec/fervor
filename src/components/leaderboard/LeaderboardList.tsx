import React from 'react';
import LeaderboardCard from './cards/LeaderboardCard';
import type { LeaderboardEntry } from '../../types/leaderboard';

interface LeaderboardListProps {
  entries: LeaderboardEntry[];
}

export default function LeaderboardList({ entries }: LeaderboardListProps) {
  return (
    <div 
      className="space-y-4"
      role="list"
      aria-label="Leaderboard entries"
    >
      {entries.map((entry, index) => (
        <LeaderboardCard
          key={entry.id}
          entry={entry}
          position={index + 1}
        />
      ))}
    </div>
  );
}