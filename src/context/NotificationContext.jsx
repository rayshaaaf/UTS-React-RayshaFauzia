import React, { createContext, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

const NotificationContext = createContext();

const initialNotifications = [
  {
    id: 1,
    type: 'order',
    message: 'Pesanan ROSE-20261115-001 berhasil dibayar.',
    time: 'Baru saja',
    unread: true,
    timestamp: 1731670000000
  },
  {
    id: 2,
    type: 'promo',
    message: 'Voucher UTS25 diterapkan. Hemat 25%!',
    time: '2 menit lalu',
    unread: true,
    timestamp: 1731669880000
  },
  {
    id: 3,
    type: 'cart',
    message: 'Sweet Heart Macarons masuk ke keranjang.',
    time: '5 menit lalu',
    unread: true,
    timestamp: 1731669700000
  },
  {
    id: 4,
    type: 'comment',
    message: 'Ulasan Sweet Heart Macarons berhasil dikirim.',
    time: '12 menit lalu',
    unread: false,
    timestamp: 1731669400000
  },
  {
    id: 5,
    type: 'favorite',
    message: 'Signature Iced Cocoa ditambahkan ke favorit.',
    time: '20 menit lalu',
    unread: false,
    timestamp: 1731669100000
  },
  {
    id: 6,
    type: 'reset',
    message: 'Stok dan riwayat pesanan berhasil direset.',
    time: 'Kemarin, 09.00',
    unread: false,
    timestamp: 1731580800000
  }
];

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useLocalStorage('rose_cafe_notifications', initialNotifications);

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
