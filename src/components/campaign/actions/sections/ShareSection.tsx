import React from 'react';
import { Share2 } from 'lucide-react';
import type { Campaign } from '../../../../types';
import ActionButton from '../buttons/ActionButton';
import CopiedMessage from '../feedback/CopiedMessage';

interface ShareSectionProps {
  campaign: Campaign;
  onShare: () => void;
  showCopiedMessage: boolean;
}

export default function ShareSection({
  campaign,
  onShare,
  showCopiedMessage
}: ShareSectionProps) {
  return (
    <div className="relative flex justify-end">
      <ActionButton
        onClick={onShare}
        variant="primary"
        icon={<Share2 />}
        ariaLabel="Share this campaign"
      >
        Share Campaign
      </ActionButton>
      {showCopiedMessage && <CopiedMessage />}
    </div>
  );
}