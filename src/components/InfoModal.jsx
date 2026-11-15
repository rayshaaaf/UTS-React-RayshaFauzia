import React from 'react';
import { Star } from 'lucide-react';
import Modal from './Modal';
import { formatRupiah } from '../utils/pricing';

export default function InfoModal({ isOpen, onClose, item, comments = [] }) {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail Menu & Rasa" maxWidth="max-w-2xl">
      <div className="space-y-6">
        
        {/* Main Details (Photo + Info) */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-64 h-64 rounded-2xl overflow-hidden bg-[#FFE4EE] flex-shrink-0 border border-[#FFD4E5]">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80";
              }}
            />
          </div>

          <div className="flex-1 flex flex-col justify-start">
            <span className="bg-[#FFEBF2] text-[#D93874] text-xs font-bold px-3 py-1 rounded-full border border-[#FFD4E5] w-fit mb-2">
              {item.category}
            </span>

            <h3 className="font-brand font-black text-2xl sm:text-3xl text-[#421525]">
              {item.name}
            </h3>

            <div className="font-brand font-black text-2xl text-[#EE4B82] my-2">
              {formatRupiah(item.price)}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#7D4759] font-medium mb-3">
              <span>Stok: <strong>{item.stock} porsi</strong></span>
              <div className="flex items-center gap-1 font-bold text-[#EE4B82]">
                <Star className="w-4 h-4 fill-[#FF6B9E] text-[#FF6B9E]" />
                <span>{item.rating} / 5</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#7D4759] leading-relaxed bg-[#FFF8FA] p-3 rounded-2xl border border-[#FFEDF4]">
              {item.description}
            </p>
          </div>
        </div>

        {/* Divider & Reviews */}
        <div className="border-t border-[#FFEDF4] pt-4">
          <h4 className="font-brand font-bold text-base text-[#421525] mb-3">
            Ulasan Pecinta Manis 🍓
          </h4>

          <div className="space-y-3.5 max-h-56 overflow-y-auto pr-1">
            {comments.length === 0 ? (
              <p className="text-xs text-[#7D4759] italic py-2">
                Belum ada ulasan untuk menu ini. Jadilah yang pertama bercerita!
              </p>
            ) : (
              comments.map((rev, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-[#FFF8FA] p-3 rounded-2xl border border-[#FFEDF4]">
                  <img
                    src={rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0 border border-[#FFD4E5]"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#421525]">{rev.author}</span>
                      <span className="text-[#A06375] text-[11px]">
                        ⭐ {rev.rating}.0 · {rev.date || rev.time || 'Baru saja'}
                      </span>
                    </div>
                    <p className="text-xs text-[#7D4759] mt-1 leading-snug">
                      {rev.text}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </Modal>
  );
}
