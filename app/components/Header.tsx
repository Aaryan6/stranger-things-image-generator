"use client";

import React from "react";

interface HeaderProps {
  onApiKeyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onApiKeyClick }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-red-900/50 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Simple SVG Icon mimicking a retro neon glow */}
          <svg
            className="w-8 h-8 text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
          <h1 className="text-2xl md:text-3xl text-red-600 font-bold tracking-widest uppercase font-stranger drop-shadow-[0_0_5px_rgba(220,38,38,0.8)]">
            Stranger Things
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-xs text-red-400/70 font-mono hidden sm:block">
            🍌 NANO-BANANA-PRO
          </div>
          <button
            onClick={onApiKeyClick}
            className="px-3 py-1.5 bg-red-900/20 hover:bg-red-900/40 border border-red-900/50 rounded text-xs font-mono text-red-400 hover:text-red-300 transition-all uppercase tracking-wider"
          >
            API Key
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
