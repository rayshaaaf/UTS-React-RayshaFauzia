import React from 'react';
import { Bell, Heart, ShoppingCart, MessageCircle, Check, RotateCcw, Receipt } from 'lucide-react';
import Modal from './Modal';
import { useNotification } from '../context/NotificationContext';

export default function NotificationsModal({ isOpen, onClose }) {
  const { notifications, unreadCount, markAllAsRead } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'favorite':
        return <Heart className="w-4 h-4 text-[#5A2E1B]" strokeWidth={2} />;
      case 'cart':
        return <ShoppingCart className="w-4 h-4 text-[#5A2E1B]" strokeWidth={2} />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-[#5A2E1B]" strokeWidth={2} />;
      case 'promo':
        return <Check className="w-4 h-4 text-[#5A2E1B]" strokeWidth={2} />;
      case 'reset':
        return <RotateCcw className="w-4 h-4 text-[#5A2E1B]" strokeWidth={2} />;
      case 'order':
      default:
        return <Receipt className="w-4 h-4 text-[#5A2E1B]" strokeWidth={2} />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={unreadCount > 0 ? `Notifikasi (${unreadCount})` : 'Notifikasi'}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        
        {/* List of notifications or Empty State */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            /* Empty State (Page 16) */
            <div className="bg-[#FFF3F1] rounded-2xl p-10 text-center flex flex-col items-center justify-center">
              <Bell className="w-6 h-6 text-[#5A2E1B]/60 mb-2.5" strokeWidth={1.5} />
              <h4 className="font-heading font-bold text-base text-[#5A2E1B] mb-1">
                Belum ada notifikasi
              </h4>
              <p className="text-xs text-[#5A2E1B]/60">
                Aktivitas KopiKu akan muncul di sini.
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 ${
                  item.unread
                    ? 'bg-[#FFF3F1]'
                    : 'bg-transparent'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    {getIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#5A2E1B] truncate">
                      {item.message || item.title}
                    </p>
                    <span className="text-[11px] text-[#5A2E1B]/60 block mt-0.5">
                      {item.time}
                    </span>
                  </div>
                </div>

                {item.unread && (
                  <span className="w-2 h-2 rounded-full bg-[#D96A7B] flex-shrink-0" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Mark All Read Button */}
        <div className="pt-2">
          <button
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className="w-full py-3.5 rounded-full bg-[#B8805F] hover:bg-[#A66F4E] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Tandai semua dibaca
          </button>
        </div>

      </div>
    </Modal>
  );
}
