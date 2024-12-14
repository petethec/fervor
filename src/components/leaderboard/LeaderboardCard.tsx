import React from 'react';
import { Trophy, Star, TrendingUp } from 'lucide-react';
import UserAvatar from '../user/UserAvatar';
import type { LeaderboardEntry } from '../../types/leaderboard';

interface LeaderboardCardProps {
  entry: LeaderboardEntry;
  position: number;
}

export default function LeaderboardCard({ entry, position }: LeaderboardCardProps) {
  const getPositionColor = (pos: number) => {
    switch (pos) {
      case 1: return 'text-yellow-500';
      case 2: return 'text-gray-400';
      case 3: return 'text-amber-600';
      default: return 'text-gray-600';
    }
  };

  const getPositionIcon = (pos: number) => {
    switch (pos) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2: return <Star className="h-5 w-5 text-gray-400" />;
      case 3: return <TrendingUp className="h-5 w-5 text-amber-600" />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center space-x-4">
        <div className={`flex items-center justify-center w-8 h-8 text-lg font-bold ${getPositionColor(position)}`}>
          {getPositionIcon(position) || position}
        </div>
        <UserAvatar src={entry.avatar} alt={entry.name} size="md" />
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{entry.name}</h3>
          <p className="text-sm text-gray-500">
            {entry.totalContribution > 0 && `$${entry.totalContribution.toLocaleString()} contributed`}
            {entry.votes > 0 && ` • ${entry.votes} votes`}
          </p>
        </div>
        {entry.badges && entry.badges.length > 0 && (
          <div className="flex space-x-1">
            {entry.badges.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}