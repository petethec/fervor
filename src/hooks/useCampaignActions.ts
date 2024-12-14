import { useState, useCallback } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { useCampaigns } from '../context/CampaignContext';
import type { Campaign } from '../types';

export function useCampaignActions() {
  const { user } = useAuthContext();
  const { updateCampaign } = useCampaigns();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleBack = useCallback(async (campaignId: string, amount: number) => {
    if (!user) return false;
    
    try {
      setIsSubmitting(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update campaign with new amount
      updateCampaign(campaignId, {
        currentAmount: amount
      });
      
      return true;
    } catch (error) {
      console.error('Failed to back campaign:', error);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [user, updateCampaign]);

  const handleVote = useCallback(async (campaignId: string, amount: number) => {
    if (!user) return false;

    try {
      setIsVoting(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update campaign votes and user's Fervor Bucks
      updateCampaign(campaignId, {
        votes: amount
      });
      
      return true;
    } catch (error) {
      console.error('Failed to vote:', error);
      return false;
    } finally {
      setIsVoting(false);
    }
  }, [user, updateCampaign]);

  const handleShare = useCallback(async (campaign: Campaign) => {
    const shareData = {
      title: `${campaign.title} on Fervor`,
      text: campaign.description,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return false;
      }
      console.error('Failed to share:', error);
      return false;
    }
  }, []);

  return {
    handleBack,
    handleVote,
    handleShare,
    isSubmitting,
    isVoting,
    copied,
    isAuthenticated: Boolean(user),
    fervorBucks: user?.fervorBucks
  };
}