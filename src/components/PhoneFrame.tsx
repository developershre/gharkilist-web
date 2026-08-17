'use client';

import React from 'react';

interface PhoneFrameProps {
  children: React.ReactNode;
  className?: string;
  height?: string;
}

export default function PhoneFrame({ children, className = '', height = 'h-[640px] sm:h-[700px]' }: PhoneFrameProps) {
  return (
    <div className={`relative mx-auto w-full max-w-[285px] sm:max-w-[310px] ${className}`}>
      {/* Outer Ambient Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/25 via-mint/15 to-saffron/20 rounded-[56px] blur-3xl opacity-80 pointer-events-none animate-pulse-subtle" />

      {/* Main Phone Chassis */}
      <div className="relative bg-slate-900 border-[8px] sm:border-[10px] border-slate-950 rounded-[44px] shadow-[0_25px_65px_-12px_rgba(15,81,50,0.3),0_12px_25px_-10px_rgba(0,0,0,0.4)] ring-1 ring-white/15 overflow-hidden">
        {/* Left Side Volume / Action Buttons */}
        <div className="absolute -left-[11px] top-24 w-[3px] h-8 bg-slate-800 rounded-l-md border-r border-slate-700/50 shadow-xs" />
        <div className="absolute -left-[11px] top-36 w-[3px] h-10 bg-slate-800 rounded-l-md border-r border-slate-700/50 shadow-xs" />
        <div className="absolute -left-[11px] top-48 w-[3px] h-10 bg-slate-800 rounded-l-md border-r border-slate-700/50 shadow-xs" />

        {/* Right Side Power Button */}
        <div className="absolute -right-[11px] top-32 w-[3px] h-14 bg-slate-800 rounded-r-md border-l border-slate-700/50 shadow-xs" />

        {/* Inner Screen Container */}
        <div className={`relative w-full ${height} bg-slate-50 rounded-[34px] overflow-hidden flex flex-col shadow-inner select-none`}>
          {/* Glass Sheen Reflection Overlay */}
          <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/8 to-transparent pointer-events-none z-30 mix-blend-overlay" />
          
          {/* Dark Glass Glossy Edge Reflection */}
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-r from-white/10 to-transparent pointer-events-none z-30" />
          <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-l from-white/10 to-transparent pointer-events-none z-30" />

          {/* Dynamic Notch / Camera Island */}
          <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-24 sm:w-28 h-5 bg-slate-950 rounded-full z-40 flex items-center justify-between px-3 shadow-md pointer-events-none">
            <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-blue-900/50" />
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-950 border border-emerald-900/40" />
          </div>

          {/* Screen Content */}
          <div className="w-full h-full flex flex-col relative z-10 pt-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
