import React from 'react';
import LeaderboardHeader from './LeaderboardHeader';
import FilterBar from './filters/FilterBar';
import LeaderboardList from './LeaderboardList';
import LeaderboardLoading from './states/LeaderboardLoading';
import LeaderboardEmpty from './states/LeaderboardEmpty';
import LeaderboardError from './states/LeaderboardError';
import { useLeaderboard } from '../../hooks/useLeaderboard';
import type { TimeFilter } from '../../types/leaderboard';

interface LeaderboardContainerProps {
  title: string;
  subtitle?: string;
  campaignId?: string;
  limit?: number;
}

export default function LeaderboardContainer({
  title,
  subtitle,
  campaignId,
  limit = 10
}: LeaderboardContainerProps) {
  const [timeFilter, setTimeFilter] = React.useState<TimeFilter>('all-time');
  const { entries, loading, error } = useLeaderboard({ timeFilter, campaignId, limit });

  return (
    <div className="space-y-6">
      <LeaderboardHeader title={title} subtitle={subtitle} />
      
      <FilterBar
        timeFilter={timeFilter}
        onTimeFilterChange={setTimeFilter}
      />

      {loading ? (
        <LeaderboardLoading />
      ) : error ? (
        <LeaderboardError message={error} />
      ) : entries.length === 0 ? (
        <LeaderboardEmpty />
      ) : (
        <LeaderboardList entries={entries} />
      )}
    </div>
  );
}