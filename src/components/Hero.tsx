'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Download, Play, ShieldCheck, WifiOff, CheckCircle2, Wifi, Battery, Settings, Trash2, Edit3, GripVertical, SlidersHorizontal, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import IPhoneMockup from '@/components/IPhoneMockup';
import { useLanguage } from '@/context/LanguageContext';

export default function Hero() {
  const phoneRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!phoneRef.current) return;
      const rect = phoneRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      phoneRef.current.style.transform = `perspective(1200px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
    };
    const handleMouseLeave = () => {
      if (phoneRef.current) {
        phoneRef.current.style.transform = 'perspective(1200px) rotateY(0deg) rotateX(0deg)';
      }
    };
    const element = phoneRef.current;
    if (element) {
      element.addEventListener('mousemove', handleMouseMove);
      element.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      if (element) {
        element.removeEventListener('mousemove', handleMouseMove);
        element.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  return (
    <section className="bg-gradient-to-b from-[#FAF9F5] via-white to-[#FAF9F5] relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 border-b border-slate-100">
      {/* Radial dot grid overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-70 pointer-events-none" />

      {/* Ambient background glow spheres */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-1/4 w-[650px] h-[650px] bg-gradient-to-bl from-mint/15 via-emerald/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-[550px] h-[550px] bg-gradient-to-tr from-saffron/15 via-amber-500/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Headings & CTA Actions */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald/[0.07] border border-emerald/20 rounded-full px-4.5 py-1.5 mb-6 animate-slide-up shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#03B459] animate-pulse" />
              <span className="text-[11px] font-bold text-[#03B459] tracking-wider uppercase font-sans">
                {lang === 'hi'
                  ? '✨ 100% ऑफ़लाइन • ज़ीरो ट्रैकिंग • भारतीय रसोई के लिए निर्मित'
                  : '✨ 100% Offline • Zero Tracking • Built for Indian Kitchens'}
              </span>
            </div>

            <h1 
              className={`text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-slate tracking-tight mb-6 animate-slide-up ${
                lang === 'hi' ? 'leading-tight' : 'leading-[1.12]'
              }`}
              style={{ animationDelay: '0.05s' }}
            >
              {lang === 'hi' ? (
                <>
                  भारतीय घरों के लिए{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald via-[#03B459] to-mint underline decoration-saffron/50 decoration-wavy underline-offset-8">
                    स्मार्ट किराना
                  </span>{' '}
                  और रसोई लिस्ट मैनेजर।
                </>
              ) : (
                <>
                  The Smart{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald via-[#03B459] to-mint underline decoration-saffron/50 decoration-wavy underline-offset-8">
                    Pantry & Kirana
                  </span>{' '}
                  List Manager for Indian Homes.
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate/60 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              {lang === 'hi'
                ? 'कागज़ की सूचियों और बारकोड ऐप को कहें अलविदा जो खुले आटा या दालों को नहीं पहचानते। रसोई स्टॉक को ट्रैक करें, ₹ में बजट निकालें और WhatsApp पर किराना भेजें।'
                : 'Say goodbye to paper lists and barcode apps that fail on loose Atta or Dals. Track pantry stock, compute budget in ₹, and order via WhatsApp in one tap.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.15s' }}>
              <Button size="lg" variant="emerald" asChild className="gap-2.5 bg-[#03B459] hover:bg-[#03B459]/90 shadow-lg shadow-emerald/20 text-base font-bold py-6 px-8 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                <a href="/GharKiList-v1.0.1.apk" download>
                  <Download className="w-5 h-5" />
                  <span>{lang === 'hi' ? 'ऐप डाउनलोड करें (मुफ्त)' : 'Download Free App'}</span>
                </a>
              </Button>

              <Button size="lg" variant="outline" asChild className="gap-2.5 border-slate/20 hover:border-emerald/30 text-base font-semibold py-6 px-8 bg-white/70 backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
                <Link 
                  href="/?scroll=demo"
                  onClick={(e) => {
                    e.preventDefault();
                    const element = document.getElementById('demo');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  <Play className="w-4 h-4 text-[#03B459] fill-[#03B459]" />
                  <span>{lang === 'hi' ? 'लाइव डेमो चलाएं' : 'Try Interactive Demo'}</span>
                </Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 justify-center lg:justify-start text-xs font-semibold text-slate/60 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-100 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-[#03B459]" />
                {lang === 'hi' ? 'कोई लॉगिन नहीं' : 'No login required'}
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-100 shadow-2xs">
                <WifiOff className="w-4 h-4 text-[#03B459]" />
                {lang === 'hi' ? '100% प्राइवेट व ऑफ़लाइन' : '100% Private (Local SQLite)'}
              </span>
              <span className="flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-slate-100 shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-mint" />
                {lang === 'hi' ? 'कोई छिपा शुल्क नहीं' : 'No Hidden Fees'}
              </span>
            </div>
          </div>

          {/* Right Column: Redesigned Dual Preview Mockup Hub */}
          <div className="lg:col-span-5 relative flex justify-center w-full mt-8 lg:mt-0">
            <div
              ref={phoneRef}
              className="relative w-full max-w-[340px] sm:max-w-[420px] transition-all duration-300 ease-out select-none"
              style={{ transformStyle: 'preserve-3d' }}
            >

              {/* iPhone App Screen Simulator (Recreated from actual app screenshot) */}
              <div className="relative z-10 mr-12 sm:mr-16">
                <IPhoneMockup height="h-[520px] sm:h-[580px]">

                  {/* Status Bar */}
                  <div className="pt-3 px-6 pb-1 bg-white text-slate-800 flex items-center justify-between text-[10px] font-bold select-none z-30">
                    <span className="font-semibold">2:56</span>
                    <div className="flex items-center gap-1 text-slate-700">
                      <span className="text-[8px] font-extrabold text-[#03B459]">VoLTE 4G</span>
                      <Wifi className="w-3 h-3 text-slate-700" />
                      <Battery className="w-4 h-3 text-slate-700" />
                    </div>
                  </div>

                  {/* App Screen Display */}
                  <div className="w-full h-full bg-white flex flex-col p-3.5 pt-2">

                    {/* Phone Header - Identical to Screenshot */}
                    <div className="flex items-center justify-between mb-2.5 pb-1">
                      <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Gharkilist Logo" className="w-6.5 h-6.5 object-contain" />
                        <span className="text-[14px] font-bold text-slate-800 tracking-tight font-sans">
                          gharki<span className="text-[#03B459]">list</span>
                        </span>
                      </div>
                      <Settings className="w-4.5 h-4.5 text-slate-650 cursor-pointer" />
                    </div>

                    {/* Search Bar - Identical to Screenshot */}
                    <div className="relative mb-3">
                      <div className="w-full pl-8 pr-8 py-1.5 text-[10px] rounded-xl border border-slate-200 bg-[#FAF9F5]/40 text-slate-400 font-sans flex items-center justify-between">
                        <span className="truncate">Search</span>
                        <SlidersHorizontal className="w-3 h-3 text-slate-400 absolute right-2.5" />
                      </div>
                      <svg className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    {/* List Selector Pill - Identical to Screenshot */}
                    <div className="flex gap-1.5 mb-3 overflow-x-auto scrollbar-none">
                      <span className="bg-[#03B459] text-white text-[9px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xs">
                        {lang === 'hi' ? 'मासिक' : 'Monthly'}
                      </span>
                      <span className="bg-[#FAF9F5] border border-slate-100 text-slate-650 text-[9px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap">
                        {lang === 'hi' ? 'राखी' : 'Rakhi'}
                      </span>
                      <span className="bg-[#FAF9F5] border border-slate-100 text-slate-650 text-[9px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap">
                        {lang === 'hi' ? 'दिवाली' : 'Diwali'}
                      </span>
                      <span className="bg-[#FAF9F5] border border-slate-100 text-slate-650 text-[9px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap">
                        {lang === 'hi' ? 'पूजा की लिस्ट' : 'puja ka list'}
                      </span>
                    </div>

                    {/* Item Cards - Recreated with Real App Layout */}
                    <div className="flex-1 space-y-2.5 overflow-hidden">
                      {[
                        {
                          name_en: 'Basmati Rice',
                          name_hi: 'बासमती चावल',
                          qty_en: '1 kg',
                          qty_hi: '1 किलो',
                          img: true,
                          imgColor: 'bg-amber-50'
                        },
                        {
                          name_en: 'Flattened Rice',
                          name_hi: 'पोहा / चिउड़ा',
                          qty_en: '1 g',
                          qty_hi: '1 ग्राम',
                          img: false,
                          imgColor: 'bg-amber-500/10'
                        },
                        {
                          name_en: 'Fortune Mustard Oil',
                          name_hi: 'सरसों का तेल',
                          qty_en: '1 L',
                          qty_hi: '1 लीटर',
                          img: true,
                          imgColor: 'bg-yellow-50'
                        },
                      ].map((item, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-2.5 border border-slate-150 flex items-center justify-between shadow-2xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {/* Reorder drag handle */}
                            <GripVertical className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />

                            {/* Product preview box */}
                            <div className={`w-9 h-9 rounded-xl ${item.imgColor} border border-slate-100 flex items-center justify-center text-xs flex-shrink-0 overflow-hidden`}>
                              {item.img ? (
                                <svg className="w-5 h-5 text-amber-600/70" viewBox="0 0 24 24" fill="currentColor">
                                  {/* Styled packet graphic */}
                                  <path d="M5 2h14l1 3v15l-1 2H5l-1-2V5l1-3zm2 4h10v14H7V6z" />
                                </svg>
                              ) : (
                                <span className="text-sm">🌾</span>
                              )}
                            </div>

                            <div className="min-w-0">
                              <div className="text-[10.5px] font-bold text-slate-800 truncate font-sans">
                                {lang === 'hi' ? item.name_hi : item.name_en}
                              </div>
                              <div className="text-[8.5px] text-slate-400 font-sans mt-0.5">
                                {lang === 'hi' ? item.qty_hi : item.qty_en}
                              </div>
                            </div>
                          </div>

                          {/* Action Edit/Delete Buttons */}
                          <div className="flex items-center gap-1.5 flex-shrink-0">
                            <button className="w-6.5 h-6.5 rounded-lg border border-[#03B459]/20 flex items-center justify-center bg-[#03B459]/5 hover:bg-[#03B459]/10 transition-colors">
                              <Edit3 className="w-3 h-3 text-[#03B459]" />
                            </button>
                            <button className="w-6.5 h-6.5 rounded-lg border border-red-200 flex items-center justify-center bg-red-50 hover:bg-red-100 transition-colors">
                              <Trash2 className="w-3 h-3 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom WhatsApp Share & Plus Layout */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex gap-2">
                      <div id="whatsapp-btn" className="flex-1 bg-[#03B459] hover:bg-[#03B459]/90 rounded-xl py-2 px-3 flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors duration-150 active:scale-98">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span className="text-white text-[9.5px] font-bold font-sans">
                          {lang === 'hi' ? 'WhatsApp पर भेजें' : 'Share On WhatsApp'}
                        </span>
                      </div>
                      <div className="w-8.5 h-8.5 rounded-xl bg-[#03B459] flex items-center justify-center text-white cursor-pointer active:scale-95 shadow-md">
                        <Plus className="w-4.5 h-4.5" />
                      </div>
                    </div>

                  </div>
                </IPhoneMockup>
              </div>

              {/* Responsive Popping WhatsApp Message Card (Right Overlay) */}
              <div
                className="absolute right-[-10px] sm:right-[-12px] lg:right-[-32px] top-[26%] w-[190px] sm:w-[220px] bg-white rounded-2xl shadow-[0_20px_50px_-8px_rgba(15,81,50,0.15),0_10px_20px_-5px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden z-20 animate-pulse-subtle font-sans"
                style={{ transform: 'translateZ(30px)' }} // Adds physical 3D separation
              >
                {/* WhatsApp Chat Header */}
                <div className="bg-[#075E54] text-white px-3 py-2 flex items-center gap-1.5">
                  <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-bold">
                    🛒
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-[9px] font-bold tracking-tight">Kirana Store Order</span>
                    <span className="text-[6.5px] text-white/70">Online</span>
                  </div>
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#03B459] animate-pulse" />
                </div>

                {/* WhatsApp Chat Background Wallpaper */}
                <div className="bg-[#EFEAE2] p-2.5 flex flex-col gap-2 relative min-h-[145px]">
                  {/* WhatsApp green message bubble */}
                  <div className="bg-[#DCF8C6] text-slate-800 rounded-lg p-2 shadow-2xs text-[9px] leading-relaxed relative self-end max-w-[95%] border-r-2 border-[#DCF8C6] shadow-xs">
                    {/* Bubble tail */}
                    <div className="absolute top-0 right-[-5px] w-0 h-0 border-t-[6px] border-t-[#DCF8C6] border-r-[6px] border-r-transparent" />

                    <div className="font-bold text-emerald-800 text-[9px] mb-0.5">🛒 Gharkilist — {lang === 'hi' ? 'मासिक सूची' : 'Monthly List'}</div>
                    <div className="h-[0.5px] bg-emerald-800/10 my-1" />
                    <div className="space-y-0.5 font-mono text-[8.5px]">
                      <div>1. {lang === 'hi' ? 'बासमती चावल' : 'Basmati Rice'}: 1 kg</div>
                      <div>2. {lang === 'hi' ? 'पोहा' : 'Flattened Rice'}: 500 g</div>
                      <div>3. {lang === 'hi' ? 'सरसों का तेल' : 'Mustard Oil'}: 1 L</div>
                    </div>
                    <div className="h-[0.5px] bg-emerald-800/10 my-1" />
                    <div className="text-slate-500 mt-1 italic text-[8px]">{lang === 'hi' ? '📍 कृपया मेरे पते पर भेजें। धन्यवाद!' : '📍 Please deliver to my address. Thank you!'}</div>

                    <div className="flex justify-end items-center gap-0.5 text-[7px] text-slate-400 mt-1">
                      <span>2:57 PM</span>
                      <svg className="w-2.5 h-2.5 text-[#34B7F1]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M0.5 12 L8 19.5 L23.5 4 L22 2.5 L8 16.5 L2 10.5 z M8 16.5 L12 12.5 L10.5 11 L8 13.5 z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Curved SVG connector arrow showing instant export (Desktop Only) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none z-20 hidden lg:block overflow-visible"
                viewBox="0 0 400 550"
                fill="none"
              >
                {/* Curved dashed arrow path from phone's WhatsApp button to WhatsApp chat card */}
                <path
                  d="M 170 482 C 260 482, 320 420, 280 300"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeDasharray="5 3"
                  strokeLinecap="round"
                />
                {/* Custom SVG Arrowhead */}
                <path
                  d="M 285 310 L 280 300 L 273 306"
                  stroke="#10B981"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {/* Float badge along the curve */}
              <div
                className="absolute right-[85px] bottom-[150px] bg-[#03B459] text-white text-[8px] font-black px-2.5 py-1 rounded-full shadow-md z-30 tracking-wider uppercase border border-white/20 animate-bounce-subtle hidden lg:block"
                style={{ transform: 'translateZ(15px)' }}
              >
                Instant WhatsApp Export
              </div>

              {/* Ambient Floating Badges around the phone */}
              {/* Badge 1 (Left Side) */}
              <div
                className="absolute left-[-24px] sm:left-[-40px] top-[14%] bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-slate-100 hidden sm:block animate-pulse-subtle z-30"
                style={{ transform: 'translateZ(20px)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-lg bg-emerald/10 flex items-center justify-center text-xs">
                    🌾
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate leading-tight">{lang === 'hi' ? 'बारकोड की ज़रूरत नहीं' : 'No Barcode Needed'}</div>
                    <div className={`text-[8px] text-slate/50 mt-0.5 ${lang === 'hi' ? 'leading-normal' : 'leading-none'}`}>{lang === 'hi' ? 'आटा, दाल, मसाले पहले से लोड' : 'Atta, Dals, Spices pre-loaded'}</div>
                  </div>
                </div>
              </div>

              {/* Badge 2 (Bottom Left Side) */}
              <div
                className="absolute left-[-32px] sm:left-[-48px] bottom-[12%] bg-white/95 backdrop-blur-md rounded-2xl p-2.5 shadow-lg border border-slate-100 hidden sm:block animate-pulse-subtle z-30"
                style={{ animationDelay: '1.2s', transform: 'translateZ(10px)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-6.5 h-6.5 rounded-lg bg-mint/15 flex items-center justify-center text-xs">
                    🔒
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate leading-tight">{lang === 'hi' ? '100% प्राइवेट व सुरक्षित' : '100% Offline & Private'}</div>
                    <div className={`text-[8px] text-slate/50 mt-0.5 ${lang === 'hi' ? 'leading-normal' : 'leading-none'}`}>{lang === 'hi' ? 'नो लॉगिन, डेटा फोन में सुरक्षित' : 'No servers, SQLite database'}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
