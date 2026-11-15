import React, { useState } from 'react';
import { Search, Heart, ChevronDown, Sparkles, Coffee, Cake, Croissant as CroissantIcon, RotateCcw } from 'lucide-react';
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
  onResetFilters,
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
    Bakery: 3,
    Cakes: 4,
    Favorit: favorites.length
  };

  const categories = ['Semua', 'Kopi', 'Non-Kopi', 'Bakery', 'Cakes', 'Favorit'];

  const sortLabels = {
    default: 'Urutkan Menu',
    'price-asc': 'Harga Terendah',
    'price-desc': 'Harga Tertinggi',
    'rating': 'Rating Tertinggi',
    'name': 'Nama (A-Z)',
    'fav-newest': 'Favorit Terbaru',
    'fav-oldest': 'Favorit Terlama'
  };

  const isFavTab = currentCategory === 'Favorit';

  const sortOptionsList = isFavTab
    ? [
        { id: 'default', label: 'Default Rekomendasi' },
        { id: 'fav-newest', label: 'Favorit Terbaru' },
        { id: 'fav-oldest', label: 'Favorit Terlama' },
        { id: 'price-asc', label: 'Harga Terendah' },
        { id: 'price-desc', label: 'Harga Tertinggi' },
        { id: 'rating', label: 'Rating Tertinggi' },
        { id: 'name', label: 'Nama (A-Z)' }
      ]
    : [
        { id: 'default', label: 'Default Rekomendasi' },
        { id: 'price-asc', label: 'Harga Terendah' },
        { id: 'price-desc', label: 'Harga Tertinggi' },
        { id: 'rating', label: 'Rating Tertinggi' },
        { id: 'name', label: 'Nama (A-Z)' }
      ];

  const hasActiveFilters = searchQuery.trim() !== '' || currentCategory !== 'Semua' || sortOption !== 'default';

  let subtitleText = '15 pilihan kopi segar & artisan pastry lezat untuk harimu.';
  if (searchQuery.trim()) {
    subtitleText = `${menuList.length} menu ditemukan untuk “${searchQuery}”.`;
  } else if (currentCategory === 'Favorit') {
    subtitleText = 'Menu favorit pilihanmu, tersimpan rapi dalam satu tempat.';
  }

  return (
    <div className="w-full">
      
      {/* ==================================================== */}
      {/* 1. CHILL HERO SECTION (Cute Pastel Café Vibes)       */}
      {/* ==================================================== */}
      <section className="relative w-full bg-gradient-to-b from-[#FFE4EE]/70 via-[#FFF0F5] to-[#FFF2F6] pt-10 pb-16 px-6 lg:px-14 overflow-hidden border-b border-[#FFD4E5]/80">
        
        {/* Soft Background Blur Blobs */}
        <div className="absolute -top-16 -left-16 w-80 h-80 bg-pink-200/50 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-10 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          
          {/* Left: Chill Headline & Badges */}
          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-white/90 border border-[#FFD4E5] px-4 py-1.5 rounded-full text-xs font-bold text-[#EE4B82] shadow-xs mb-5">
              <Sparkles className="w-4 h-4 text-[#EE4B82]" />
              <span>Sweet Sips &amp; Freshly Baked Love Everyday</span>
            </div>

            <h1 className="font-brand text-4xl sm:text-6xl font-black text-[#421525] tracking-tight leading-[1.1] mb-3">
              Chill Vibes, Sweet Treats &amp; <span className="font-serif-italic font-normal text-[#EE4B82]">Warm Bakes.</span>
            </h1>

            <p className="text-sm sm:text-base text-[#7D4759] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-6 font-normal">
              Nikmati perpaduan kopi artisan, minuman dingin menyegarkan, hingga aneka pastry &amp; cake manis yang dibuat hangat setiap hari.
            </p>

            {/* Cute highlight chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              <span className="bg-white/80 border border-[#FFD4E5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#421525] flex items-center gap-1.5 shadow-2xs">
                <Coffee className="w-3.5 h-3.5 text-[#EE4B82]" /> Specialty Brew
              </span>
              <span className="bg-white/80 border border-[#FFD4E5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#421525] flex items-center gap-1.5 shadow-2xs">
                <CroissantIcon className="w-3.5 h-3.5 text-[#EE4B82]" /> Fresh Bakery
              </span>
              <span className="bg-white/80 border border-[#FFD4E5] px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#421525] flex items-center gap-1.5 shadow-2xs">
                <Cake className="w-3.5 h-3.5 text-[#EE4B82]" /> Artisan Cakes
              </span>
            </div>
          </div>

          {/* Right: Showcase Poster Cards with Cute Floating Stickers */}
          <div className="flex-shrink-0 relative flex items-center justify-center gap-4">
            
            {/* Card 1: Heart Macaron */}
            <div className="w-48 sm:w-56 bg-white p-3 rounded-3xl shadow-xl shadow-pink-200/60 border border-[#FFD4E5] transform -rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#FFE4EE]">
                <img
                  src="/images/heart-macaron.jpg"
                  alt="Sweet Heart Macarons"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2.5 text-center">
                <span className="text-[11px] font-bold text-[#EE4B82] uppercase tracking-wider block">Best Seller</span>
                <span className="font-brand font-bold text-sm text-[#421525]">Sweet Heart Macarons</span>
              </div>
            </div>

            {/* Card 2: Iced Cocoa Float */}
            <div className="w-48 sm:w-56 bg-white p-3 rounded-3xl shadow-xl shadow-pink-200/60 border border-[#FFD4E5] transform rotate-3 hover:rotate-0 transition-transform duration-300 -ml-4 sm:-ml-6 mt-8">
              <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden bg-[#FFE4EE]">
                <img
                  src="/images/iced-cocoa.jpg"
                  alt="Signature Iced Cocoa"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2.5 text-center">
                <span className="text-[11px] font-bold text-[#EE4B82] uppercase tracking-wider block">Staff Pick</span>
                <span className="font-brand font-bold text-sm text-[#421525]">Signature Iced Cocoa</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ==================================================== */}
      {/* 2. MENU SECTION (Categories, Filter, 4-Col Grid)     */}
      {/* ==================================================== */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-14 pt-12 pb-16">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-baseline gap-2.5 mb-1">
              <h2 className="font-brand text-3xl sm:text-4xl font-black text-[#421525]">
                Our Sweet
              </h2>
              <span className="font-serif-italic text-3xl sm:text-4xl text-[#EE4B82]">
                Menu &amp; Bakes
              </span>
            </div>
            <p className="text-sm text-[#7D4759] font-normal">
              {subtitleText}
            </p>
          </div>
        </div>

        {/* Filter Pills, Reset Button & Sort Dropdown */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2.5">
            {categories.map((cat) => {
              const count = categoryCounts[cat] ?? 0;
              const isActive = currentCategory === cat;

              return (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-[#FF6B9E] to-[#EE4B82] text-white shadow-md shadow-pink-300/40 scale-102'
                      : 'bg-white border border-[#FFD4E5] text-[#421525] hover:bg-[#FFEBF2] hover:border-[#FF6B9E] shadow-2xs'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}

            {/* Quick Reset Filter Button */}
            {hasActiveFilters && (
              <button
                onClick={onResetFilters}
                className="bg-[#FFEBF2] hover:bg-[#FFD4E5] text-[#EE4B82] border border-[#FFD4E5] rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs ml-1"
                title="Reset semua filter, kategori, dan pengurutan"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Filter</span>
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsSortOpen(!isSortOpen)}
              className="flex items-center gap-2 bg-white border border-[#FFD4E5] hover:border-[#FF6B9E] rounded-full px-5 py-2.5 text-xs sm:text-sm font-bold text-[#421525] shadow-2xs transition-colors cursor-pointer"
            >
              <span>{sortLabels[sortOption] || 'Urutkan Menu'}</span>
              <ChevronDown className="w-4 h-4 text-[#EE4B82]" />
            </button>

            {isSortOpen && (
              <>
                <div 
                  className="fixed inset-0 z-20" 
                  onClick={() => setIsSortOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-[#FFD4E5] py-2 z-30 animate-fade-in text-xs font-semibold">
                  {sortOptionsList.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => {
                        onSortChange(opt.id);
                        setIsSortOpen(false);
                      }}
                      className={`w-full text-left px-5 py-2.5 hover:bg-[#FFF0F5] transition-colors cursor-pointer ${
                        sortOption === opt.id ? 'font-bold text-[#EE4B82] bg-[#FFEBF2]' : 'text-[#421525]'
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
            /* Search Empty State */
            <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-3xl p-8 border border-[#FFD4E5] shadow-xs">
              <Search className="w-8 h-8 text-[#EE4B82] mb-3" strokeWidth={1.5} />
              <h3 className="font-brand text-2xl font-bold text-[#421525] mb-1.5">
                Menu Tidak Ditemukan
              </h3>
              <p className="text-xs sm:text-sm text-[#7D4759] max-w-md mb-4">
                Tidak ada menu bernama “{searchQuery}”. Coba kata kunci nama menu lainnya.
              </p>
              <button
                onClick={onResetFilters}
                className="bg-[#FFEBF2] hover:bg-[#FFD4E5] text-[#EE4B82] font-bold text-xs px-5 py-2 rounded-full border border-[#FFD4E5] cursor-pointer transition-colors"
              >
                Tampilkan Semua Menu
              </button>
            </div>
          ) : (
            /* Favorite Empty State */
            <div className="py-20 text-center flex flex-col items-center justify-center bg-white rounded-3xl p-8 border border-[#FFD4E5] shadow-xs">
              <Heart className="w-8 h-8 text-[#EE4B82] mb-3" strokeWidth={1.5} />
              <h3 className="font-brand text-2xl font-bold text-[#421525] mb-1.5">
                Belum Ada Menu Favorit
              </h3>
              <p className="text-xs sm:text-sm text-[#7D4759] max-w-md">
                Ketuk ikon hati pada menu kesukaanmu untuk menyimpannya di sini.
              </p>
            </div>
          )
        ) : (
          /* 4-Column Responsive Grid */
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
      {/* 3. PROMO SECTION (Chill Special Treat & Vouchers)    */}
      {/* ==================================================== */}
      <section className="w-full bg-gradient-to-r from-[#FFEBF2] via-[#FFDCE8] to-[#FFEBF2] py-12 px-6 lg:px-14 border-t border-[#FFD4E5]">
        <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Left: Text & Vouchers */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1 rounded-full text-xs font-bold text-[#EE4B82] mb-3 shadow-2xs border border-[#FFD4E5]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Promo Spesial Hari Ini</span>
            </div>

            <h3 className="font-brand text-3xl sm:text-4xl font-black text-[#421525] mb-1 flex items-center justify-center lg:justify-start gap-2">
              <span>Sweet Treats, Sweet Deals!</span>
              <Sparkles className="w-6 h-6 text-[#EE4B82]" />
            </h3>
            
            <p className="text-xs sm:text-sm text-[#7D4759] mb-5">
              Gunakan kode voucher favoritmu untuk menikmati diskon spesial saat checkout:
            </p>

            {/* Voucher Chips */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
              {[
                { code: 'UTS25', disc: 'Diskon 25%' },
                { code: 'HEMAT10', disc: 'Diskon 10%' },
                { code: 'MANIS15', disc: 'Diskon 15%' }
              ].map(({ code, disc }) => (
                <button
                  key={code}
                  onClick={() => onApplyPromoCode(code)}
                  className="bg-white hover:bg-[#EE4B82] text-[#421525] hover:text-white border border-[#FFD4E5] hover:border-[#EE4B82] px-4 py-2 rounded-2xl shadow-xs transition-all cursor-pointer flex items-center gap-2 group"
                >
                  <span className="font-brand font-black text-xs text-[#EE4B82] group-hover:text-white">{code}</span>
                  <span className="text-[11px] font-medium text-[#7D4759] group-hover:text-white/90">({disc})</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Featured Item Photo */}
          <div className="flex items-center gap-5 sm:gap-6 bg-white/90 backdrop-blur-sm p-4 rounded-3xl border border-[#FFD4E5] shadow-lg shadow-pink-200/50">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[#FFE4EE] flex-shrink-0">
              <img
                src="/images/heart-macaron.jpg"
                alt="Featured Treat"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold text-[#EE4B82] uppercase tracking-wider block">Featured Sweet</span>
              <h4 className="font-brand font-bold text-base text-[#421525]">Sweet Heart Macarons</h4>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-brand font-black text-lg text-[#EE4B82]">Rp 22.000</span>
                <span className="text-xs text-[#7D4759] line-through">Rp 28.000</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
