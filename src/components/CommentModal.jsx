import React, { useState } from 'react';
import { MessageCircle, Check } from 'lucide-react';
import Modal from './Modal';
import StarRating from './StarRating';
import { formatRupiah } from '../utils/pricing';

export default function CommentModal({
  isOpen,
  onClose,
  item,
  comments = [],
  onSubmitComment
}) {
  const [rating, setRating] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [ratingError, setRatingError] = useState(false);
  const [textError, setTextError] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!item) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    if (rating === 0) {
      setRatingError(true);
      hasError = true;
    } else {
      setRatingError(false);
    }

    if (commentText.trim().length < 5) {
      setTextError(true);
      hasError = true;
    } else {
      setTextError(false);
    }

    if (hasError) return;

    // Submit new comment - it will be added to the TOP instantly without closing popup!
    onSubmitComment(item.id, {
      author: 'Pelanggan KopiKu',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
      rating,
      text: commentText.trim(),
      date: 'Baru saja'
    });

    // Reset form
    setCommentText('');
    setRating(0);
    setRatingError(false);
    setTextError(false);
    setSubmittedSuccess(true);
    setTimeout(() => setSubmittedSuccess(false), 4000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Komentar menu" maxWidth="max-w-lg">
      <div className="space-y-4">
        
        {/* Product Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-[#E8DCCB]">
          <img
            src={item.image}
            alt={item.name}
            className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80";
            }}
          />
          <div>
            <h4 className="font-heading font-bold text-base text-[#5A2E1B]">
              {item.name}
            </h4>
            <div className="text-xs text-[#5A2E1B]/70">
              {item.category} · {formatRupiah(item.price)}
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div>
            <label className="block font-heading font-bold text-sm text-[#5A2E1B] mb-2">
              Bagaimana rasanya?
            </label>
            
            <StarRating
              rating={rating}
              interactive={true}
              size={24}
              onRatingChange={(val) => {
                setRating(val);
                setRatingError(false);
              }}
            />

            {ratingError && (
              <p className="text-xs text-[#D96A7B] mt-1.5 font-medium">
                Pilih rating bintang terlebih dahulu
              </p>
            )}
          </div>

          <div>
            <textarea
              rows={3}
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
                if (e.target.value.trim().length >= 5) setTextError(false);
              }}
              placeholder="Tulis pengalamanmu di sini..."
              className="w-full bg-[#FFF3F1] border border-[#FAD1D4] rounded-2xl p-4 text-xs text-[#5A2E1B] placeholder-[#5A2E1B]/40 focus:outline-none focus:ring-2 focus:ring-[#B8805F]/40 resize-none"
            />

            {textError && (
              <p className="text-xs text-[#D96A7B] mt-1 font-medium">
                Komentar minimal 5 karakter
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#B8805F] hover:bg-[#A66F4E] text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            Kirim
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-[#E8DCCB] pt-4">
          <h4 className="font-heading font-bold text-base text-[#5A2E1B] mb-3">
            Komentar ({comments.length})
          </h4>

          {/* Success message banner */}
          {submittedSuccess && (
            <div className="bg-[#FFF3F1] border border-[#FAD1D4] text-[#5A2E1B] text-xs px-3.5 py-2.5 rounded-xl mb-3 flex items-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Komentar terkirim dan ditambahkan di paling atas.</span>
            </div>
          )}

          {/* Comments List or Empty State */}
          {comments.length === 0 ? (
            <div className="bg-[#FFF3F1] rounded-2xl p-8 text-center flex flex-col items-center justify-center">
              <MessageCircle className="w-6 h-6 text-[#5A2E1B]/60 mb-2" strokeWidth={1.5} />
              <div className="font-heading font-bold text-sm text-[#5A2E1B] mb-1">
                Belum ada komentar
              </div>
              <div className="text-xs text-[#5A2E1B]/60">
                Jadilah yang pertama berbagi cerita.
              </div>
            </div>
          ) : (
            <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
              {comments.map((rev, idx) => (
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
                    <div className="flex items-center gap-0.5 my-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className={`text-xs ${s <= rev.rating ? 'text-[#B8805F]' : 'text-gray-300'}`}>
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-xs text-[#5A2E1B]/80 leading-snug">
                      {rev.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Modal>
  );
}
