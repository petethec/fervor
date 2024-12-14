import React from 'react';
import type { Campaign } from '../../../types';
import CampaignHeader from './CampaignHeader';
import CampaignProgress from '../CampaignProgress';
import CampaignStats from './CampaignStats';
import CampaignDescription from './CampaignDescription';
import { calculateDaysLeft, calculateBackersCount } from '../../../utils/campaignUtils';

interface CampaignOverviewProps {
  campaign: Campaign;
}

export default function CampaignOverview({ campaign }: CampaignOverviewProps) {
  const daysLeft = calculateDaysLeft(campaign.endDate);
  const backersCount = calculateBackersCount(campaign.rewardTiers);

  return (
    <div 
      className="bg-white rounded-lg shadow-sm p-6 space-y-6 hover:shadow-md 
        transition-shadow duration-300 group"
      role="article"
      aria-label={`Campaign overview for ${campaign.title}`}
    >
      <CampaignHeader campaign={campaign} />
      
      <div className="pt-4 border-t border-gray-100">
        <CampaignProgress
          currentAmount={campaign.currentAmount}
          goal={campaign.goal}
        />
      </div>

      <div className="pt-4 border-t border-gray-100">
        <CampaignStats
          campaign={campaign}
          backersCount={backersCount}
          daysLeft={daysLeft}
        />
      </div>

      <CampaignDescription description={campaign.description} />
    </div>
  );
}