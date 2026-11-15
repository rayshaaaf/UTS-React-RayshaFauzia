import React, { createContext, useContext, useState, useCallback } from 'react';
import { Heart, ShoppingCart, MessageCircle, Check, Info, Receipt, RotateCcw, X } from 'lucide-react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((type, title, message) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, type, title, message }]);

    // Auto dismiss after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'favorite':
        return <Heart className="w-5 h-5 text-[#5A2E1B]" strokeWidth={2} />;
      case 'cart':
        return <ShoppingCart className="w-5 h-5 text-[#5A2E1B]" strokeWidth={2} />;
      case 'comment':
        return <MessageCircle className="w-5 h-5 text-[#5A2E1B]" strokeWidth={2} />;
      case 'promo':
        return <Check className="w-5 h-5 text-[#5A2E1B]" strokeWidth={2} />;
      case 'warning':
        return <Info className="w-5 h-5 text-[#D96A7B]" strokeWidth={2} />;
      case 'reset':
        return <RotateCcw className="w-5 h-5 text-[#5A2E1B]" strokeWidth={2} />;
      case 'order':
      default:
        return <Receipt className="w-5 h-5 text-[#5A2E1B]" strokeWidth={2} />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Floating Toast Notification Container (Top-Right, Page 17) */}
      <div className="fixed top-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto px-4 py-3.5 rounded-2xl shadow-xl bg-white border border-gray-100 flex items-center gap-3.5 transform transition-all duration-200 animate-slide-left"
          >
            <div className="flex items-center justify-center flex-shrink-0">
              {getIcon(toast.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#5A2E1B]">{toast.title || 'KopiKu'}</h4>
              <p className="text-xs text-[#5A2E1B]/75 mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-[#5A2E1B] p-1 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}
