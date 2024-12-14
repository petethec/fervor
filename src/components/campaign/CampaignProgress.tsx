import React from 'react';

interface CampaignProgressProps {
  currentAmount: number;
  goal: number;
}

export default function CampaignProgress({ currentAmount, goal }: CampaignProgressProps) {
  const progress = (currentAmount / goal) * 100;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">${currentAmount.toLocaleString()}</span>
        <span className="text-gray-500">
          {progress.toFixed(0)}% of ${goal.toLocaleString()}
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-indigo-600 rounded-full h-2 transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>
    </div>
  );
}