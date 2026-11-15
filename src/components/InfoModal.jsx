import React from 'react';
import { Star } from 'lucide-react';
import Modal from './Modal';
import { formatRupiah } from '../utils/pricing';

export default function InfoModal({ isOpen, onClose, item, comments = [] }) {
  if (!item) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Detail menu" maxWidth="max-w-2xl">
      <div className="space-y-6">
        
        {/* Main Details (Photo + Info) */}
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="w-full sm:w-64 h-60 rounded-2xl overflow-hidden bg-white/50 flex-shrink-0">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover rounded-2xl"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80";
              }}
            />
          </div>

          <div className="flex-1 flex flex-col justify-start">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#5A2E1B]">
              {item.name}
            </h3>
            
            <div className="text-xs font-semibold text-[#5A2E1B]/70 mt-1 mb-2">
              {item.category}
            </div>

            <div className="font-heading font-bold text-2xl text-[#5A2E1B] mb-2.5">
              {formatRupiah(item.price)}
            </div>

            <div className="flex items-center gap-3 text-xs text-[#5A2E1B] font-medium mb-3">
              <span>Stok: {item.stock}</span>
              <div className="flex items-center gap-1 font-semibold">
                <Star className="w-4 h-4 fill-[#B8805F] text-[#B8805F]" strokeWidth={1.5} />
                <span>{item.rating} / 5</span>
              </div>
            </div>

            <p className="text-xs text-[#5A2E1B]/80 leading-relaxed font-normal">
              {item.description}
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#E8DCCB] pt-4">
          <h4 className="font-heading font-bold text-base text-[#5A2E1B] mb-4">
            Ulasan pelanggan
          </h4>

          <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
            {comments.length === 0 ? (
              <p className="text-xs text-[#5A2E1B]/60 italic py-2">
                Belum ada ulasan untuk menu ini.
              </p>
            ) : (
              comments.map((rev, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <img
                    src={rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                    alt={rev.author}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#5A2E1B]">{rev.author}</span>
                      <span className="text-[#5A2E1B]/60 text-[11px]">
                        {rev.rating}.0 · {rev.date || rev.time || 'Baru saja'}
                      </span>
                    </div>
                    <p className="text-xs text-[#5A2E1B]/80 mt-1 leading-snug">
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
