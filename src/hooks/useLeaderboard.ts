import { useState, useEffect } from 'react';
import type { LeaderboardEntry, LeaderboardFilters } from '../types/leaderboard';
import { mockLeaderboardData } from '../data/mockLeaderboardData';

export function useLeaderboard({ timeFilter, campaignId, limit = 10 }: LeaderboardFilters) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      try {
        // Mock API call - replace with actual API in production
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredEntries = [...mockLeaderboardData];
        
        // Apply time filter
        const now = new Date();
        if (timeFilter === 'this-week') {
          const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          filteredEntries = filteredEntries.filter(entry => new Date(entry.lastActivityDate) >= weekAgo);
        } else if (timeFilter === 'this-month') {
          const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          filteredEntries = filteredEntries.filter(entry => new Date(entry.lastActivityDate) >= monthAgo);
        }

        // Apply campaign filter if specified
        if (campaignId) {
          filteredEntries = filteredEntries.filter(entry => entry.campaignId === campaignId);
        }

        // Sort by contribution and limit results
        filteredEntries.sort((a, b) => b.totalContribution - a.totalContribution);
        setEntries(filteredEntries.slice(0, limit));
      } catch (err) {
        setError('Failed to load leaderboard data');
        console.error('Leaderboard error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, [timeFilter, campaignId, limit]);

  return { entries, loading, error };
}