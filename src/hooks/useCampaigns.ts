import { useState, useCallback } from 'react';
import { mockCampaigns } from '../data/mockData';
import type { Campaign } from '../types';

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTrendingCampaigns = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // In a real app, this would be an API call
      const sortedCampaigns = [...mockCampaigns].sort((a, b) => b.votes - a.votes);
      setCampaigns(sortedCampaigns);
    } catch (err) {
      setError('Failed to fetch trending campaigns');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    campaigns,
    loading,
    error,
    fetchTrendingCampaigns
  };
}