import React from 'react';
import { Clock, Users } from 'lucide-react';

interface CampaignMetadataProps {
  category: string;
  endDate: string;
  backersCount: number;
}

export default function CampaignMetadata({ category, endDate, backersCount }: CampaignMetadataProps) {
  const daysLeft = Math.max(0, Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)));

  return (
    <div className="flex items-center gap-4 text-sm text-gray-500">
      <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
        {category}
      </span>
      <span className="flex items-center">
        <Clock className="h-4 w-4 mr-1" />
        {daysLeft} days left
      </span>
      <span className="flex items-center">
        <Users className="h-4 w-4 mr-1" />
        {backersCount} backers
      </span>
    </div>
  );
}