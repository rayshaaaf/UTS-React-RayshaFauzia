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
      author: 'Pelanggan Rosé',
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
    <Modal isOpen={isOpen} onClose={onClose} title="Beri Ulasan Menu" maxWidth="max-w-lg">
      <div className="space-y-4">
        
        {/* Product Header */}
        <div className="flex items-center gap-3.5 pb-4 border-b border-[#FFEDF4]">
          <img
            src={item.image}
            alt={item.name}
            className="w-14 h-14 rounded-2xl object-cover flex-shrink-0 border border-[#FFD4E5]"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80";
            }}
          />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#EE4B82] block">
              {item.category}
            </span>
            <h4 className="font-brand font-bold text-base text-[#421525]">
              {item.name}
            </h4>
            <div className="text-xs font-bold text-[#EE4B82]">
              {formatRupiah(item.price)}
            </div>
          </div>
        </div>

        {/* Comment Form */}
        <form onSubmit={handleSubmit} className="space-y-3 pt-1">
          <div>
            <label className="block font-brand font-bold text-xs text-[#421525] mb-2">
              Bagaimana rasanya? (Pilih 1 - 5 Bintang)
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
              <p className="text-xs text-[#EE4B82] mt-1.5 font-bold">
                Pilih rating bintang terlebih dahulu ya!
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
              placeholder="Ceritakan rasa favoritmu di sini..."
              className="w-full bg-[#FFF8FA] border border-[#FFD4E5] rounded-2xl p-3.5 text-xs text-[#421525] placeholder:text-[#A06375] focus:outline-none focus:border-[#FF6B9E] focus:ring-4 focus:ring-[#FFD4E5]/40 resize-none"
            />

            {textError && (
              <p className="text-xs text-[#EE4B82] mt-1 font-bold">
                Komentar minimal 5 karakter ya!
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] hover:opacity-95 text-white font-bold text-sm shadow-md shadow-pink-200 transition-all cursor-pointer"
          >
            Kirim Ulasan 💌
          </button>
        </form>

        {/* Divider & Comments List */}
        <div className="border-t border-[#FFEDF4] pt-4">
          <h4 className="font-brand font-bold text-base text-[#421525] mb-3">
            Ulasan ({comments.length})
          </h4>

          {/* Success banner */}
          {submittedSuccess && (
            <div className="bg-[#FFEBF2] border border-[#FFD4E5] text-[#EE4B82] text-xs px-3.5 py-2.5 rounded-2xl mb-3 flex items-center gap-2 animate-fade-in font-medium">
              <Check className="w-4 h-4 text-[#EE4B82] flex-shrink-0" />
              <span>Ulasanmu berhasil dikirim dan tampil di paling atas!</span>
            </div>
          )}

          {/* Comments List or Empty State */}
          {comments.length === 0 ? (
            <div className="bg-[#FFF8FA] rounded-2xl p-6 text-center flex flex-col items-center justify-center border border-[#FFEDF4]">
              <MessageCircle className="w-6 h-6 text-[#EE4B82] mb-1.5" strokeWidth={1.5} />
              <div className="font-brand font-bold text-sm text-[#421525] mb-0.5">
                Belum ada ulasan
              </div>
              <div className="text-xs text-[#7D4759]">
                Jadilah yang pertama berbagi cerita manis.
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-52 overflow-y-auto pr-1">
              {comments.map((rev, idx) => (
                <div key={idx} className="bg-[#FFF8FA] p-3 rounded-2xl border border-[#FFEDF4] flex items-start gap-3">
                  <img
                    src={rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"}
                    alt={rev.author}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0 border border-[#FFD4E5]"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80";
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-bold text-[#421525]">{rev.author}</span>
                      <span className="text-[#A06375] text-[11px]">
                        {'★'.repeat(rev.rating)} · {rev.date || rev.time || 'Baru saja'}
                      </span>
                    </div>
                    <p className="text-xs text-[#7D4759] mt-1 leading-snug">
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
