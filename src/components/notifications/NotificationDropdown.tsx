import React, { useRef } from 'react';
import { useNotifications } from '../../hooks/useNotifications';
import NotificationItem from './NotificationItem';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';

interface NotificationDropdownProps {
  onClose: () => void;
}

export default function NotificationDropdown({ onClose }: NotificationDropdownProps) {
  const { notifications, markAllAsRead, loading } = useNotifications();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(dropdownRef, onClose);

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg 
        border border-gray-200 z-50"
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="notification-menu"
    >
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Notifications</h3>
          <button
            onClick={() => markAllAsRead()}
            className="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Mark all as read
          </button>
        </div>
      </div>

      <div className="max-h-96 overflow-y-auto">
        {loading ? (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No notifications</div>
        ) : (
          notifications.map(notification => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))
        )}
      </div>
    </div>
  );
}