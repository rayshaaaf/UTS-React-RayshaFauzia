import React, { createContext, useContext, useState, useCallback } from 'react';
import { Heart, ShoppingCart, MessageCircle, Info, Receipt, RotateCcw, X, Sparkles } from 'lucide-react';

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
        return <Heart className="w-4 h-4 text-[#EE4B82] fill-[#EE4B82]" />;
      case 'cart':
        return <ShoppingCart className="w-4 h-4 text-[#EE4B82]" />;
      case 'comment':
        return <MessageCircle className="w-4 h-4 text-[#EE4B82]" />;
      case 'promo':
        return <Sparkles className="w-4 h-4 text-[#EE4B82]" />;
      case 'warning':
        return <Info className="w-4 h-4 text-amber-600" />;
      case 'reset':
        return <RotateCcw className="w-4 h-4 text-[#EE4B82]" />;
      case 'order':
      default:
        return <Receipt className="w-4 h-4 text-emerald-600" />;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Floating Toast Notification Container (Top-Right) */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto px-4 py-3 rounded-2xl shadow-xl bg-white border border-[#FFD4E5] flex items-center gap-3 transform transition-all duration-200 animate-slide-left"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FFEBF2] border border-[#FFD4E5] flex items-center justify-center flex-shrink-0">
              {getIcon(toast.type)}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold text-[#421525]">{toast.title || 'Rosé Café'}</h4>
              <p className="text-xs text-[#7D4759] mt-0.5 leading-snug">{toast.message}</p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#A06375] hover:text-[#EE4B82] p-1 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" strokeWidth={2.5} />
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
