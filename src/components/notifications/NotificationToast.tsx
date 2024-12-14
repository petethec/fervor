import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Notification } from '../../types/notification';

interface NotificationToastProps {
  notification: Notification;
  onClose: () => void;
  duration?: number;
}

export default function NotificationToast({ 
  notification, 
  onClose, 
  duration = 5000 
}: NotificationToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg border 
        border-gray-200 p-4 animate-slide-in-right"
      role="alert"
      aria-live="polite"
    >
      <div className="flex items-start">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-gray-900">{notification.title}</h4>
          <p className="mt-1 text-sm text-gray-500">{notification.message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 text-gray-400 hover:text-gray-500 focus:outline-none 
            focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}