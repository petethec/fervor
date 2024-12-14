import { useState, useCallback } from 'react';
import type { Campaign } from '../../../../types';

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (campaign: Campaign) => {
    const shareData = {
      title: `${campaign.title} on Fervor`,
      text: campaign.description,
      url: window.location.href
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
        return true;
      }
      
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return false;
      }
      throw new Error('Failed to share campaign');
    }
  }, []);

  return {
    share,
    copied
  };
}