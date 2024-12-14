import React from 'react';
import { Clock, Users, Target, Coins } from 'lucide-react';
import type { Campaign } from '../../../types';
import { formatCurrency, getTimeRemainingText } from '../../../utils/campaignUtils';

interface CampaignStatsProps {
  campaign: Campaign;
  backersCount: number;
  daysLeft: number;
}

export default function CampaignStats({ campaign, backersCount, daysLeft }: CampaignStatsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4" role="list">
      <StatCard
        icon={<Target className="h-6 w-6 text-indigo-600" aria-hidden="true" />}
        label="Funding Goal"
        value={formatCurrency(campaign.goal)}
      />
      <StatCard
        icon={<Coins className="h-6 w-6 text-indigo-600" aria-hidden="true" />}
        label="Amount Raised"
        value={formatCurrency(campaign.currentAmount)}
      />
      <StatCard
        icon={<Users className="h-6 w-6 text-indigo-600" aria-hidden="true" />}
        label="Total Backers"
        value={backersCount.toLocaleString()}
      />
      <StatCard
        icon={<Clock className="h-6 w-6 text-indigo-600" aria-hidden="true" />}
        label="Time Remaining"
        value={getTimeRemainingText(daysLeft)}
        valueClassName={daysLeft === 0 ? 'text-red-600 font-medium' : undefined}
      />
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}

function StatCard({ icon, label, value, valueClassName }: StatCardProps) {
  return (
    <div 
      className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 
        transition-all duration-200 transform hover:-translate-y-0.5"
      role="listitem"
    >
      {icon}
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className={`text-lg font-semibold text-gray-900 ${valueClassName || ''}`}>
          {value}
        </p>
      </div>
    </div>
  );
}