import React from 'react';
import { Search, ShoppingCart, Bell, History, X, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

export default function Header({
  searchQuery,
  onSearchChange,
  onResetHome,
  onOpenCart,
  onOpenHistory,
  onOpenNotifications
}) {
  const { totalItemCount } = useCart();
  const { unreadCount } = useNotification();

  return (
    <header className="sticky top-0 z-40 bg-[#FFF2F6] border-b border-[#FFD4E5] px-6 lg:px-14 py-3.5 transition-all shadow-xs">
      <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4 sm:gap-6">
        
        {/* Left: Brand Logo Rosé Café & Bakery (Click to go Home & Reset Filters) */}
        <div 
          onClick={onResetHome}
          className="cursor-pointer select-none flex items-center gap-2.5 group"
          title="Kembali ke Beranda & Reset Filter"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF6B9E] to-[#EE4B82] flex items-center justify-center text-white shadow-md shadow-pink-200 group-hover:scale-105 transition-transform">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-brand text-2xl font-black tracking-tight text-[#421525]">
                Rosé
              </span>
              <span className="font-serif-italic text-lg font-bold text-[#EE4B82]">
                Café &amp; Bakery
              </span>
            </div>
            <span className="text-[10px] text-[#8C4A60] font-medium tracking-wide block -mt-1">
              sweet sips &amp; freshly baked treats
            </span>
          </div>
        </div>

        {/* Center: Search input */}
        <div className="flex-1 max-w-lg relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Cari nama menu (contoh: cocoa, macaron, croissant)..."
            className="w-full bg-white border border-[#FFD4E5] rounded-full py-2.5 pl-11 pr-10 text-xs sm:text-sm text-[#421525] placeholder:text-[#A06375] focus:outline-none focus:border-[#FF6B9E] focus:ring-4 focus:ring-[#FFD4E5]/50 shadow-xs transition-all"
          />
          <Search className="absolute left-4 top-3 w-4 h-4 text-[#EE4B82]" strokeWidth={2} />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3.5 top-2.5 text-[#A06375] hover:text-[#EE4B82] transition-colors cursor-pointer"
              title="Hapus pencarian"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right: Actions Group (Bell, History, Cart) */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Bell Icon */}
          <button
            onClick={onOpenNotifications}
            title="Buka Notifikasi"
            className="relative w-10 h-10 rounded-full bg-white border border-[#FFD4E5] hover:bg-[#FFE4EE] hover:border-[#FF6B9E] text-[#421525] hover:text-[#EE4B82] flex items-center justify-center transition-all shadow-xs cursor-pointer group"
          >
            <Bell className="w-5 h-5 transition-transform group-hover:scale-110" strokeWidth={2} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#EE4B82] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {unreadCount}
              </span>
            )}
          </button>

          {/* History Icon */}
          <button
            onClick={onOpenHistory}
            title="Riwayat Transaksi"
            className="relative w-10 h-10 rounded-full bg-white border border-[#FFD4E5] hover:bg-[#FFE4EE] hover:border-[#FF6B9E] text-[#421525] hover:text-[#EE4B82] flex items-center justify-center transition-all shadow-xs cursor-pointer group"
          >
            <History className="w-5 h-5 transition-transform group-hover:scale-110" strokeWidth={2} />
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            title="Buka Keranjang Belanja"
            className="relative w-10 h-10 rounded-full bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] text-white flex items-center justify-center shadow-md shadow-pink-300/40 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
          >
            <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" strokeWidth={2} />
            {totalItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#421525] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                {totalItemCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
