import React from 'react';
import UserAvatar from '../../user/UserAvatar';
import type { Campaign } from '../../../types';

interface CampaignHeaderProps {
  campaign: Campaign;
}

export default function CampaignHeader({ campaign }: CampaignHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {campaign.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <span 
            className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full 
              hover:bg-indigo-100 transition-colors cursor-pointer"
            role="button"
            tabIndex={0}
          >
            {campaign.category}
          </span>
          {campaign.flexibleFunding && (
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
              Flexible Funding
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center group">
        <UserAvatar
          src={campaign.creator.avatar}
          alt={campaign.creator.name}
          size="lg"
          className="ring-4 ring-white shadow-lg group-hover:ring-indigo-50 transition-all"
        />
        <div className="ml-3">
          <p className="text-sm font-medium text-gray-900">Created by</p>
          <p className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
            {campaign.creator.name}
          </p>
        </div>
      </div>
    </div>
  );
}