import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import type { Campaign } from '../../../../types';
import AmountInput from '../inputs/AmountInput';
import ActionButton from '../buttons/ActionButton';
import { useAuthContext } from '../../../../context/AuthContext';

interface VoteSectionProps {
  campaign: Campaign;
  onVote: (campaignId: string, amount: number) => Promise<boolean>;
  isAuthenticated: boolean;
  isVoting: boolean;
  onRequireAuth: () => void;
  onError: (message: string) => void;
}

export default function VoteSection({
  campaign,
  onVote,
  isAuthenticated,
  isVoting,
  onRequireAuth,
  onError
}: VoteSectionProps) {
  const { user } = useAuthContext();
  const [voteAmount, setVoteAmount] = useState<number>(1);

  const handleVote = async () => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    if (!user) {
      onError('User information not available');
      return;
    }

    if (voteAmount > user.fervorBucks) {
      onError('Not enough Fervor Bucks');
      return;
    }

    try {
      const success = await onVote(campaign.id, voteAmount);
      if (success) setVoteAmount(1);
    } catch (err) {
      onError('Failed to submit vote. Please try again.');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex space-x-2">
        <AmountInput
          value={voteAmount}
          onChange={setVoteAmount}
          min={1}
          max={user?.fervorBucks}
          disabled={!isAuthenticated || isVoting}
          placeholder="Enter Fervor Bucks"
          showMaxValue
          ariaLabel="Vote amount"
        />
        <ActionButton
          onClick={handleVote}
          disabled={!isAuthenticated || isVoting || voteAmount < 1}
          loading={isVoting}
          variant="secondary"
          icon={<Heart />}
          ariaLabel="Vote for this campaign"
        >
          Vote
        </ActionButton>
      </div>
      {isAuthenticated && user && (
        <p className="text-sm text-gray-500">
          You have {user.fervorBucks} Fervor Bucks available
        </p>
      )}
    </div>
  );
}