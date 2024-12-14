import { useState, useCallback } from 'react';
import type { RewardTier } from '../types';

export function useRewardTiers(initialTiers: RewardTier[] = []) {
  const [rewardTiers, setRewardTiers] = useState<RewardTier[]>(initialTiers);

  const addRewardTier = useCallback((newTier: Omit<RewardTier, 'id'>) => {
    setRewardTiers((current) => [
      ...current,
      {
        ...newTier,
        id: `reward-${Date.now()}`, // In production, use a proper ID generation method
      },
    ]);
  }, []);

  const updateRewardTier = useCallback((id: string, updates: Partial<RewardTier>) => {
    setRewardTiers((current) =>
      current.map((tier) =>
        tier.id === id ? { ...tier, ...updates } : tier
      )
    );
  }, []);

  const removeRewardTier = useCallback((id: string) => {
    setRewardTiers((current) => current.filter((tier) => tier.id !== id));
  }, []);

  return {
    rewardTiers,
    addRewardTier,
    updateRewardTier,
    removeRewardTier,
  };
}