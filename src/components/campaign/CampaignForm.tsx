import React, { useState } from 'react';
import { Calendar, DollarSign, Tag } from 'lucide-react';
import type { Campaign } from '../../types';
import { useRewardTiers } from '../../hooks/useRewardTiers';
import RewardTierManager from './rewards/RewardTierManager';

interface CampaignFormProps {
  onSubmit: (campaign: Partial<Campaign>) => void;
}

export default function CampaignForm({ onSubmit }: CampaignFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goal, setGoal] = useState('');
  const [category, setCategory] = useState('');
  const [endDate, setEndDate] = useState('');
  const [flexibleFunding, setFlexibleFunding] = useState(false);
  const { rewardTiers, addRewardTier } = useRewardTiers();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      goal: Number(goal),
      category,
      endDate,
      flexibleFunding,
      currentAmount: 0,
      votes: 0,
      rewardTiers
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Existing form fields */}
      
      <div className="border-t border-gray-200 pt-8">
        <RewardTierManager
          rewardTiers={rewardTiers}
          onAddRewardTier={addRewardTier}
        />
      </div>

      <div>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Create Campaign
        </button>
      </div>
    </form>
  );
}