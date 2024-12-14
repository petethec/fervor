import React from 'react';

interface LeaderboardBadgesProps {
  badges: string[];
}

export default function LeaderboardBadges({ badges }: LeaderboardBadgesProps) {
  if (!badges?.length) return null;

  return (
    <div className="flex space-x-1">
      {badges.map((badge, index) => (
        <span
          key={index}
          className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
            bg-indigo-100 text-indigo-800 transition-colors hover:bg-indigo-200"
        >
          {badge}
        </span>
      ))}
    </div>
  );
}