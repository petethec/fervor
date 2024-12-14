import { useState, useCallback } from 'react';
import { useAuthContext } from '../../../../context/AuthContext';

export function usePledge() {
  const { user } = useAuthContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pledge = useCallback(async (campaignId: string, amount: number) => {
    if (!user) {
      throw new Error('Must be logged in to pledge');
    }

    try {
      setIsSubmitting(true);
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      return true;
    } catch (err) {
      throw new Error('Failed to process pledge');
    } finally {
      setIsSubmitting(false);
    }
  }, [user]);

  return {
    pledge,
    isSubmitting
  };
}