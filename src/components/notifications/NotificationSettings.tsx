import React from 'react';
import { Bell, MessageSquare, Award, Calendar } from 'lucide-react';
import { useNotificationPreferences } from '../../hooks/useNotificationPreferences';

export default function NotificationSettings() {
  const { preferences, updatePreferences, loading } = useNotificationPreferences();

  if (loading) {
    return (
      <div className="animate-pulse p-4">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const togglePreference = (key: keyof typeof preferences) => {
    updatePreferences({ [key]: !preferences[key] });
  };

  const preferences_config = [
    {
      key: 'updates' as const,
      label: 'Campaign Updates',
      description: 'Receive notifications when campaigns you back post updates',
      icon: MessageSquare
    },
    {
      key: 'milestones' as const,
      label: 'Milestones',
      description: 'Get notified when campaigns reach funding milestones',
      icon: Award
    },
    {
      key: 'leaderboard' as const,
      label: 'Leaderboard Updates',
      description: 'Notifications about your ranking changes',
      icon: Trophy
    },
    {
      key: 'reminders' as const,
      label: 'Reminders',
      description: 'Get reminded about campaigns ending soon',
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Notification Preferences</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose which notifications you'd like to receive
        </p>
      </div>

      <div className="space-y-4">
        {preferences_config.map(({ key, label, description, icon: Icon }) => (
          <div key={key} className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id={key}
                type="checkbox"
                checked={preferences[key]}
                onChange={() => togglePreference(key)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 
                  border-gray-300 rounded transition-colors duration-200"
              />
            </div>
            <div className="ml-3">
              <label htmlFor={key} className="flex items-center text-sm font-medium text-gray-900">
                <Icon className="h-4 w-4 mr-2 text-gray-500" />
                {label}
              </label>
              <p className="text-sm text-gray-500">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}