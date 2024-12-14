import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';
import LeaderboardCard from './LeaderboardCard';
import LeaderboardFilter from './LeaderboardFilter';
import type { LeaderboardEntry, TimeFilter } from '../../types/leaderboard';
import { useLeaderboard } from '../../hooks/useLeaderboard';

interface LeaderboardProps {
  campaignId?: string;
  limit?: number;
}

export default function Leaderboard({ campaignId, limit = 10 }: LeaderboardProps) {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>('all-time');
  const { entries, loading, error } = useLeaderboard({ campaignId, timeFilter, limit });

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-gray-200 h-20 rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-50 rounded-lg">
        <Award className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No entries yet</h3>
        <p className="mt-1 text-sm text-gray-500">Be the first to contribute!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <LeaderboardFilter
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
      />
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <LeaderboardCard
            key={entry.id}
            entry={entry}
            position={index + 1}
          />
        ))}
      </div>
    </div>
  );
}