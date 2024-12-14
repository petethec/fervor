import { useState, useCallback } from 'react';
import { useAuthContext } from '../../../../context/AuthContext';

export function useVote() {
  const { user } = useAuthContext();
  const [isVoting, setIsVoting] = useState(false);

  const vote = useCallback(async (campaignId: string, amount: number) => {
    if (!user) {
      throw new Error('Must be logged in to vote');
    }

    if (amount > user.fervorBucks) {
      throw new Error('Insufficient Fervor Bucks');
    }

    try {
      setIsVoting(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      throw new Error('Failed to submit vote');
    } finally {
      setIsVoting(false);
    }
  }, [user]);

  return {
    vote,
    isVoting,
    availableBucks: user?.fervorBucks
  };
}