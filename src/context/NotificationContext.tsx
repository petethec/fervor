import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Notification } from '../types/notification';
import NotificationToast from '../components/notifications/NotificationToast';

interface NotificationContextType {
  showNotification: (notification: Notification) => void;
}

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [activeNotification, setActiveNotification] = useState<Notification | null>(null);

  const showNotification = useCallback((notification: Notification) => {
    setActiveNotification(notification);
  }, []);

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {activeNotification && (
        <NotificationToast
          notification={activeNotification}
          onClose={() => setActiveNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  );
}

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}