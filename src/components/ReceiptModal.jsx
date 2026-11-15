import React from 'react';
import { Receipt } from 'lucide-react';
import Modal from './Modal';
import { formatRupiah } from '../utils/pricing';

export default function ReceiptModal({ isOpen, onClose, receiptData }) {
  if (!receiptData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-md">
      <div className="text-xs text-[#5A2E1B] space-y-4 pt-1">
        
        {/* Receipt Header */}
        <div className="text-center pb-2">
          <Receipt className="w-8 h-8 text-[#5A2E1B] mx-auto mb-2" strokeWidth={1.5} />
          <div className="font-heading font-black text-2xl text-[#5A2E1B] tracking-tight">
            KopiKu
          </div>
          <div className="font-heading font-bold text-xs text-[#5A2E1B]/75 tracking-widest mt-1 uppercase">
            STRUK PEMBAYARAN
          </div>
          <p className="text-xs text-[#5A2E1B]/60 mt-1">
            Pembayaran berhasil. Terima kasih!
          </p>
        </div>

        {/* Order Meta Info */}
        <div className="py-2.5 border-t border-dashed border-[#5A2E1B]/30 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[#5A2E1B]/70">No. pesanan</span>
            <span className="font-bold text-[#5A2E1B]">{receiptData.orderNo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#5A2E1B]/70">Tanggal</span>
            <span>{receiptData.date}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="py-2.5 border-t border-dashed border-[#5A2E1B]/30 space-y-2.5">
          {receiptData.items.map((it, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center">
                <span className="font-medium text-[#5A2E1B]">{it.qty} × {it.name}</span>
                <span className="font-bold text-[#5A2E1B]">{formatRupiah(it.qty * it.price)}</span>
              </div>
              <div className="text-[11px] text-[#5A2E1B]/55 text-center mt-0.5">
                {it.qty} × {formatRupiah(it.price)}
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="py-2.5 border-t border-dashed border-[#5A2E1B]/30 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="text-[#5A2E1B]/70">Subtotal</span>
            <span>{formatRupiah(receiptData.subtotal)}</span>
          </div>
          {receiptData.discount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-[#5A2E1B]/70">
                Diskon {receiptData.promoCode ? `· ${receiptData.promoCode}` : ''}
              </span>
              <span>- {formatRupiah(receiptData.discount)}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-[#5A2E1B]/70">Pajak 10%</span>
            <span>{formatRupiah(receiptData.tax)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-[#5A2E1B]/30">
          <span className="font-heading font-bold text-lg text-[#5A2E1B]">
            Total
          </span>
          <span className="font-heading font-black text-xl text-[#5A2E1B]">
            {formatRupiah(receiptData.total)}
          </span>
        </div>

        {/* Tutup Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 mt-4 rounded-full bg-[#B8805F] hover:bg-[#A66F4E] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
        >
          Tutup
        </button>

      </div>
    </Modal>
  );
}
