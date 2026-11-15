import React from 'react';
import { Search, ShoppingCart, Bell, History, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export default function Header({
  searchQuery,
  onSearchChange,
  onOpenCart,
  onOpenHistory,
  onOpenNotifications
}) {
  const { totalItemCount } = useCart();
  const { unreadCount } = useNotification();

  return (
    <header className="sticky top-0 z-40 bg-[#FFF3F1] border-b border-[#E8DCCB]/60 px-8 lg:px-16 py-4 transition-all">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-6">
        
        {/* Left: Brand Logo KopiKu */}
        <div 
          onClick={() => {
            onSearchChange('');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="cursor-pointer select-none"
        >
          <span className="font-heading text-3xl font-black tracking-tight text-[#5A2E1B]">
            KopiKu
          </span>
        </div>

        {/* Center: Search input "Cari menu..." */}
        <div className="flex-1 max-w-xl relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari menu..."
            className="w-full bg-white border border-gray-100 rounded-full py-2.5 pl-11 pr-10 text-sm text-[#5A2E1B] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B8805F]/30 shadow-xs transition-all"
          />
          <Search className="absolute left-4 top-3 w-4 h-4 text-gray-500" strokeWidth={2} />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-2.5 text-gray-400 hover:text-[#5A2E1B] transition-colors"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right: Actions Group (Bell, History, Cart) */}
        <div className="flex items-center gap-5 sm:gap-6">
          
          {/* Bell Icon with rose red badge */}
          <button
            onClick={onOpenNotifications}
            title="Buka Notifikasi"
            className="relative p-1 text-[#5A2E1B] hover:text-[#B8805F] transition-colors cursor-pointer group"
          >
            <Bell className="w-6 h-6 transition-transform group-hover:scale-110" strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#D96A7B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* History Icon (Transaction History) */}
          <button
            onClick={onOpenHistory}
            title="Riwayat Transaksi"
            className="relative p-1 text-[#5A2E1B] hover:text-[#B8805F] transition-colors cursor-pointer group"
          >
            <History className="w-6 h-6 transition-transform group-hover:scale-110" strokeWidth={2} />
          </button>

          {/* ShoppingCart Button with badge */}
          <button
            onClick={onOpenCart}
            title="Buka Keranjang Belanja"
            className="relative p-1 text-[#5A2E1B] hover:text-[#B8805F] transition-colors cursor-pointer group"
          >
            <ShoppingCart className="w-6 h-6 transition-transform group-hover:scale-110" strokeWidth={2} />
            {totalItemCount > 0 && (
              <span className="absolute -top-1 -right-1.5 bg-[#D96A7B] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {totalItemCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
