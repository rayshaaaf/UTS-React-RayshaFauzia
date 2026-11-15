import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import HistoryModal from './components/HistoryModal';
import NotificationsModal from './components/NotificationsModal';
import InfoModal from './components/InfoModal';
import CommentModal from './components/CommentModal';
import ReceiptModal from './components/ReceiptModal';

import { CartProvider, useCart } from './context/CartContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { initialMenuData } from './data/menu';
import { useLocalStorage } from './hooks/useLocalStorage';

function AppContent() {
  // 1. Data menu utama (15 menu, 8 properti)
  const [menuList, setMenuList] = useLocalStorage('rose_cafe_menu_stock', initialMenuData);

  // 2. State Favorit & Timestamp
  const [favorites, setFavorites] = useLocalStorage('rose_cafe_favorites', [14, 2]); // default: Macarons & Iced Cocoa
  const [favoriteTimestamps, setFavoriteTimestamps] = useLocalStorage('rose_cafe_fav_timestamps', {
    14: 1731666400000,
    2: 1731667400000
  });

  // 3. State Komentar & Ulasan Pelanggan
  const [commentsData, setCommentsData] = useLocalStorage('rose_cafe_comments', {
    14: [
      {
        author: 'Nadia',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        text: 'Bentuk hatinya gemes banget! Krim pistachio-nya gurih lembut, manisnya pas ga bikin eneg.',
        date: '15 Nov, 09.20'
      },
      {
        author: 'Arif',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        text: 'Cocok banget buat temen ngopi sore santai. Bikin mood langsung ceria!',
        date: '14 Nov, 16.45'
      }
    ],
    2: [
      {
        author: 'Siti Nurhaliza',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
        rating: 5,
        text: 'Cokelatnya pekat dan berkarakter, pas dipadukan sama susu segar.',
        date: 'Kemarin'
      }
    ]
  });

  // 4. State Riwayat Transaksi
  const [historyOrders, setHistoryOrders] = useLocalStorage('rose_cafe_order_history', [
    {
      orderNo: 'ROSE-20261115-001',
      date: '15 Nov 2026 · 10.32',
      items: [
        { name: 'Sweet Heart Macarons', qty: 2, price: 22000 },
        { name: 'Signature Iced Cocoa', qty: 1, price: 26000 }
      ],
      subtotal: 70000,
      discount: 17500,
      tax: 5250,
      total: 57750,
      promoCode: 'UTS25'
    },
    {
      orderNo: 'ROSE-20261114-002',
      date: '14 Nov 2026 · 16.45',
      items: [
        { name: 'Matcha Basque Cheesecake', qty: 1, price: 34000 },
        { name: 'Shio Pan (Japanese Salt Bread)', qty: 1, price: 18000 }
      ],
      subtotal: 52000,
      discount: 0,
      tax: 5200,
      total: 57200,
      promoCode: ''
    }
  ]);

  // Context Hooks
  const { items: cartItems, addItem, clearCart, totals, applyPromo } = useCart();
  const { showToast } = useToast();
  const { addNotification } = useNotification();

  // Search, Category, and Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Semua');
  const [sortOption, setSortOption] = useState('default');

  // Modal / Drawer Visibility State
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  // Active Selected Item for Modals
  const [selectedInfoItem, setSelectedInfoItem] = useState(null);
  const [selectedCommentItem, setSelectedCommentItem] = useState(null);
  
  // Receipt Modal Data
  const [lastReceipt, setLastReceipt] = useState(null);
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);

  // --------------------------------------------------------------------------
  // HANDLERS
  // --------------------------------------------------------------------------

  // Action: Tambah ke Keranjang dengan batas stok
  const handleAddToCart = (product) => {
    const existingInCart = cartItems.find((c) => c.id === product.id);
    const currentQty = existingInCart ? existingInCart.quantity : 0;

    if (currentQty >= product.stock) {
      showToast('warning', 'Batas Stok', `Stok ${product.name} hanya tersisa ${product.stock} porsi.`);
      return;
    }

    addItem(product);
    showToast('cart', 'Rosé Café', `${product.name} masuk ke keranjang belanja 🛍️`);
    addNotification('cart', 'Keranjang Belanja', `${product.name} ditambahkan ke keranjang.`);
  };

  // Action: Toggle Favorit
  const handleToggleFavorite = (productId) => {
    const product = menuList.find((p) => p.id === productId);
    if (!product) return;

    if (favorites.includes(productId)) {
      setFavorites((prev) => prev.filter((id) => id !== productId));
      setFavoriteTimestamps((prev) => {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      });
      showToast('favorite', 'Rosé Café', `${product.name} dihapus dari favorit.`);
      addNotification('favorite', 'Favorit Dihapus', `${product.name} dihapus dari daftar favorit.`);
    } else {
      setFavorites((prev) => [...prev, productId]);
      setFavoriteTimestamps((prev) => ({
        ...prev,
        [productId]: Date.now()
      }));
      showToast('favorite', 'Rosé Café', `${product.name} disimpan ke favorit! 💖`);
      addNotification('favorite', 'Menu Favorit', `${product.name} ditambahkan ke daftar favorit.`);
    }
  };

  // Action: Buka Info Popup
  const handleOpenInfo = (product) => {
    setSelectedInfoItem(product);
  };

  // Action: Buka Comment Popup
  const handleOpenComment = (product) => {
    setSelectedCommentItem(product);
  };

  // Action: Kirim Komentar (Muncul di paling atas secara instan)
  const handleSubmitComment = (menuId, newComment) => {
    setCommentsData((prev) => {
      const existing = prev[menuId] || [];
      return {
        ...prev,
        [menuId]: [newComment, ...existing]
      };
    });

    const product = menuList.find((p) => p.id === menuId);
    showToast('comment', 'Rosé Café', 'Ulasanmu berhasil dikirim! 💌');
    addNotification('comment', 'Ulasan Baru', `Kamu memberi rating bintang ${newComment.rating} untuk ${product?.name || 'menu'}.`);
  };

  // Action: Bayar Pesanan (Struk Pembayaran, Pengurangan Stok, Catat Riwayat)
  const handleCheckoutSuccess = () => {
    if (cartItems.length === 0) return;

    // 1. Kurangi stok menu asli
    setMenuList((prevList) => {
      return prevList.map((item) => {
        const boughtItem = cartItems.find((c) => c.id === item.id);
        if (boughtItem) {
          const newStock = Math.max(0, item.stock - boughtItem.quantity);
          return { ...item, stock: newStock };
        }
        return item;
      });
    });

    // 2. Buat data struk
    const now = new Date();
    const orderNo = `ROSE-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(historyOrders.length + 1).padStart(3, '0')}`;
    const dateFormatted = `${now.getDate()} Nov ${now.getFullYear()} · ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}`;

    const orderItemsSummary = cartItems.map((it) => ({
      name: it.name,
      qty: it.quantity,
      price: it.price
    }));

    const receiptPayload = {
      orderNo,
      date: dateFormatted,
      items: orderItemsSummary,
      subtotal: totals.subtotal,
      discount: totals.discount,
      tax: totals.tax,
      total: totals.grandTotal,
      promoCode: totals.discount > 0 ? 'UTS25' : ''
    };

    // 3. Catat di Riwayat Transaksi
    setHistoryOrders((prev) => [receiptPayload, ...prev]);

    // 4. Buka Struk Popup & Tutup Drawer
    setLastReceipt(receiptPayload);
    setIsCartOpen(false);
    setIsReceiptOpen(true);

    // 5. Bersihkan keranjang
    clearCart();

    // 6. Feedback Toast & Notifikasi
    showToast('order', 'Pesanan Berhasil!', 'Pembayaran telah diterima. Terima kasih! 🍰');
    addNotification('order', 'Pesanan Lunas', `Transaksi ${orderNo} berhasil dibayar.`);
  };

  // Action: Reset Stok + Riwayat
  const handleResetAll = () => {
    setMenuList(initialMenuData);
    setHistoryOrders([]);
    clearCart();
    setFavorites([]);

    showToast('reset', 'Rosé Café', 'Stok seluruh menu dan riwayat belanja telah direset.');
    addNotification('reset', 'Reset Sistem', 'Seluruh data stok dan transaksi telah dikembalikan ke awal.');
  };

  // Action: Terapkan voucher dari promo banner
  const handleApplyPromoCodeFromBanner = (code) => {
    applyPromo(code);
    setIsCartOpen(true);
    showToast('promo', 'Rosé Café', `Voucher ${code} berhasil diaktifkan! ✨`);
  };

  // --------------------------------------------------------------------------
  // FILTERING & SORTING LOGIC
  // --------------------------------------------------------------------------
  const filteredAndSortedMenu = useMemo(() => {
    let result = [...menuList];

    // Filter Kategori
    if (currentCategory === 'Favorit') {
      result = result.filter((item) => favorites.includes(item.id));
    } else if (currentCategory !== 'Semua') {
      result = result.filter((item) => item.category === currentCategory);
    }

    // Filter Pencarian
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (item) => item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q)
      );
    }

    // Sortir
    if (sortOption === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'fav-newest') {
      result.sort((a, b) => (favoriteTimestamps[b.id] || 0) - (favoriteTimestamps[a.id] || 0));
    } else if (sortOption === 'fav-oldest') {
      result.sort((a, b) => (favoriteTimestamps[a.id] || 0) - (favoriteTimestamps[b.id] || 0));
    }

    return result;
  }, [menuList, currentCategory, favorites, searchQuery, sortOption, favoriteTimestamps]);

  return (
    <div className="min-h-screen bg-[#FFF2F6] text-[#421525] flex flex-col justify-between selection:bg-[#FF6B9E] selection:text-white">
      
      {/* 1. Header (Sticky) */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenHistory={() => setIsHistoryOpen(true)}
        onOpenNotifications={() => setIsNotifOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        <MainContent
          menuList={filteredAndSortedMenu}
          favorites={favorites}
          cartItems={cartItems}
          currentCategory={currentCategory}
          onSelectCategory={setCurrentCategory}
          sortOption={sortOption}
          onSortChange={setSortOption}
          searchQuery={searchQuery}
          onInfo={handleOpenInfo}
          onToggleFavorite={handleToggleFavorite}
          onComment={handleOpenComment}
          onAddToCart={handleAddToCart}
          onApplyPromoCode={handleApplyPromoCodeFromBanner}
        />
      </div>

      {/* Footer */}
      <Footer />

      {/* ==================================================== */}
      {/* POPUPS, DRAWER, AND MODALS                           */}
      {/* ==================================================== */}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckoutSuccess={handleCheckoutSuccess}
      />

      {/* History Modal & Reset Confirmation */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        historyOrders={historyOrders}
        onResetAll={handleResetAll}
      />

      {/* Notifications Modal */}
      <NotificationsModal
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
      />

      {/* Detail Menu Modal */}
      <InfoModal
        isOpen={!!selectedInfoItem}
        onClose={() => setSelectedInfoItem(null)}
        item={selectedInfoItem}
        comments={selectedInfoItem ? (commentsData[selectedInfoItem.id] || []) : []}
      />

      {/* Comment Modal */}
      <CommentModal
        isOpen={!!selectedCommentItem}
        onClose={() => setSelectedCommentItem(null)}
        item={selectedCommentItem}
        comments={selectedCommentItem ? (commentsData[selectedCommentItem.id] || []) : []}
        onSubmitComment={handleSubmitComment}
      />

      {/* Receipt Modal */}
      <ReceiptModal
        isOpen={isReceiptOpen}
        onClose={() => setIsReceiptOpen(false)}
        receiptData={lastReceipt}
      />

    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <NotificationProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </NotificationProvider>
    </ToastProvider>
  );
}
