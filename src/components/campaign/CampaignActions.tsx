import React from 'react';
import { Heart, Share2 } from 'lucide-react';
import { useCampaignActions } from '../../hooks/useCampaignActions';
import { useAuthContext } from '../../context/AuthContext';
import type { Campaign } from '../../types';

interface CampaignActionsProps {
  campaign: Campaign;
  onRequireAuth?: () => void;
}

export default function CampaignActions({ campaign, onRequireAuth }: CampaignActionsProps) {
  const { user } = useAuthContext();
  const {
    handleBack,
    handleShare,
    handleVote,
    isSubmitting,
    isVoting,
    copied,
  } = useCampaignActions();

  const handleAuthCheck = () => {
    if (!user && onRequireAuth) {
      onRequireAuth();
      return false;
    }
    return true;
  };

  const onBackClick = async () => {
    if (!handleAuthCheck()) return;
    await handleBack(campaign.id, 0);
  };

  const onVoteClick = async () => {
    if (!handleAuthCheck()) return;
    await handleVote(campaign.id, 1);
  };

  const onShareClick = () => {
    handleShare(campaign);
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <button
          onClick={onBackClick}
          disabled={isSubmitting}
          className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium 
            hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 
            disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 transition-all duration-200"
        >
          {isSubmitting ? 'Processing...' : 'Back Now'}
        </button>
        <button
          onClick={onVoteClick}
          disabled={isVoting}
          className="p-2 text-gray-600 hover:text-indigo-600 rounded-md hover:bg-indigo-50 
            transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          title="Vote with Fervor Bucks"
        >
          <Heart className={`h-5 w-5 ${isVoting ? 'animate-pulse' : ''}`} />
        </button>
        <button
          onClick={onShareClick}
          className="p-2 text-gray-600 hover:text-indigo-600 rounded-md hover:bg-indigo-50 
            transition-all duration-200 hover:scale-105"
          title="Share Campaign"
        >
          <Share2 className="h-5 w-5" />
        </button>
      </div>
      {copied && (
        <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded animate-fade-in">
          Link copied!
        </div>
      )}
    </div>
  );
}