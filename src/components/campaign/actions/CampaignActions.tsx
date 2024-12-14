import React from 'react';
import { AlertCircle } from 'lucide-react';
import type { Campaign } from '../../../types';
import { useCampaignActions } from '../../../hooks/useCampaignActions';
import { useActionError } from '../../../hooks/useActionError';
import PledgeSection from './sections/PledgeSection';
import VoteSection from './sections/VoteSection';
import ShareSection from './sections/ShareSection';
import ErrorMessage from '../../common/ErrorMessage';

interface CampaignActionsProps {
  campaign: Campaign;
  onRequireAuth: () => void;
}

export default function CampaignActions({ campaign, onRequireAuth }: CampaignActionsProps) {
  const {
    handleBack,
    handleShare,
    handleVote,
    isSubmitting,
    isVoting,
    copied,
    isAuthenticated,
    fervorBucks
  } = useCampaignActions();

  const { error, showError, clearError } = useActionError();

  const handleAuthRequired = () => {
    showError('Please sign in to continue');
    onRequireAuth();
  };

  const handleAction = async (action: () => Promise<boolean>, errorMessage: string) => {
    if (!isAuthenticated) {
      handleAuthRequired();
      return;
    }

    try {
      const success = await action();
      if (success) clearError();
    } catch (err) {
      showError(errorMessage);
    }
  };

  return (
    <div className="space-y-6" role="group" aria-label="Campaign actions">
      <PledgeSection
        campaign={campaign}
        onBack={handleBack}
        isAuthenticated={isAuthenticated}
        isSubmitting={isSubmitting}
        onRequireAuth={handleAuthRequired}
        onError={showError}
      />

      <VoteSection
        campaign={campaign}
        onVote={handleVote}
        isAuthenticated={isAuthenticated}
        isVoting={isVoting}
        onRequireAuth={handleAuthRequired}
        onError={showError}
      />

      <ShareSection
        campaign={campaign}
        onShare={() => handleShare(campaign)}
        showCopiedMessage={copied}
      />

      {error && (
        <ErrorMessage
          message={error}
          icon={<AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />}
        />
      )}
    </div>
  );
}