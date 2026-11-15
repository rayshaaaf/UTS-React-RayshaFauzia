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
    <div className="bg-white rounded-[26px] p-4 border border-[#FFD4E5] shadow-xs hover:shadow-xl hover:shadow-pink-200/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
      
      <div>
        {/* Poster Photo Frame */}
        <div className="w-full h-52 rounded-2xl overflow-hidden bg-[#FFF2F6] relative">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80";
            }}
          />
        </div>

        {/* Menu Title */}
        <h3 className="font-brand font-bold text-lg text-[#421525] mt-3.5 mb-1.5 tracking-tight group-hover:text-[#EE4B82] transition-colors">
          {item.name}
        </h3>

        {/* Category Pill & Price */}
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="bg-[#FFEBF2] text-[#D93874] text-[11px] font-bold px-3 py-1 rounded-full border border-[#FFD4E5]">
            {item.category}
          </span>
          <span className="font-brand font-black text-base text-[#EE4B82]">
            {formatRupiah(item.price)}
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-[#7D4759] leading-relaxed line-clamp-2 min-h-[32px] mb-3">
          {item.description}
        </p>

        {/* Stock & Rating */}
        <div className="flex items-center justify-between text-xs text-[#7D4759] font-medium mb-3.5 pt-2 border-t border-[#FFEDF4]">
          <span>
            Stok: <strong className={item.stock <= 3 ? "text-[#EE4B82]" : "text-[#421525]"}>{item.stock}</strong>
            {isLimitReached && <span className="text-[#EE4B82] text-[10px] ml-1 font-bold">(maks)</span>}
          </span>
          <div className="flex items-center gap-1 font-bold text-[#EE4B82]">
            <Star className="w-3.5 h-3.5 fill-[#FF6B9E] text-[#FF6B9E]" />
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
          className="w-10 h-10 rounded-full bg-[#FFF2F6] hover:bg-[#FFE4EE] text-[#421525] hover:text-[#EE4B82] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
        >
          <Info className="w-4 h-4" strokeWidth={2} />
        </button>

        {/* Button 2: Favorite */}
        <button
          onClick={() => onToggleFavorite(item.id)}
          title={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
          className="w-10 h-10 rounded-full bg-[#FFF2F6] hover:bg-[#FFE4EE] flex items-center justify-center transition-all cursor-pointer shadow-2xs group/fav"
        >
          <Heart
            className={`w-4 h-4 transition-transform group-hover/fav:scale-125 ${
              isFavorite
                ? 'fill-[#EE4B82] text-[#EE4B82]'
                : 'text-[#421525]'
            }`}
            strokeWidth={2}
          />
        </button>

        {/* Button 3: Comment */}
        <button
          onClick={() => onComment(item)}
          title="Komentar menu"
          className="w-10 h-10 rounded-full bg-[#FFF2F6] hover:bg-[#FFE4EE] text-[#421525] hover:text-[#EE4B82] flex items-center justify-center transition-all cursor-pointer shadow-2xs"
        >
          <MessageCircle className="w-4 h-4" strokeWidth={2} />
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
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md ${
            isLimitReached || isOutOfStock
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
              : 'bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] hover:opacity-95 text-white active:scale-95 cursor-pointer shadow-pink-300/40'
          }`}
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>

      </div>

    </div>
  );
}
