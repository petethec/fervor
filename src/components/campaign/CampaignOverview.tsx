import React from 'react';
import { Clock, Users, Target, Coins } from 'lucide-react';
import type { Campaign } from '../../types';
import UserAvatar from '../user/UserAvatar';
import CampaignProgress from './CampaignProgress';

interface CampaignOverviewProps {
  campaign: Campaign;
}

export default function CampaignOverview({ campaign }: CampaignOverviewProps) {
  const daysLeft = Math.max(0, Math.ceil(
    (new Date(campaign.endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  ));

  const backersCount = campaign.rewardTiers.reduce(
    (acc, tier) => acc + tier.currentBackers,
    0
  );

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      {/* Campaign Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{campaign.title}</h1>
          <div className="mt-2 flex items-center space-x-4">
            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              {campaign.category}
            </span>
            {campaign.flexibleFunding && (
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded">
                Flexible Funding
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center">
          <UserAvatar
            src={campaign.creator.avatar}
            alt={campaign.creator.name}
            size="lg"
            className="ring-4 ring-white shadow-lg"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Created by</p>
            <p className="text-sm text-gray-500">{campaign.creator.name}</p>
          </div>
        </div>
      </div>

      {/* Campaign Progress */}
      <div className="pt-4 border-t border-gray-100">
        <CampaignProgress
          currentAmount={campaign.currentAmount}
          goal={campaign.goal}
        />
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Target className="h-6 w-6 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Goal</p>
            <p className="text-lg font-semibold text-gray-900">
              ${campaign.goal.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Coins className="h-6 w-6 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Raised</p>
            <p className="text-lg font-semibold text-gray-900">
              ${campaign.currentAmount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Users className="h-6 w-6 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Backers</p>
            <p className="text-lg font-semibold text-gray-900">
              {backersCount.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
          <Clock className="h-6 w-6 text-indigo-600" />
          <div>
            <p className="text-sm text-gray-500">Time Left</p>
            <p className="text-lg font-semibold text-gray-900">
              {daysLeft === 0 ? (
                <span className="text-red-600">Ended</span>
              ) : (
                `${daysLeft} days`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Campaign Description */}
      <div className="pt-4 border-t border-gray-100">
        <p className="text-gray-600 leading-relaxed">{campaign.description}</p>
      </div>
    </div>
  );
}