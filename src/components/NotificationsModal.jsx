import React from 'react';
import { Bell, Heart, ShoppingCart, MessageCircle, Check, RotateCcw, Receipt } from 'lucide-react';
import Modal from './Modal';
import { useNotification } from '../context/NotificationContext';

export default function NotificationsModal({ isOpen, onClose }) {
  const { notifications, unreadCount, markAllAsRead } = useNotification();

  const getIcon = (type) => {
    switch (type) {
      case 'favorite':
        return <Heart className="w-4 h-4 text-[#EE4B82]" strokeWidth={2} />;
      case 'cart':
        return <ShoppingCart className="w-4 h-4 text-[#EE4B82]" strokeWidth={2} />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-[#EE4B82]" strokeWidth={2} />;
      case 'promo':
        return <Check className="w-4 h-4 text-[#EE4B82]" strokeWidth={2} />;
      case 'reset':
        return <RotateCcw className="w-4 h-4 text-[#EE4B82]" strokeWidth={2} />;
      case 'order':
      default:
        return <Receipt className="w-4 h-4 text-[#EE4B82]" strokeWidth={2} />;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={unreadCount > 0 ? `Notifikasi (${unreadCount}) 💌` : 'Notifikasi 💌'}
      maxWidth="max-w-lg"
    >
      <div className="space-y-4">
        
        {/* List of notifications or Empty State */}
        <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
          {notifications.length === 0 ? (
            /* Empty State */
            <div className="bg-[#FFF8FA] rounded-3xl p-10 text-center flex flex-col items-center justify-center border border-[#FFEDF4]">
              <div className="w-12 h-12 rounded-2xl bg-[#FFEBF2] text-[#EE4B82] flex items-center justify-center mb-2.5 border border-[#FFD4E5]">
                <Bell className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h4 className="font-brand font-bold text-base text-[#421525] mb-1">
                Belum Ada Pemberitahuan
              </h4>
              <p className="text-xs text-[#7D4759]">
                Aktivitas pesanan, ulasan, atau promo manismu akan muncul di sini.
              </p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                className={`p-3.5 rounded-2xl transition-all flex items-center justify-between gap-3 border ${
                  item.unread
                    ? 'bg-[#FFEBF2] border-[#FFD4E5]'
                    : 'bg-white border-[#FFEDF4]'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-2xl bg-white flex items-center justify-center flex-shrink-0 border border-[#FFD4E5] shadow-2xs">
                    {getIcon(item.type)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-xs text-[#421525] truncate">
                      {item.message || item.title}
                    </p>
                    <span className="text-[11px] text-[#8C4A60] block mt-0.5">
                      {item.time}
                    </span>
                  </div>
                </div>

                {item.unread && (
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EE4B82] flex-shrink-0 animate-pulse" />
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
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] hover:opacity-95 text-white font-bold text-xs sm:text-sm shadow-md shadow-pink-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Tandai Semua Dibaca ✨
          </button>
        </div>

      </div>
    </Modal>
  );
}
