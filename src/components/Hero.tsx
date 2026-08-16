'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero() {
  const phoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      phoneRef.current.style.transform = `perspective(1200px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    };
    const handleMouseLeave = () => {
      if (phoneRef.current) {
        phoneRef.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      }
    };
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="bg-white relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-mint/[0.04] to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-saffron/[0.03] to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-emerald/[0.06] rounded-full px-3.5 py-1 mb-6 animate-slide-up">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              <span className="text-[11px] font-semibold text-emerald tracking-wide uppercase">
                100% Offline &middot; Zero Tracking
              </span>
            </div>

            <h1 className="text-[2.5rem] sm:text-5xl lg:text-[3.3rem] font-extrabold text-slate leading-[1.08] tracking-[-0.02em] mb-5 animate-slide-up" style={{ animationDelay: '0.05s' }}>
              The Smart{' '}
              <span className="text-emerald">Pantry & Kirana</span>{' '}
              List Manager for Indian Homes.
            </h1>

            <p className="text-[17px] text-slate/45 leading-[1.7] mb-8 max-w-[420px] mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Track pantry stock, compute budget in ₹, and order via WhatsApp in one tap. No barcodes, no login, no internet.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <a
                href="/gharkilist.apk"
                download
                className="bg-emerald text-white font-semibold px-7 py-3 rounded-full hover:bg-emerald-light transition-all flex items-center justify-center gap-2 shadow-sm shadow-emerald/15 text-[15px]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download APK v1.0 (Free)
              </a>
              <Link
                href="#demo"
                className="border border-black/10 text-slate font-semibold px-7 py-3 rounded-full hover:bg-black/[0.02] transition-all flex items-center justify-center gap-2 text-[15px]"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
                Try Interactive Demo
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-5 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {['No login required', '100% Private', 'Free forever'].map((text) => (
                <span key={text} className="flex items-center gap-1.5 text-[13px] text-slate/40">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-mint"><polyline points="20 6 9 17 4 12"/></svg>
                  {text}
                </span>
              ))}
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div ref={phoneRef} className="relative transition-transform duration-[400ms] ease-out">
              <div className="relative w-[270px] sm:w-[290px] h-[550px] sm:h-[590px] rounded-[40px] bg-slate p-[10px] phone-glow">
                <div className="w-full h-full rounded-[32px] bg-white overflow-hidden relative">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[18px] bg-slate rounded-b-xl z-10" />
                  <div className="p-3.5 pt-7 h-full flex flex-col">
                    <div className="flex items-center gap-2 mb-3">
                      <img src="/logo.svg" alt="Gharkilist" className="w-7 h-7" />
                      <span className="text-[11px] font-bold text-slate">ghark<span className="text-mint">i</span>list</span>
                    </div>

                    <div className="bg-gray-50 rounded-lg px-2.5 py-2 mb-2.5 flex items-center gap-1.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                      <span className="text-[9px] text-gray-400">Search items...</span>
                    </div>

                    <div className="flex gap-1 mb-3 overflow-hidden">
                      {['Monthly', 'Rakhi', 'Diwali'].map((tab, i) => (
                        <div key={tab} className={`px-2.5 py-[3px] rounded-md text-[9px] font-medium whitespace-nowrap ${i === 0 ? 'bg-emerald text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {tab}
                        </div>
                      ))}
                    </div>

                    <div className="flex-1 space-y-1.5 overflow-hidden">
                      {[
                        { name: 'Basmati Rice', qty: '1 kg', icon: '🍚' },
                        { name: 'Flattened Rice', qty: '1 g', icon: '🥣' },
                        { name: 'Kolam Rice', qty: '1 kg', icon: '🌾' },
                        { name: 'Semolina', qty: '1 g', icon: '🌾' },
                      ].map((item) => (
                        <div key={item.name} className="border border-gray-100 rounded-lg p-2.5 flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-sm flex-shrink-0">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] font-semibold text-slate truncate">{item.name}</div>
                            <div className="text-[8px] text-gray-400">{item.qty}</div>
                          </div>
                          <div className="flex gap-0.5">
                            <div className="w-5 h-5 rounded bg-emerald/10 flex items-center justify-center">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                            </div>
                            <div className="w-5 h-5 rounded bg-red-50 flex items-center justify-center">
                              <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-2.5 bg-whatsapp rounded-xl py-2.5 flex items-center justify-center gap-1.5">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="text-white text-[10px] font-bold">Share on WhatsApp</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute -right-4 top-16 sm:-right-6 sm:top-20 bg-white rounded-xl p-3 shadow-lg shadow-black/[0.06] border border-black/[0.04] animate-slide-up hidden sm:block" style={{ animationDelay: '0.3s' }}>
                <div className="text-[9px] font-semibold text-slate/70 mb-0.5">🛒 Kirana Order</div>
                <div className="text-[8px] text-slate/40 space-y-px">
                  <div>Atta: 5 KG - ₹230</div>
                  <div>Toor Dal: 1 KG - ₹160</div>
                  <div className="font-bold text-emerald text-[9px]">Total: ₹440</div>
                </div>
                <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-5 h-px bg-gray-300" />
                <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2" className="absolute -left-4 top-1/2 -translate-y-1/2">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
