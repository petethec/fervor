import React from 'react';
import type { Badge } from '../../types';
import { Award } from 'lucide-react';

interface UserBadgesProps {
  badges: Badge[];
}

export default function UserBadges({ badges }: UserBadgesProps) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge) => (
        <div
          key={badge.id}
          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
        >
          <Award className="h-4 w-4 mr-1" />
          {badge.name}
        </div>
      ))}
    </div>
  );
}