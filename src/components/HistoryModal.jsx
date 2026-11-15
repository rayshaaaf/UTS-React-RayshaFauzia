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
      <Modal isOpen={isOpen} onClose={onClose} title="Riwayat Transaksi" maxWidth="max-w-xl">
        <div className="space-y-4">
          
          {/* Orders List or Empty State */}
          <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
            {historyOrders.length === 0 ? (
              /* Empty State (Page 13) */
              <div className="bg-[#FFF3F1] rounded-2xl p-10 text-center flex flex-col items-center justify-center">
                <RotateCcw className="w-6 h-6 text-[#5A2E1B]/60 mb-2.5" strokeWidth={1.5} />
                <h4 className="font-heading font-bold text-base text-[#5A2E1B] mb-1">
                  Belum ada transaksi
                </h4>
                <p className="text-xs text-[#5A2E1B]/60">
                  Pesanan yang sudah dibayar akan muncul di sini.
                </p>
              </div>
            ) : (
              historyOrders.map((order, idx) => (
                <div
                  key={order.orderNo || idx}
                  className="bg-[#FFF3F1] rounded-2xl p-4.5 space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-4 h-4 text-[#5A2E1B]/70" strokeWidth={1.5} />
                      <span className="font-bold text-xs text-[#5A2E1B]">
                        {order.orderNo}
                      </span>
                    </div>
                    <span className="text-xs text-[#5A2E1B]/60">
                      Lunas
                    </span>
                  </div>

                  <div className="text-[11px] text-[#5A2E1B]/60">
                    {order.date}
                  </div>

                  <div className="text-xs text-[#5A2E1B]/80 pt-0.5">
                    {order.items.map((it) => `${it.qty}× ${it.name}`).join(' · ')}
                  </div>

                  <div className="font-heading font-black text-lg text-[#5A2E1B] pt-1">
                    {formatRupiah(order.total)}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer: Total Belanja & Reset Button */}
          <div className="pt-3 border-t border-[#E8DCCB]">
            <div className="flex items-center justify-between mb-4">
              <span className="font-heading font-bold text-sm text-[#5A2E1B]">
                Total Belanja
              </span>
              <span className="font-heading font-black text-xl text-[#5A2E1B]">
                {formatRupiah(grandTotalSpent)}
              </span>
            </div>

            {/* Rose-Red Button: Reset Stok + Riwayat */}
            <button
              onClick={() => setShowConfirmReset(true)}
              className="w-full py-3.5 rounded-full bg-[#D96A7B] hover:bg-[#C55364] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" strokeWidth={2} />
              <span>Reset Stok + Riwayat</span>
            </button>
          </div>

        </div>
      </Modal>

      {/* ==================================================== */}
      {/* E2. Custom Reset Confirmation Modal (Page 14)        */}
      {/* ==================================================== */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-[#5A2E1B]/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-7 text-center shadow-2xl animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#FFF3F1] text-[#D96A7B] flex items-center justify-center mx-auto mb-4">
              <RotateCcw className="w-5 h-5" strokeWidth={2} />
            </div>

            <h3 className="font-heading font-bold text-xl text-[#5A2E1B] mb-2">
              Yakin reset stok dan riwayat?
            </h3>
            
            <p className="text-xs text-[#5A2E1B]/70 leading-relaxed mb-6">
              Stok menu akan dikembalikan ke jumlah awal dan seluruh riwayat transaksi dihapus.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowConfirmReset(false)}
                className="flex-1 py-3 rounded-full bg-[#FFF3F1] hover:bg-[#FAD1D4] text-[#5A2E1B] font-bold text-xs transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleConfirmReset}
                className="flex-1 py-3 rounded-full bg-[#D96A7B] hover:bg-[#C55364] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
