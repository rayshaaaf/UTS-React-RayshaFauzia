import React, { useState } from 'react';
import { RotateCcw, Receipt } from 'lucide-react';
import Modal from './Modal';
import { formatRupiah } from '../utils/pricing';

export default function HistoryModal({
  isOpen,
  onClose,
  historyOrders = [],
  onResetAll
}) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  // Total Belanja
  const grandTotalSpent = historyOrders.reduce((sum, order) => sum + (order.total || 0), 0);

  const handleConfirmReset = () => {
    onResetAll();
    setShowConfirmReset(false);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Riwayat Pesanan Kamu 🎀" maxWidth="max-w-xl">
        <div className="space-y-4">
          
          {/* Orders List or Empty State */}
          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {historyOrders.length === 0 ? (
              /* Empty State */
              <div className="bg-[#FFF8FA] rounded-3xl p-10 text-center flex flex-col items-center justify-center border border-[#FFEDF4]">
                <div className="w-14 h-14 rounded-2xl bg-[#FFEBF2] text-[#EE4B82] flex items-center justify-center mb-3 border border-[#FFD4E5]">
                  <RotateCcw className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <h4 className="font-brand font-bold text-base text-[#421525] mb-1">
                  Belum Ada Riwayat Pesanan
                </h4>
                <p className="text-xs text-[#7D4759]">
                  Pesanan yang kamu bayar akan tercatat rapi di sini.
                </p>
              </div>
            ) : (
              historyOrders.map((order, idx) => (
                <div
                  key={order.orderNo || idx}
                  className="bg-[#FFF8FA] rounded-2xl p-4 border border-[#FFEDF4] space-y-1.5 hover:border-[#FFD4E5] transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-[#EE4B82]" strokeWidth={2} />
                      <span className="font-brand font-bold text-xs text-[#421525]">
                        {order.orderNo}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold bg-[#FFEBF2] text-[#EE4B82] px-2.5 py-0.5 rounded-full border border-[#FFD4E5]">
                      Lunas ✨
                    </span>
                  </div>

                  <div className="text-[11px] text-[#A06375]">
                    {order.date}
                  </div>

                  <div className="text-xs text-[#7D4759] pt-0.5">
                    {order.items.map((it) => `${it.qty}× ${it.name}`).join(' · ')}
                  </div>

                  <div className="font-brand font-black text-base text-[#EE4B82] pt-1">
                    {formatRupiah(order.total)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Total Belanja & Reset Button */}
          <div className="pt-3 border-t border-[#FFEDF4]">
            <div className="flex items-center justify-between mb-4 bg-[#FFEBF2] p-3.5 rounded-2xl border border-[#FFD4E5]">
              <span className="font-brand font-bold text-xs sm:text-sm text-[#421525]">
                Total Belanja Kamu
              </span>
              <span className="font-brand font-black text-lg sm:text-xl text-[#EE4B82]">
                {formatRupiah(grandTotalSpent)}
              </span>
            </div>

            {/* Reset Stok + Riwayat */}
            <button
              onClick={() => setShowConfirmReset(true)}
              className="w-full py-3 rounded-2xl bg-white hover:bg-rose-50 text-[#EE4B82] hover:text-rose-700 font-bold text-xs border border-rose-200 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2} />
              <span>Reset Stok &amp; Riwayat Transaksi</span>
            </button>
          </div>

        </div>
      </Modal>

      {/* ==================================================== */}
      {/* Custom Reset Confirmation Modal                      */}
      {/* ==================================================== */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#421525]/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl border border-[#FFD4E5] animate-fade-in">
            <div className="w-12 h-12 rounded-2xl bg-[#FFEBF2] text-[#EE4B82] flex items-center justify-center mx-auto mb-3.5 border border-[#FFD4E5]">
              <RotateCcw className="w-5 h-5" strokeWidth={2} />
            </div>

            <h3 className="font-brand font-bold text-lg text-[#421525] mb-1.5">
              Yakin reset stok dan riwayat?
            </h3>
            
            <p className="text-xs text-[#7D4759] leading-relaxed mb-5">
              Stok 15 menu akan dikembalikan ke jumlah awal dan seluruh riwayat belanja akan dikosongkan.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-2.5 rounded-full bg-[#FFF8FA] hover:bg-[#FFE4EE] text-[#421525] font-bold text-xs border border-[#FFD4E5] transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-2.5 rounded-full bg-[#EE4B82] hover:bg-rose-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Ya, Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
