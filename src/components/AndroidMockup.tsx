'use client';

import React from 'react';

interface AndroidMockupProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export default function AndroidMockup({
  children,
  className = '',
  height = 'h-[580px] sm:h-[640px]',
}: AndroidMockupProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[280px] sm:max-w-[305px] ${className}`}>
      {/* Outer Ambient Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/25 via-mint/15 to-saffron/20 rounded-[56px] blur-3xl opacity-80 pointer-events-none animate-pulse-subtle" />

      {/* Main Android Phone Chassis */}
      <div className="relative bg-slate-900 border-[8px] sm:border-[10px] border-slate-950 rounded-[44px] shadow-[0_25px_65px_-12px_rgba(15,81,50,0.3),0_12px_25px_-10px_rgba(0,0,0,0.4)] ring-1 ring-white/15 overflow-hidden">
        
        {/* Top Speaker Grill Slit */}
        <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-14 h-[2px] bg-slate-800 rounded-full z-45" />

        {/* Right Side Android Volume Buttons & Power Key */}
        <div className="absolute -right-[11px] top-24 w-[3px] h-8 bg-slate-850 rounded-r-md border-l border-slate-700/50 shadow-xs" />
        <div className="absolute -right-[11px] top-36 w-[3px] h-12 bg-slate-850 rounded-r-md border-l border-slate-700/50 shadow-xs" />

        {/* Inner Screen Display */}
        <div className={`relative w-full ${height} bg-slate-50 rounded-[34px] overflow-hidden flex flex-col shadow-inner select-none`}>
          
          {/* Glass Sheen Reflection Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/8 to-transparent pointer-events-none z-30 mix-blend-overlay" />
          
          {/* Dark Glass Glossy Edge Reflection */}
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-white/10 to-transparent pointer-events-none z-30" />
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none z-30" />

          {/* Centered Android Camera Punch Hole */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3 h-3 bg-slate-950 rounded-full z-40 flex items-center justify-center ring-1 ring-slate-800 shadow-sm pointer-events-none">
            <div className="w-1 h-1 rounded-full bg-blue-950/60" />
          </div>

          {/* Screen Content Slot */}
          <div className="w-full h-full flex flex-col relative z-10">
            {children}
          </div>

          {/* Android Navigation Gesture Pill Bar */}
          <div className="bg-white py-1.5 flex items-center justify-center z-30 border-t border-slate/5">
            <div className="w-24 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
