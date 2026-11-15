import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, Info, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import { formatRupiah, PROMO_CODES } from '../utils/pricing';

export default function CartDrawer({ isOpen, onClose, onCheckoutSuccess }) {
  const { items, promoCode, totals, updateQuantity, removeItem, applyPromo, totalItemCount } = useCart();
  const { showToast } = useToast();
  const [inputCode, setInputCode] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = (e) => {
    e?.preventDefault();
    const code = inputCode.trim().toUpperCase();
    if (!code) return;

    if (PROMO_CODES[code]) {
      applyPromo(code);
      setPromoError('');
      showToast('promo', 'Rosé Café', `Voucher ${code} berhasil diterapkan! ✨`);
    } else {
      setPromoError('Kode promo tidak valid! Coba UTS25, HEMAT10, atau MANIS15.');
      showToast('warning', 'Batas stok', 'Kode promo tidak terdaftar.');
    }
  };

  const hasMaxStockItem = items.some((item) => item.quantity >= item.stock);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#421525]/35 backdrop-blur-xs animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-left border-l border-[#FFD4E5]">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#FFEDF4] flex items-center justify-between bg-gradient-to-r from-[#FFF0F5] to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#FF6B9E] to-[#EE4B82] text-white flex items-center justify-center shadow-xs">
              <ShoppingCart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-brand font-black text-xl text-[#421525]">
                Keranjang Belanja
              </h3>
              <span className="text-[11px] text-[#8C4A60] font-medium">
                {items.length > 0 ? `${totalItemCount} item manis dipilih` : 'Belum ada pesanan'}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white hover:bg-[#FFE4EE] text-[#421525] hover:text-[#EE4B82] border border-[#FFD4E5] flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup Keranjang"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Items List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-3.5">
          {items.length === 0 ? (
            /* Empty State */
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <div className="w-16 h-16 rounded-3xl bg-[#FFEBF2] text-[#EE4B82] flex items-center justify-center mb-3.5 border border-[#FFD4E5]">
                <ShoppingCart className="w-7 h-7" strokeWidth={1.5} />
              </div>
              <h4 className="font-brand font-bold text-lg text-[#421525] mb-1">
                Keranjangmu Masih Kosong
              </h4>
              <p className="text-xs text-[#7D4759] max-w-xs mb-5">
                Yuk pilih bakes hangat atau minuman manis favoritmu dari menu!
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-md shadow-pink-200 transition-all cursor-pointer"
              >
                Lihat Menu Manis
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const isMax = item.quantity >= item.stock;

                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 bg-[#FFF8FA] p-3 rounded-2xl border border-[#FFEDF4] hover:border-[#FFD4E5] transition-all"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-[#FFD4E5]"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-brand font-bold text-xs sm:text-sm text-[#421525] truncate">
                            {item.name}
                          </h4>
                          <div className="text-xs font-bold text-[#EE4B82] mt-0.5">
                            {formatRupiah(item.price)}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#A06375] hover:text-[#EE4B82] transition-colors p-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Stepper & Stock */}
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#FFEDF4]">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1, item.stock)}
                            className="w-6 h-6 rounded-full bg-white hover:bg-[#FFE4EE] text-[#421525] border border-[#FFD4E5] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" strokeWidth={2.5} />
                          </button>
                          <span className="font-bold text-xs text-[#421525] min-w-[14px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => {
                              if (!isMax) {
                                updateQuantity(item.id, 1, item.stock);
                              } else {
                                showToast('warning', 'Batas stok', 'Stok habis / batas stok tercapai.');
                              }
                            }}
                            disabled={isMax}
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                              isMax
                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed border border-gray-200'
                                : 'bg-white hover:bg-[#FFE4EE] text-[#421525] border border-[#FFD4E5] cursor-pointer'
                            }`}
                          >
                            <Plus className="w-3 h-3" strokeWidth={2.5} />
                          </button>
                        </div>

                        <div className="text-[11px]">
                          {isMax ? (
                            <span className="text-[#EE4B82] font-bold">
                              Batas stok ({item.stock})
                            </span>
                          ) : (
                            <span className="text-[#8C4A60]">
                              Stok: {item.stock}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Warning banner when limit reached */}
              {hasMaxStockItem && (
                <div className="bg-[#FFEBF2] text-[#EE4B82] border border-[#FFD4E5] rounded-2xl p-3 text-xs flex items-center gap-2 mt-2 animate-fade-in font-medium">
                  <Info className="w-4 h-4 text-[#EE4B82] flex-shrink-0" />
                  <span>Jumlah pesanan telah mencapai batas stok tersedia.</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Section: Promo & Payment Breakdown */}
        <div className="p-5 sm:p-6 border-t border-[#FFEDF4] bg-white space-y-3.5">
          
          {/* Promo Code Input */}
          <div>
            <label className="block text-xs font-bold text-[#421525] mb-1.5 flex items-center justify-between">
              <span>Voucher Diskon</span>
              {promoCode && (
                <span className="text-[11px] text-[#EE4B82] font-extrabold flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> {promoCode} aktif!
                </span>
              )}
            </label>
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  setPromoError('');
                }}
                placeholder="Masukkan voucher (contoh: UTS25)"
                className="flex-1 bg-[#FFF8FA] border border-[#FFD4E5] rounded-2xl px-3.5 py-2 text-xs text-[#421525] placeholder:text-[#A06375] focus:outline-none focus:border-[#FF6B9E]"
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] hover:opacity-95 text-white text-xs font-bold px-4 py-2 rounded-2xl shadow-xs transition-all cursor-pointer"
              >
                Pakai
              </button>
            </form>

            {promoError && (
              <div className="text-[11px] text-[#EE4B82] font-bold mt-1">
                {promoError}
              </div>
            )}
          </div>

          {/* Breakdown */}
          <div className="space-y-1 pt-1 text-xs text-[#7D4759]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-[#421525]">{formatRupiah(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Diskon Voucher</span>
              <span className="font-bold text-[#EE4B82]">
                {totals.discount > 0 ? `- ${formatRupiah(totals.discount)}` : 'Rp 0'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pajak Restoran 10%</span>
              <span className="font-bold text-[#421525]">{formatRupiah(totals.tax)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-2.5 border-t border-[#FFEDF4]">
            <span className="font-brand font-bold text-base text-[#421525]">
              Total Bayar
            </span>
            <span className="font-brand font-black text-xl text-[#EE4B82]">
              {formatRupiah(totals.grandTotal)}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckoutSuccess}
            disabled={items.length === 0}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-pink-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Bayar Pesanan 🧁
          </button>

        </div>

      </div>
    </div>
  );
}
