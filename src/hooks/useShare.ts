import { useState, useCallback } from 'react';

interface ShareOptions {
  title: string;
  text: string;
  url: string;
}

export function useShare() {
  const [copied, setCopied] = useState(false);

  const share = useCallback(async (options: ShareOptions) => {
    try {
      if (navigator.share && navigator.canShare?.(options)) {
        await navigator.share(options);
        return true;
      }
      
      await navigator.clipboard.writeText(options.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return true;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return false;
      }
      throw error;
    }
  }, []);

  return { share, copied };
}