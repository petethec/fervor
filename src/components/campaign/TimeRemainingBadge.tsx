import React from 'react';
import { Clock } from 'lucide-react';

interface TimeRemainingBadgeProps {
  endDate: string;
}

export default function TimeRemainingBadge({ endDate }: TimeRemainingBadgeProps) {
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ));

  if (daysLeft > 30) return null;

  const getBadgeColor = () => {
    if (daysLeft <= 3) return 'bg-red-500';
    if (daysLeft <= 7) return 'bg-orange-500';
    return 'bg-blue-500';
  };

  return (
    <div className={`absolute top-2 left-2 ${getBadgeColor()} text-white text-xs px-2 py-1 rounded-full flex items-center shadow-md`}>
      <Clock className="w-3 h-3 mr-1" />
      {daysLeft === 0 ? (
        <span>Ending today</span>
      ) : daysLeft === 1 ? (
        <span>1 day left</span>
      ) : (
        <span>{daysLeft} days left</span>
      )}
    </div>
  );
}