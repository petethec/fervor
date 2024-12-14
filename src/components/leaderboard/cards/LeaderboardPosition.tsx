import React from 'react';
import { Trophy, Star, TrendingUp } from 'lucide-react';

interface LeaderboardPositionProps {
  position: number;
}

export default function LeaderboardPosition({ position }: LeaderboardPositionProps) {
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
    <div 
      className={`flex items-center justify-center w-8 h-8 text-lg font-bold ${getPositionColor(position)}`}
      role="text"
      aria-label={`Position ${position}`}
    >
      {getPositionIcon(position) || position}
    </div>
  );
}