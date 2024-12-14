import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import type { Campaign } from '../../../../types';
import AmountInput from '../inputs/AmountInput';
import ActionButton from '../buttons/ActionButton';
import { calculateProgress } from '../../../../utils/campaignUtils';

interface PledgeSectionProps {
  campaign: Campaign;
  onBack: (campaignId: string, amount: number) => Promise<boolean>;
  isAuthenticated: boolean;
  isSubmitting: boolean;
  onRequireAuth: () => void;
  onError: (message: string) => void;
}

export default function PledgeSection({
  campaign,
  onBack,
  isAuthenticated,
  isSubmitting,
  onRequireAuth,
  onError
}: PledgeSectionProps) {
  const [pledgeAmount, setPledgeAmount] = useState<number>(0);

  const calculateImpact = (amount: number) => {
    const newTotal = campaign.currentAmount + amount;
    const newProgress = calculateProgress(newTotal, campaign.goal);
    return `Your pledge will raise the campaign to ${newProgress.toFixed(1)}% of its goal!`;
  };

  const handlePledge = async () => {
    if (!isAuthenticated) {
      onRequireAuth();
      return;
    }

    if (pledgeAmount < 1) {
      onError('Minimum pledge amount is $1');
      return;
    }

    try {
      const success = await onBack(campaign.id, pledgeAmount);
      if (success) setPledgeAmount(0);
    } catch (err) {
      onError('Failed to process pledge. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <AmountInput
          value={pledgeAmount}
          onChange={setPledgeAmount}
          disabled={!isAuthenticated || isSubmitting}
          placeholder="Enter pledge amount"
          icon={<DollarSign className="h-5 w-5 text-gray-400" />}
          ariaLabel="Pledge amount"
        />
        <ActionButton
          onClick={handlePledge}
          disabled={!isAuthenticated || isSubmitting || pledgeAmount <= 0}
          loading={isSubmitting}
          variant="primary"
          ariaLabel="Back this campaign"
        >
          Back Now
        </ActionButton>
      </div>
      {pledgeAmount > 0 && (
        <p className="text-sm text-indigo-600 font-medium animate-fade-in">
          {calculateImpact(pledgeAmount)}
        </p>
      )}
    </div>
  );
}