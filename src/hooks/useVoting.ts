import { useState, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';

export function useVoting() {
  const { user } = useAuthContext();
  const [votingCampaignId, setVotingCampaignId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const vote = useCallback(async (campaignId: string) => {
    if (!user) {
      throw new Error('Must be logged in to vote');
    }

    try {
      setVotingCampaignId(campaignId);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // In a real app, make API call here
      setError(null);
    } catch (err) {
      setError('Failed to submit vote');
      throw err;
    } finally {
      setVotingCampaignId(null);
    }
  }, [user]);

  return {
    vote,
    isVoting: Boolean(votingCampaignId),
    votingError: error,
    clearVotingError: () => setError(null)
  };
}