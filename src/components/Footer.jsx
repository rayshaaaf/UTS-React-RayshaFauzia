import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-[#421525] text-white py-10 px-6 lg:px-14 border-t border-[#FFD4E5]">
      <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
        
        {/* Left: Brand & Tagline */}
        <div>
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1.5">
            <span className="font-brand text-2xl font-black tracking-tight text-white">
              Rosé
            </span>
            <span className="font-serif-italic text-lg font-bold text-[#FF94BA]">
              Café &amp; Bakery
            </span>
            <Sparkles className="w-4 h-4 text-[#FF94BA]" />
          </div>
          <p className="text-xs text-white/70">
            Sweet sips &amp; freshly baked treats to brighten your everyday.
          </p>
        </div>

        {/* Right: Copyright & Attribution */}
        <div className="flex flex-col sm:items-end items-center gap-1 text-xs text-white/70">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">Raysha Fauzia Andani</span>
            <span className="text-white/40">·</span>
            <span className="bg-white/10 text-white/90 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-white/10">
              UTS React Fundamental 2026
            </span>
          </div>
          <span className="text-white/50 text-[11px]">© 2026 Rosé Café &amp; Bakery. All rights reserved.</span>
        </div>

      </div>
    </footer>
  );
}
