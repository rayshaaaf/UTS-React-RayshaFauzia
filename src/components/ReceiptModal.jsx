import React from 'react';
import { Receipt, Check } from 'lucide-react';
import Modal from './Modal';
import { formatRupiah } from '../utils/pricing';

export default function ReceiptModal({ isOpen, onClose, receiptData }) {
  if (!receiptData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="" maxWidth="max-w-md">
      <div className="text-xs text-[#421525] space-y-4 pt-1">
        
        {/* Receipt Header */}
        <div className="text-center pb-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FFEBF2] text-[#EE4B82] flex items-center justify-center mx-auto mb-2.5 border border-[#FFD4E5]">
            <Receipt className="w-6 h-6" strokeWidth={1.5} />
          </div>
          <div className="font-brand font-black text-2xl text-[#421525] tracking-tight">
            Rosé Café &amp; Bakery
          </div>
          <div className="font-brand font-bold text-xs text-[#EE4B82] tracking-widest mt-0.5 uppercase">
            STRUK PEMBAYARAN RESMI
          </div>
          <p className="text-[11px] text-[#7D4759] mt-1">
            Pembayaran berhasil. Terima kasih sudah mampir!
          </p>
        </div>

        {/* Order Meta Info */}
        <div className="py-2.5 border-t border-dashed border-[#FFB8D2] space-y-1.5 font-medium">
          <div className="flex justify-between items-center">
            <span className="text-[#7D4759]">No. Pesanan</span>
            <span className="font-bold text-[#421525]">{receiptData.orderNo}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#7D4759]">Tanggal &amp; Waktu</span>
            <span>{receiptData.date}</span>
          </div>
        </div>

        {/* Items List */}
        <div className="py-2.5 border-t border-dashed border-[#FFB8D2] space-y-2.5">
          {receiptData.items.map((it, idx) => (
            <div key={idx}>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#421525]">{it.qty} × {it.name}</span>
                <span className="font-bold text-[#421525]">{formatRupiah(it.qty * it.price)}</span>
              </div>
              <div className="text-[11px] text-[#A06375] text-right mt-0.5">
                {it.qty} × {formatRupiah(it.price)}
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown */}
        <div className="py-2.5 border-t border-dashed border-[#FFB8D2] space-y-1.5 font-medium">
          <div className="flex justify-between items-center">
            <span className="text-[#7D4759]">Subtotal</span>
            <span>{formatRupiah(receiptData.subtotal)}</span>
          </div>
          {receiptData.discount > 0 && (
            <div className="flex justify-between items-center text-[#EE4B82] font-bold">
              <span>
                Diskon {receiptData.promoCode ? `· ${receiptData.promoCode}` : ''}
              </span>
              <span>- {formatRupiah(receiptData.discount)}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-[#7D4759]">Pajak Restoran 10%</span>
            <span>{formatRupiah(receiptData.tax)}</span>
          </div>
        </div>

        {/* Total */}
        <div className="flex justify-between items-center pt-3 border-t border-[#FFB8D2]">
          <span className="font-brand font-bold text-base text-[#421525]">
            Total Bayar
          </span>
          <span className="font-brand font-black text-2xl text-[#EE4B82]">
            {formatRupiah(receiptData.total)}
          </span>
        </div>

        {/* Tutup Button */}
        <button
          onClick={onClose}
          className="w-full py-3.5 mt-3 rounded-2xl bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-pink-200 transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          <span>Simpan &amp; Tutup Struk</span>
        </button>

      </div>
    </Modal>
  );
}
