import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#5A2E1B] text-white py-8 px-8 lg:px-16 border-t border-[#5A2E1B]">
      <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Left: Brand & Tagline */}
        <div>
          <h4 className="font-heading text-2xl font-black tracking-tight text-white mb-1">
            KopiKu
          </h4>
          <p className="text-xs text-[#FFF3F1]/80">
            Secangkir cerita, setiap hari.
          </p>
        </div>

        {/* Right: Copyright */}
        <div>
          <p className="text-xs text-[#FFF3F1]/70">
            © 2026 KopiKu. Semua hak dilindungi.
          </p>
        </div>

      </div>
    </footer>
  );
}
