'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Menu, X, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';


export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { lang, toggleLang } = useLanguage();

  const pathname = usePathname();
  const isBlog = pathname === '/blog';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/?scroll=')) {
      const targetId = href.split('=')[1];
      if (!isBlog) {
        e.preventDefault();
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  const navLinks = [
    { href: '/?scroll=features', label: lang === 'hi' ? 'विशेषताएं' : 'Features' },
    { href: '/?scroll=why', label: lang === 'hi' ? 'क्यों चुनें' : 'Why Gharkilist' },
    { href: '/?scroll=demo', label: lang === 'hi' ? 'लाइव डेमो' : 'Live Demo' },
    { href: '/?scroll=categories', label: lang === 'hi' ? 'श्रेणियां' : 'Categories' },
    { href: '/?scroll=download', label: lang === 'hi' ? 'डाउनलोड' : 'Download App' },
    { href: '/blog', label: lang === 'hi' ? 'अपडेट्स' : 'Updates' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/85 backdrop-blur-md border-b border-slate/10 shadow-xs py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            if (!isBlog) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          }}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-xs group-hover:scale-105 transition-all p-1">
            <img src="/logo.png" alt="Gharkilist Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col leading-none">
            <div className="flex items-center gap-1.5">
              <span className="text-[16px] font-extrabold text-slate tracking-tight">
                gharki<span className="text-mint">list</span>
              </span>
              <Badge variant="saffron" className="px-1.5 py-0 text-[8px] font-extrabold uppercase select-none tracking-wider scale-90">
                Beta
              </Badge>
            </div>
            <span
              className="text-[10px] font-semibold text-emerald tracking-wide mt-0.5 leading-normal"
              style={{ fontFamily: 'var(--font-hindi)' }}
            >
              घर की लिस्ट
            </span>
          </div>
        </Link>

        <nav 
          onMouseLeave={() => setHoveredIndex(null)}
          className="hidden md:flex items-center gap-1 bg-white/70 backdrop-blur-md border border-slate/10 p-1.5 rounded-full shadow-xs relative"
        >
          {navLinks.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              onMouseEnter={() => setHoveredIndex(idx)}
              className="text-[13px] font-medium text-slate/75 hover:text-emerald px-4 py-1.5 rounded-full transition-all relative z-10"
            >
              {hoveredIndex === idx && (
                <motion.span
                  layoutId="navHoverIndicator"
                  className="absolute inset-0 bg-slate-100 rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLang}
            className="gap-1.5 text-xs font-bold border-slate/15 hover:border-emerald/40 hover:text-emerald"
          >
            <Globe className="w-3.5 h-3.5 text-emerald" />
            <span>{lang === 'en' ? 'ENGLISH' : 'हिंदी'}</span>
            <span className="text-[10px] text-slate/40 ml-0.5">({lang === 'en' ? 'EN' : 'HI'})</span>
          </Button>

          <Button variant="emerald" size="sm" asChild className="gap-2 shadow-sm shadow-emerald/20">
            <a href="/api/apks/latest" target="_blank" rel="noreferrer">
              <Download className="w-4 h-4" />
              <span>{lang === 'hi' ? 'ऐप डाउनलोड करें' : 'Download App'}</span>
            </a>
          </Button>
        </div>

        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLang}
            className="px-2.5 h-8 text-xs font-bold"
          >
            <Globe className="w-3.5 h-3.5 mr-1 text-emerald" />
            {lang.toUpperCase()}
          </Button>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="w-9 h-9 rounded-xl bg-slate/5 border border-slate/10 flex items-center justify-center text-slate hover:bg-slate/10 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate/10 mx-3 mt-2 rounded-2xl p-4 animate-slide-up shadow-xl space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => {
                setMobileOpen(false);
                handleNavClick(e, link.href);
              }}
              className="block py-2.5 px-4 text-[14px] font-semibold text-slate/70 hover:text-emerald hover:bg-emerald/5 rounded-xl transition-all"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2 border-t border-slate/10">
            <Button variant="emerald" size="default" asChild className="w-full justify-center gap-2">
              <a href="/api/apks/latest" target="_blank" rel="noreferrer" onClick={() => setMobileOpen(false)}>
                <Download className="w-4 h-4" />
                <span>{lang === 'hi' ? 'ऐप डाउनलोड करें' : 'Download Free App'}</span>
              </a>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
