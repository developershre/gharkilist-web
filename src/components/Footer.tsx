'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Code, Shield, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { lang } = useLanguage();
  const pathname = usePathname();
  const isBlog = pathname === '/blog';

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center p-1 shadow-md">
                <img src="/logo.svg" alt="Gharkilist Logo" className="w-full h-full object-contain" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-extrabold text-white tracking-tight">
                  ghark<span className="text-mint">i</span>list
                </span>
                <span className="text-[10px] text-slate-400 font-semibold" style={{ fontFamily: 'var(--font-hindi)' }}>
                  घर की लिस्ट
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              {lang === 'hi'
                ? 'भारतीय परिवारों के लिए विशेष रूप से निर्मित 100% ऑफ़लाइन, निजता-प्रथम किराना और रसोई स्टॉक प्रबंधक।'
                : '100% offline, privacy-first kitchen inventory and grocery list manager built specifically for Indian homes.'}
            </p>

            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-300">
                Flutter + SQLite
              </Badge>
              <Badge variant="outline" className="text-[10px] border-slate-700 text-slate-300">
                100% Local Storage
              </Badge>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">
              {lang === 'hi' ? 'नेविगेशन' : 'Quick Navigation'}
            </h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href={isBlog ? '/#features' : '#features'} className="hover:text-mint transition-colors">{lang === 'hi' ? 'विशेषताएं' : 'Features'}</Link></li>
              <li><Link href={isBlog ? '/#why' : '#why'} className="hover:text-mint transition-colors">{lang === 'hi' ? 'क्यों चुनें' : 'Why Gharkilist'}</Link></li>
              <li><Link href={isBlog ? '/#demo' : '#demo'} className="hover:text-mint transition-colors">{lang === 'hi' ? 'लाइव डेमो' : 'Live Simulator'}</Link></li>
              <li><Link href={isBlog ? '/#categories' : '#categories'} className="hover:text-mint transition-colors">{lang === 'hi' ? 'श्रेणियां' : 'Pantry Catalog'}</Link></li>
              <li><Link href={isBlog ? '/#download' : '#download'} className="hover:text-mint transition-colors">{lang === 'hi' ? 'डाउनलोड' : 'Download App'}</Link></li>
              <li><Link href="/blog" className="hover:text-mint transition-colors font-semibold text-mint">{lang === 'hi' ? 'अपडेट्स और बदलाव' : 'Updates & Changelog'}</Link></li>
            </ul>
          </div>

          {/* Column 3: Privacy & Tech */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">Privacy Guarantee</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Gharkilist does not connect to remote databases or collect personal telemetry. Your pantry items stay safely on your smartphone.
            </p>
            <div className="pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-emerald/50 px-4 py-2 rounded-xl text-xs text-slate-300 hover:text-white transition-all"
              >
                <Code className="w-4 h-4 text-emerald" />
                <span>Open Source Codebase</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1">
            <span>Built with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for Indian Kitchens &middot; Gharkilist (घर की लिस्ट)</span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} Gharkilist. 100% Free & Standalone Application.
          </div>
        </div>
      </div>
    </footer>
  );
}
