import React from 'react';
import { Link } from 'react-router-dom';
import type { Campaign } from '../../types';
import CampaignProgress from './CampaignProgress';
import CampaignActions from './CampaignActions';
import CampaignMetadata from './CampaignMetadata';
import CampaignImage from './CampaignImage';
import TimeRemainingBadge from './TimeRemainingBadge';
import UserAvatar from '../user/UserAvatar';

interface CampaignCardProps {
  campaign: Campaign;
  onRequireAuth?: () => void;
}

export default function CampaignCard({ campaign, onRequireAuth }: CampaignCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 group">
      <Link to={`/campaign/${campaign.id}`} className="block">
        <div className="relative">
          <CampaignImage category={campaign.category} title={campaign.title} />
          <TimeRemainingBadge endDate={campaign.endDate} />
          {campaign.flexibleFunding && (
            <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
              Flexible Funding
            </span>
          )}
        </div>
        
        <div className="p-4 space-y-4">
          <CampaignMetadata
            category={campaign.category}
            endDate={campaign.endDate}
            backersCount={campaign.rewardTiers.reduce((acc, tier) => acc + tier.currentBackers, 0)}
          />

          <div className="group-hover:transform group-hover:-translate-y-0.5 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">{campaign.title}</h3>
            <p className="text-sm text-gray-600 line-clamp-2">{campaign.description}</p>
          </div>

          <CampaignProgress
            currentAmount={campaign.currentAmount}
            goal={campaign.goal}
          />

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex items-center">
              <UserAvatar
                src={campaign.creator.avatar}
                alt={campaign.creator.name}
                size="sm"
                className="ring-2 ring-white"
              />
              <span className="ml-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                {campaign.creator.name}
              </span>
            </div>
            <span className="text-sm text-indigo-600 font-medium">
              {campaign.votes} votes
            </span>
          </div>
        </div>
      </Link>

      <div className="p-4 pt-0">
        <CampaignActions
          campaign={campaign}
          onRequireAuth={onRequireAuth}
        />
      </div>
    </div>
  );
}