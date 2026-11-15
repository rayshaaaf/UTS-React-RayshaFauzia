import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export default function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#421525]/35 backdrop-blur-xs animate-fade-in">
      {/* Backdrop overlay */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Modal Dialog Card (Rounded 32px with overflow-hidden so scrollbars stay neatly inside) */}
      <div className={`relative bg-white rounded-[32px] border border-[#FFD4E5] ${maxWidth} w-full shadow-2xl z-10 max-h-[88vh] flex flex-col overflow-hidden transform transition-all`}>
        {/* Header - Fixed at top with clear separation */}
        {title ? (
          <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-[#FFEDF4] flex-shrink-0 bg-white">
            <div className="font-brand font-black text-xl sm:text-2xl text-[#421525]">
              {title}
            </div>
            
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EE] text-[#421525] hover:text-[#EE4B82] flex items-center justify-center transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        ) : (
          <div className="flex justify-end px-6 pt-5 pb-1 flex-shrink-0 bg-white">
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EE] text-[#421525] hover:text-[#EE4B82] flex items-center justify-center transition-colors cursor-pointer"
              title="Tutup"
            >
              <X className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Scrollable Content Body - Scrollbar is safely inside the rounded card */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 sm:py-6">
          {children}
        </div>
      </div>
    </div>
  );
}
