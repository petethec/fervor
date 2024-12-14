import { useState, useCallback, useEffect } from 'react';
import type { NotificationPreferences } from '../types/notification';
import { useAuthContext } from '../context/AuthContext';

const DEFAULT_PREFERENCES: NotificationPreferences = {
  updates: true,
  milestones: true,
  leaderboard: true,
  reminders: true
};

export function useNotificationPreferences() {
  const { user } = useAuthContext();
  const [preferences, setPreferences] = useState<NotificationPreferences>(DEFAULT_PREFERENCES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadPreferences = async () => {
      setLoading(true);
      try {
        // Mock API call - replace with actual API in production
        await new Promise(resolve => setTimeout(resolve, 300));
        const savedPrefs = localStorage.getItem(`notification_preferences_${user.id}`);
        if (savedPrefs) {
          setPreferences(JSON.parse(savedPrefs));
        }
      } finally {
        setLoading(false);
      }
    };

    loadPreferences();
  }, [user]);

  const updatePreferences = useCallback(async (newPreferences: Partial<NotificationPreferences>) => {
    if (!user) return;

    const updatedPrefs = { ...preferences, ...newPreferences };
    setPreferences(updatedPrefs);
    localStorage.setItem(`notification_preferences_${user.id}`, JSON.stringify(updatedPrefs));
  }, [preferences, user]);

  return {
    preferences,
    updatePreferences,
    loading
  };
}