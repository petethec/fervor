import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { RewardTier } from '../../../types';
import RewardTierForm from './RewardTierForm';
import RewardTierList from './RewardTierList';

interface RewardTierManagerProps {
  rewardTiers: RewardTier[];
  onAddRewardTier: (rewardTier: Omit<RewardTier, 'id'>) => void;
}

export default function RewardTierManager({
  rewardTiers,
  onAddRewardTier,
}: RewardTierManagerProps) {
  const [isAddingReward, setIsAddingReward] = useState(false);

  const handleSubmit = (rewardTier: Omit<RewardTier, 'id'>) => {
    onAddRewardTier(rewardTier);
    setIsAddingReward(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-gray-900">Reward Tiers</h2>
        {!isAddingReward && (
          <button
            type="button"
            onClick={() => setIsAddingReward(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Reward
          </button>
        )}
      </div>

      {isAddingReward ? (
        <div className="bg-gray-50 p-4 rounded-lg">
          <RewardTierForm
            onSubmit={handleSubmit}
            onCancel={() => setIsAddingReward(false)}
          />
        </div>
      ) : (
        <RewardTierList rewardTiers={rewardTiers} />
      )}
    </div>
  );
}