'use client';

import React from 'react';

interface IPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export default function IPhoneMockup({
  children,
  className = '',
  height = 'h-[580px] sm:h-[640px]',
}: IPhoneMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] sm:max-w-[305px] ${className}`}>
      {/* Outer Ambient Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/25 via-mint/15 to-saffron/20 rounded-[60px] blur-3xl opacity-80 pointer-events-none animate-pulse-subtle" />

      {/* Main iPhone Titanium Chassis */}
      <div className="relative bg-slate-900 border-[8px] sm:border-[10px] border-slate-950 rounded-[48px] shadow-[0_25px_65px_-12px_rgba(15,81,50,0.3),0_12px_25px_-10px_rgba(0,0,0,0.4)] ring-1 ring-white/15 overflow-hidden">
        
        {/* Left Side Hardware Buttons (Silent Switch, Volume Up, Volume Down) */}
        <div className="absolute -left-[11px] top-20 w-[3px] h-6 bg-slate-800 rounded-l-md border-r border-slate-700/50 shadow-xs" />
        <div className="absolute -left-[11px] top-30 w-[3px] h-10 bg-slate-800 rounded-l-md border-r border-slate-700/50 shadow-xs" />
        <div className="absolute -left-[11px] top-44 w-[3px] h-10 bg-slate-800 rounded-l-md border-r border-slate-700/50 shadow-xs" />

        {/* Right Side Power / Side Button */}
        <div className="absolute -right-[11px] top-32 w-[3px] h-14 bg-slate-800 rounded-r-md border-l border-slate-700/50 shadow-xs" />

        {/* Inner Display Container */}
        <div className={`relative w-full ${height} bg-slate-50 rounded-[38px] overflow-hidden flex flex-col shadow-inner select-none`}>
          
          {/* Glass Sheen Reflection Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/8 to-transparent pointer-events-none z-30 mix-blend-overlay" />
          
          {/* Dark Glass Glossy Edge Reflection */}
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-white/10 to-transparent pointer-events-none z-30" />
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none z-30" />

          {/* Solid Black Dynamic Island Notch */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5.5 bg-slate-950 rounded-full z-40 flex items-center justify-between px-3.5 shadow-md border border-slate-850 pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-900/50" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-950 border border-emerald-900/40" />
          </div>

          {/* Screen Content Slot */}
          <div className="w-full h-full flex flex-col relative z-10">
            {children}
          </div>

          {/* iOS Home Indicator Bar */}
          <div className="bg-white py-1 flex items-center justify-center z-30 border-t border-slate/5">
            <div className="w-24 h-1 bg-slate-900 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
