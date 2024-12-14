import React from 'react';
import type { Campaign } from '../types';

interface CampaignCardProps {
  campaign: Campaign;
}

export default function CampaignCard({ campaign }: CampaignCardProps) {
  const progress = (campaign.currentAmount / campaign.goal) * 100;

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="h-48 bg-gray-200 rounded-t-lg overflow-hidden">
        <img
          src={`https://source.unsplash.com/800x600/?${campaign.category}`}
          alt={campaign.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
            {campaign.category}
          </span>
          <span className="ml-2 text-xs text-gray-500">
            {new Date(campaign.endDate).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{campaign.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">${campaign.currentAmount.toLocaleString()}</span>
            <span className="text-gray-500">
              {progress.toFixed(0)}% of ${campaign.goal.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 rounded-full h-2"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center">
              <img
                src={campaign.creator.avatar}
                alt={campaign.creator.name}
                className="w-6 h-6 rounded-full"
              />
              <span className="ml-2 text-gray-600">{campaign.creator.name}</span>
            </div>
            <span className="text-gray-500">{campaign.votes} votes</span>
          </div>
        </div>
      </div>
    </div>
  );
}