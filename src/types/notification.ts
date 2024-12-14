import type { User } from './index';

export type NotificationType = 'update' | 'milestone' | 'leaderboard' | 'reminder';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  campaignId?: string;
  recipientId: string;
}

export interface NotificationPreferences {
  updates: boolean;
  milestones: boolean;
  leaderboard: boolean;
  reminders: boolean;
}