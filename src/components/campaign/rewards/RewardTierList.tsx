import React from 'react';
import { Users, Gift } from 'lucide-react';
import type { RewardTier } from '../../../types';

interface RewardTierListProps {
  rewardTiers: RewardTier[];
  onSelect?: (rewardTier: RewardTier) => void;
}

export default function RewardTierList({ rewardTiers, onSelect }: RewardTierListProps) {
  if (rewardTiers.length === 0) {
    return (
      <div className="text-center py-6 bg-gray-50 rounded-lg">
        <Gift className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No reward tiers</h3>
        <p className="mt-1 text-sm text-gray-500">Get started by adding a new reward tier.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {rewardTiers.map((tier) => (
        <div
          key={tier.id}
          className="bg-white border border-gray-200 rounded-lg p-4 hover:border-indigo-500 transition-colors cursor-pointer"
          onClick={() => onSelect?.(tier)}
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-medium text-gray-900">{tier.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{tier.description}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-indigo-600">${tier.amount}</p>
              {tier.maxBackers && (
                <p className="mt-1 text-sm text-gray-500 flex items-center justify-end">
                  <Users className="h-4 w-4 mr-1" />
                  {tier.currentBackers}/{tier.maxBackers}
                </p>
              )}
            </div>
          </div>
          {tier.maxBackers && (
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 rounded-full h-2"
                  style={{
                    width: `${(tier.currentBackers / tier.maxBackers) * 100}%`,
                  }}
                />
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}