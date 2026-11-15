import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingCart, Info } from 'lucide-react';
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
      showToast('promo', 'KopiKu', `Promo ${code} berhasil diterapkan.`);
    } else {
      setPromoError('Kode promo tidak valid');
      showToast('warning', 'Batas stok', 'Kode promo tidak valid.');
    }
  };

  const hasMaxStockItem = items.some((item) => item.quantity >= item.stock);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#5A2E1B]/35 backdrop-blur-xs animate-fade-in">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-slide-left">
        
        {/* Header */}
        <div className="p-6 border-b border-[#E8DCCB]/60 flex items-center justify-between">
          <h3 className="font-heading font-bold text-xl text-[#5A2E1B]">
            {items.length > 0 ? `Keranjang (${totalItemCount})` : 'Keranjang'}
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FFF3F1] hover:bg-[#FAD1D4] text-[#5A2E1B] flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup Keranjang"
          >
            <X className="w-4 h-4" strokeWidth={2} />
          </button>
        </div>

        {/* Items List (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            /* Empty State (Page 10) */
            <div className="flex flex-col items-center justify-center h-full py-20 text-center">
              <ShoppingCart className="w-8 h-8 text-[#5A2E1B]/50 mb-4" strokeWidth={1.5} />
              <h4 className="font-heading font-bold text-lg text-[#5A2E1B] mb-1">
                Keranjangmu masih kosong
              </h4>
              <p className="text-xs text-[#5A2E1B]/60 max-w-xs mb-6">
                Pilih menu favoritmu untuk memulai.
              </p>
              <button
                onClick={onClose}
                className="bg-[#B8805F] hover:bg-[#A66F4E] text-white text-xs font-bold px-6 py-2.5 rounded-full shadow-xs transition-colors cursor-pointer"
              >
                Lihat menu
              </button>
            </div>
          ) : (
            <>
              {items.map((item) => {
                const isMax = item.quantity >= item.stock;

                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3.5 pb-4 border-b border-[#E8DCCB]/40"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-xl object-cover flex-shrink-0 bg-white/50"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-heading font-bold text-sm text-[#5A2E1B] truncate">
                            {item.name}
                          </h4>
                          <div className="text-xs text-[#5A2E1B]/70 mt-0.5 font-medium">
                            {formatRupiah(item.price)}
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#5A2E1B]/50 hover:text-[#D96A7B] transition-colors p-1"
                          title="Hapus"
                        >
                          <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Stepper & Stock */}
                      <div className="flex items-center gap-3 mt-2.5">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => updateQuantity(item.id, -1, item.stock)}
                            className="w-6 h-6 rounded-full bg-[#FFF3F1] hover:bg-[#FAD1D4] text-[#5A2E1B] flex items-center justify-center transition-colors cursor-pointer"
                          >
                            <Minus className="w-3 h-3" strokeWidth={2} />
                          </button>
                          <span className="font-bold text-xs text-[#5A2E1B] min-w-[14px] text-center">
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
                                ? 'bg-gray-100 text-gray-300 cursor-not-allowed'
                                : 'bg-[#FFF3F1] hover:bg-[#FAD1D4] text-[#5A2E1B] cursor-pointer'
                            }`}
                          >
                            <Plus className="w-3 h-3" strokeWidth={2} />
                          </button>
                        </div>
                      </div>

                      {/* Stock Info or Max Alert */}
                      <div className="text-[11px] mt-1.5">
                        {isMax ? (
                          <span className="text-[#D96A7B] font-medium">
                            Batas stok tercapai · Stok: {item.stock}
                          </span>
                        ) : (
                          <span className="text-[#5A2E1B]/60">
                            Stok: {item.stock}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Warning banner when limit reached */}
              {hasMaxStockItem && (
                <div className="bg-[#FFF3F1] text-[#5A2E1B] border border-[#FAD1D4] rounded-2xl p-3.5 text-xs flex items-center gap-2 mt-3 animate-fade-in">
                  <Info className="w-4 h-4 text-[#5A2E1B]/70 flex-shrink-0" />
                  <span>Jumlah maksimum sesuai stok tersedia.</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Bottom Section: Promo & Payment Breakdown */}
        <div className="p-6 border-t border-[#E8DCCB]/60 bg-white space-y-4">
          
          {/* Promo Code Input */}
          <div>
            <label className="block text-xs font-semibold text-[#5A2E1B] mb-1.5">
              Kode promo
            </label>
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => {
                  setInputCode(e.target.value);
                  setPromoError('');
                }}
                placeholder="Masukkan kode"
                className="flex-1 bg-[#FFF3F1] border border-[#FAD1D4] rounded-xl px-4 py-2.5 text-xs text-[#5A2E1B] placeholder-[#5A2E1B]/40 focus:outline-none focus:ring-2 focus:ring-[#B8805F]/40"
              />
              <button
                type="submit"
                className="bg-[#B8805F] hover:bg-[#A66F4E] text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Terapkan
              </button>
            </form>

            {promoCode && PROMO_CODES[promoCode] && (
              <div className="text-xs text-[#5A2E1B] font-medium mt-1.5">
                {promoCode} diterapkan · {PROMO_CODES[promoCode].label}
              </div>
            )}

            {promoError && (
              <div className="text-xs text-[#D96A7B] font-medium mt-1.5">
                {promoError}
              </div>
            )}
          </div>

          {/* Breakdown */}
          <div className="space-y-1.5 pt-2 text-xs text-[#5A2E1B]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-semibold">{formatRupiah(totals.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span>Diskon</span>
              <span className="font-semibold">
                {totals.discount > 0 ? `- ${formatRupiah(totals.discount)}` : 'Rp 0'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Pajak 10%</span>
              <span className="font-semibold">{formatRupiah(totals.tax)}</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-2 border-t border-[#E8DCCB]/60">
            <span className="font-heading font-bold text-lg text-[#5A2E1B]">
              Total
            </span>
            <span className="font-heading font-black text-xl text-[#5A2E1B]">
              {formatRupiah(totals.grandTotal)}
            </span>
          </div>

          {/* Checkout Button */}
          <button
            onClick={onCheckoutSuccess}
            disabled={items.length === 0}
            className="w-full py-3.5 rounded-xl bg-[#B8805F] hover:bg-[#A66F4E] text-white font-bold text-sm shadow-xs transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Bayar
          </button>

        </div>

      </div>
    </div>
  );
}
