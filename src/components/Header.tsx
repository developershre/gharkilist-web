'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#why', label: 'Why Gharkilist' },
    { href: '#demo', label: 'Live Demo' },
    { href: '#download', label: 'Download' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-lg border-b border-black/[0.04] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <img src="/logo.svg" alt="Gharkilist" className="w-9 h-9" />
          <div className="flex flex-col leading-none">
            <span className="text-[15px] font-bold text-slate tracking-[-0.01em]">ghark<span className="text-mint">i</span>list</span>
            <span className="text-[9px] text-slate/40 font-medium leading-none mt-0.5" style={{ fontFamily: 'var(--font-hindi)' }}>घर की लिस्ट</span>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-0.5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium text-slate/50 hover:text-emerald px-3 py-2 rounded-lg hover:bg-emerald/[0.04] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href="/gharkilist.apk"
            download
            className="bg-emerald text-white text-[13px] font-semibold px-5 py-2 rounded-full hover:bg-emerald-light transition-colors shadow-sm shadow-emerald/10"
          >
            Get Free APK
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden w-9 h-9 rounded-lg bg-black/[0.04] flex items-center justify-center"
          aria-label="Toggle menu"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 8h16M4 16h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-black/[0.04] mx-3 mt-2 rounded-xl p-2 animate-slide-up shadow-lg shadow-black/[0.06]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 px-3 text-[13px] font-medium text-slate/60 hover:text-emerald hover:bg-emerald/[0.04] rounded-lg transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="/gharkilist.apk"
            download
            onClick={() => setMobileOpen(false)}
            className="block mt-1.5 bg-emerald text-white text-[13px] font-semibold px-5 py-2.5 rounded-full text-center"
          >
            Get Free APK
          </a>
        </div>
      )}
    </header>
  );
}
