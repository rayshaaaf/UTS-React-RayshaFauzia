import React, { useState } from 'react';
import { Search, Heart, ChevronDown } from 'lucide-react';
import MenuCard from './MenuCard';

export default function MainContent({
  menuList = [],
  favorites = [],
  cartItems = [],
  currentCategory = 'Semua',
  onSelectCategory,
  sortOption = 'default',
  onSortChange,
  searchQuery = '',
  onInfo,
  onToggleFavorite,
  onComment,
  onAddToCart,
  onApplyPromoCode
}) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  // Category counts
  const categoryCounts = {
    Semua: 15,
    Kopi: 4,
    'Non-Kopi': 4,
    Makanan: 3,
    Snack: 4,
    Favorit: favorites.length
  };

  const categories = ['Semua', 'Kopi', 'Non-Kopi', 'Makanan', 'Snack', 'Favorit'];

  // Sorting label mapping
  const sortLabels = {
    default: 'Urutkan menu',
    'price-asc': 'Harga',
    'rating': 'Rating',
    'name': 'Nama',
    'fav-newest': 'Favorit terbaru',
    'fav-oldest': 'Favorit terlama'
  };

  // Subtitle logic
  let subtitleText = '15 menu untuk menemani harimu.';
  if (searchQuery.trim()) {
    subtitleText = `${menuList.length} menu ditemukan untuk “${searchQuery}”.`;
  } else if (currentCategory === 'Favorit') {
    subtitleText = 'Menu favoritmu, dalam satu tempat.';
  }

  return (
    <div className="w-full">
      
      {/* ==================================================== */}
      {/* 1. HERO BANNER (Full-width banner image)             */}
      {/* ==================================================== */}
      <section className="w-full bg-[#5A2E1B] overflow-hidden">
        <div className="max-w-[1440px] mx-auto">
          <img
            src="/images/hero-banner.jpg"
            alt="Order Coffee - Welcome"
            className="w-full h-auto object-cover max-h-[460px] select-none block"
            onError={(e) => {
              // Fallback to high quality latte banner
              e.target.src = "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=1600&q=80";
            }}
          />
        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. MENU CONTENT (1440px Container)                   */}
      {/* ==================================================== */}
      <section className="max-w-[1440px] mx-auto px-8 lg:px-16 pt-12 pb-16">
        
        {/* Section Heading */}
        <div className="mb-8">
          <div className="flex items-baseline gap-3 mb-1">
            <h2 className="font-heading text-4xl sm:text-5xl font-black text-[#5A2E1B]">
              Menu
            </h2>
            <span className="font-serif-italic text-3xl sm:text-4xl text-[#5A2E1B]">
              drinks
            </span>
          </div>
          <p className="text-sm text-[#5A2E1B]/75 font-normal">
            {subtitleText}
          </p>
        </div>

        {/* Filter Pills & Sort Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            {categories.map((cat) => {
              const count = categoryCounts[cat] ?? 0;
              const isActive = currentCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#B8805F] text-white shadow-xs'
                      : 'border border-[#B8805F]/60 text-[#5A2E1B] bg-transparent hover:bg-[#FAD1D4]'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 border border-[#B8805F]/60 rounded-full px-5 py-2 text-sm font-medium text-[#5A2E1B] bg-white/50 hover:bg-white transition-colors cursor-pointer"
            >
              <span>{sortOption === 'default' ? 'Urutkan menu' : `Urutkan: ${sortLabels[sortOption] || 'menu'}`}</span>
              <ChevronDown className="w-4 h-4 text-[#5A2E1B]" />
            </button>

            {isSortOpen && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-[#E8DCCB] py-2 z-30 animate-fade-in text-sm">
                  {[
                    { id: 'price-asc', label: 'Harga' },
                    { id: 'rating', label: 'Rating' },
                    { id: 'name', label: 'Nama' },
                    { id: 'fav-newest', label: 'Favorit terbaru' },
                    { id: 'fav-oldest', label: 'Favorit terlama' }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onSortChange(opt.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 hover:bg-[#FFF3F1] transition-colors cursor-pointer ${
                        sortOption === opt.id ? 'font-bold text-[#B8805F] bg-[#FFF3F1]' : 'text-[#5A2E1B]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

        </div>

        {/* Menu Grid or Empty States */}
        {menuList.length === 0 ? (
          searchQuery.trim() !== '' ? (
            /* Search Empty State (Page 18) */
            <div className="py-24 text-center flex flex-col items-center justify-center">
              <Search className="w-8 h-8 text-[#5A2E1B]/60 mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-2xl font-bold text-[#5A2E1B] mb-2">
                Menu tidak ditemukan
              </h3>
              <p className="text-sm text-[#5A2E1B]/70 max-w-md">
                Coba kata kunci lain atau cari nama menu favoritmu.
              </p>
            </div>
          ) : (
            /* Favorite Empty State (Page 19) */
            <div className="py-24 text-center flex flex-col items-center justify-center">
              <Heart className="w-8 h-8 text-[#5A2E1B]/60 mb-4" strokeWidth={1.5} />
              <h3 className="font-heading text-2xl font-bold text-[#5A2E1B] mb-2">
                Belum ada menu favorit
              </h3>
              <p className="text-sm text-[#5A2E1B]/70 max-w-md">
                Ketuk ikon hati pada menu yang kamu suka.
              </p>
            </div>
          )
        ) : (
          /* 4-Column Desktop Menu Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {menuList.map((item) => {
              const inCart = cartItems.find((c) => c.id === item.id);
              const qty = inCart ? inCart.quantity : 0;
              const isFav = favorites.includes(item.id);

              return (
                <MenuCard
                  key={item.id}
                  item={item}
                  isFavorite={isFav}
                  cartQuantity={qty}
                  onInfo={onInfo}
                  onToggleFavorite={onToggleFavorite}
                  onComment={onComment}
                  onAddToCart={onAddToCart}
                />
              );
            })}
          </div>
        )}

      </section>

      {/* ==================================================== */}
      {/* 3. PROMO SECTION ("New drink / a little treat")       */}
      {/* ==================================================== */}
      <section className="w-full bg-[#FAD1D4] py-14 px-8 lg:px-16 overflow-hidden">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left: Text & Vouchers */}
          <div className="flex-1 max-w-xl text-left">
            <div className="mb-4">
              <h3 className="font-heading text-4xl sm:text-5xl font-black text-[#5A2E1B] leading-none mb-1">
                New
              </h3>
              <div className="flex items-baseline gap-3">
                <span className="font-heading text-4xl sm:text-5xl font-black text-[#5A2E1B] leading-none">
                  drink
                </span>
                <span className="font-serif-italic text-2xl sm:text-3xl text-[#5A2E1B]">
                  a little treat
                </span>
              </div>
            </div>

            <h4 className="font-bold text-xl sm:text-2xl text-[#5A2E1B] mt-5 mb-1.5">
              Coconut Iced Latte
            </h4>
            <p className="text-sm text-[#5A2E1B]/80 leading-relaxed max-w-md mb-6">
              Kopi creamy dengan sentuhan kelapa yang lembut.
            </p>

            {/* Promo Code Chips */}
            <div>
              <span className="text-xs text-[#5A2E1B] font-semibold block mb-2.5">
                Pakai kode favoritmu:
              </span>
              <div className="flex items-center gap-3">
                {['UTS25', 'HEMAT10', 'KOPI15'].map((code) => (
                  <button
                    key={code}
                    onClick={() => onApplyPromoCode(code)}
                    className="bg-white hover:bg-[#B8805F] text-[#5A2E1B] hover:text-white font-bold text-xs px-5 py-2 rounded-full shadow-xs transition-colors cursor-pointer"
                  >
                    {code}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price & Real Drink Photo */}
          <div className="flex items-center gap-8 lg:gap-12 flex-shrink-0">
            <div className="text-right">
              <div className="font-heading font-black text-3xl sm:text-4xl text-[#5A2E1B]">
                Rp 29.000
              </div>
              <div className="text-base sm:text-lg text-[#5A2E1B]/60 line-through font-medium">
                Rp 35.000
              </div>
            </div>

            <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-3xl overflow-hidden shadow-lg bg-white/40">
              <img
                src="/images/promo-latte.jpg"
                alt="Coconut Iced Latte"
                className="w-full h-full object-cover rounded-3xl"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
