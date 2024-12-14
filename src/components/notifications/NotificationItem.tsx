import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Award, Bell, Calendar } from 'lucide-react';
import type { Notification } from '../../types/notification';
import { useNotifications } from '../../hooks/useNotifications';

interface NotificationItemProps {
  notification: Notification;
}

export default function NotificationItem({ notification }: NotificationItemProps) {
  const navigate = useNavigate();
  const { markAsRead } = useNotifications();

  const getIcon = () => {
    switch (notification.type) {
      case 'update': return <MessageSquare className="h-5 w-5 text-blue-500" />;
      case 'milestone': return <Award className="h-5 w-5 text-green-500" />;
      case 'leaderboard': return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 'reminder': return <Calendar className="h-5 w-5 text-purple-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const handleClick = () => {
    markAsRead(notification.id);
    if (notification.campaignId) {
      navigate(`/campaign/${notification.campaignId}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200
        ${notification.isRead ? 'bg-white' : 'bg-indigo-50'}`}
      role="menuitem"
    >
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900">{notification.title}</p>
          <p className="text-sm text-gray-500">{notification.message}</p>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(notification.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}