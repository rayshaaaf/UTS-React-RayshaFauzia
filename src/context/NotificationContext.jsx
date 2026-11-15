import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NotificationContext = createContext();

const initialNotifications = [
  {
    id: 1,
    type: 'order',
    message: 'Pesanan KKU-20261115-001 berhasil dibayar.',
    time: 'Baru saja',
    unread: true,
    timestamp: 1731670000000
  },
  {
    id: 2,
    type: 'promo',
    message: 'Promo UTS25 diterapkan. Hemat Rp 18.000.',
    time: '2 menit lalu',
    unread: true,
    timestamp: 1731669880000
  },
  {
    id: 3,
    type: 'cart',
    message: 'Cafe Latte ditambahkan ke keranjang.',
    time: '5 menit lalu',
    unread: true,
    timestamp: 1731669700000
  },
  {
    id: 4,
    type: 'comment',
    message: 'Komentar Cafe Latte berhasil dikirim.',
    time: '10 menit lalu',
    unread: false,
    timestamp: 1731669400000
  },
  {
    id: 5,
    type: 'favorite',
    message: 'Cafe Latte dihapus dari favorit.',
    time: '15 menit lalu',
    unread: false,
    timestamp: 1731669100000
  },
  {
    id: 6,
    type: 'reset',
    message: 'Stok dan riwayat berhasil direset.',
    time: 'Kemarin, 08.00',
    unread: false,
    timestamp: 1731580800000
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useLocalStorage('kopiku_notifications', initialNotifications);

  const addNotification = (type, title, message) => {
    const newNotif = {
      id: Date.now() + Math.random().toString(36).substring(2, 5),
      type,
      title,
      message,
      time: 'Baru saja',
      unread: true,
      timestamp: Date.now()
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        addNotification,
        markAllAsRead,
        clearNotifications
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotification must be used within NotificationProvider');
  return context;
}
