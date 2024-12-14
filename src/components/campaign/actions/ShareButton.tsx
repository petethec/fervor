import React from 'react';
import { Share2 } from 'lucide-react';
import type { Campaign } from '../../../types';

interface ShareButtonProps {
  campaign: Campaign;
  onShare: (campaign: Campaign) => Promise<boolean>;
  showCopiedMessage: boolean;
}

export default function ShareButton({
  campaign,
  onShare,
  showCopiedMessage
}: ShareButtonProps) {
  return (
    <div className="relative">
      <div className="flex justify-end">
        <button
          onClick={() => onShare(campaign)}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm 
            leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
            transition-colors duration-200"
        >
          <Share2 className="h-4 w-4 mr-2" />
          Share Campaign
        </button>
      </div>
      
      {showCopiedMessage && (
        <div className="absolute -top-8 right-0 bg-gray-800 text-white px-3 py-1 rounded text-sm 
          animate-fade-in-up">
          Link copied!
        </div>
      )}
    </div>
  );
}