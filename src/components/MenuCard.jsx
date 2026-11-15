import React from 'react';
import { Info, Heart, MessageCircle, Plus, Star } from 'lucide-react';
import { formatRupiah } from '../utils/pricing';

export default function MenuCard({
  item,
  isFavorite,
  cartQuantity = 0,
  onInfo,
  onToggleFavorite,
  onComment,
  onAddToCart
}) {
  const isOutOfStock = item.stock <= 0;
  const isLimitReached = cartQuantity >= item.stock;

  return (
    <div className="bg-[#E8DCCB] rounded-3xl p-5 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
      
      <div>
        {/* Photo Frame */}
        <div className="w-full h-48 rounded-2xl overflow-hidden bg-white/50">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded-2xl"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80";
            }}
          />
        </div>

        {/* Menu Title */}
        <h3 className="font-heading font-extrabold text-xl text-[#5A2E1B] mt-4 mb-2 tracking-tight">
          {item.name}
        </h3>

        {/* Category Pill & Price */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <span className="bg-white text-[#5A2E1B] text-xs font-semibold px-3 py-1 rounded-full shadow-xs">
            {item.category}
          </span>
          <span className="font-bold text-[#5A2E1B] text-base">
            {formatRupiah(item.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#5A2E1B]/85 leading-relaxed line-clamp-2 min-h-[34px] mb-3">
          {item.description}
        </p>

        {/* Stock & Rating */}
        <div className="flex items-center justify-between text-xs text-[#5A2E1B] font-medium mb-4">
          <span>
            Stok: {item.stock}{isLimitReached ? ' (maks.)' : ''}
          </span>
          <div className="flex items-center gap-1 font-semibold">
            <Star className="w-4 h-4 fill-[#B8805F] text-[#B8805F]" strokeWidth={1.5} />
            <span>{item.rating}</span>
          </div>
        </div>
      </div>

      {/* 4 Circular Action Buttons: Info, Favorite, Comment, Add to Cart */}
      <div className="flex items-center justify-between gap-2 pt-1">
        
        {/* Button 1: Info */}
        <button
          onClick={() => onInfo(item)}
          title="Detail menu"
          className="w-10 h-10 rounded-full bg-white hover:bg-white/90 text-[#5A2E1B] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
        >
          <Info className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Button 2: Favorite */}
        <button
          onClick={() => onToggleFavorite(item.id)}
          title={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
          className="w-10 h-10 rounded-full bg-white hover:bg-white/90 flex items-center justify-center transition-colors shadow-xs cursor-pointer"
        >
          <Heart
            className={`w-5 h-5 transition-transform ${
              isFavorite
                ? 'fill-[#D96A7B] text-[#D96A7B]'
                : 'text-[#5A2E1B]'
            }`}
            strokeWidth={2}
          />
        </button>

        {/* Button 3: Comment */}
        <button
          onClick={() => onComment(item)}
          title="Komentar menu"
          className="w-10 h-10 rounded-full bg-white hover:bg-white/90 text-[#5A2E1B] flex items-center justify-center transition-colors shadow-xs cursor-pointer"
        >
          <MessageCircle className="w-5 h-5" strokeWidth={2} />
        </button>

        {/* Button 4: Add to Cart */}
        <button
          onClick={() => onAddToCart(item)}
          disabled={isLimitReached || isOutOfStock}
          title={
            isOutOfStock
              ? 'Stok habis'
              : isLimitReached
              ? 'Batas stok tercapai'
              : 'Tambah ke keranjang'
          }
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs ${
            isLimitReached || isOutOfStock
              ? 'bg-[#B8805F]/40 text-white cursor-not-allowed'
              : 'bg-[#B8805F] hover:bg-[#A66F4E] text-white active:scale-95 cursor-pointer'
          }`}
        >
          <Plus className="w-5 h-5" strokeWidth={2} />
        </button>

      </div>

    </div>
  );
}
