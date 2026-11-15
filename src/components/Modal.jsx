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

      {/* Modal Dialog Card */}
      <div className={`relative bg-white rounded-[30px] border border-[#FFD4E5] ${maxWidth} w-full shadow-2xl p-6 sm:p-8 z-10 max-h-[90vh] overflow-y-auto transform transition-all`}>
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#FFEDF4]">
          {title ? (
            <h3 className="font-brand font-black text-xl sm:text-2xl text-[#421525]">
              {title}
            </h3>
          ) : <div />}
          
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EE] text-[#421525] hover:text-[#EE4B82] flex items-center justify-center transition-colors cursor-pointer"
            title="Tutup"
          >
            <X className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
