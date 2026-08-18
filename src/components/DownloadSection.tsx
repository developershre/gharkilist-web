'use client';

import { Download, QrCode, Smartphone, CheckCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function DownloadSection() {
  const { lang } = useLanguage();

  const installSteps = [
    {
      step: '01',
      title_en: 'Download App',
      title_hi: 'ऐप डाउनलोड करें',
      desc_en: 'Click the download button to save the ~59 MB Android App file to your phone.',
      desc_hi: 'अपने फोन पर ~59 MB की एंड्रॉइड ऐप सहेजने के लिए बटन पर क्लिक करें।',
    },
    {
      step: '02',
      title_en: 'Allow Unknown Sources',
      title_hi: 'अज्ञात स्रोतों की अनुमति दें',
      desc_en: 'If prompted by Android, enable "Install from Unknown Sources" in your browser settings.',
      desc_hi: 'यदि एंड्रॉइड द्वारा कहा जाए, तो ब्राउज़र सेटिंग्स में "Unknown Sources" की अनुमति दें।',
    },
    {
      step: '03',
      title_en: 'Open & Enjoy Privacy',
      title_hi: 'खोलें और उपयोग शुरू करें',
      desc_en: 'Open Gharkilist instantly! No registration, no login, 100% offline local storage.',
      desc_hi: 'बिना किसी पंजीकरण या इंटरनेट के अपनी रसोई सूची और किराना ऑर्डर संभालें!',
    },
  ];

  return (
    <section id="download" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="mint" className="mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'मुफ्त एंड्रॉइड ऐप' : 'Direct App Download'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight mb-3">
              {lang === 'hi' ? 'आज ही घर की लिस्ट ऐप डाउनलोड करें' : 'Get Gharkilist for Android Today'}
            </h2>
            <p className="text-base text-slate/50 max-w-md mx-auto leading-relaxed">
              {lang === 'hi'
                ? '100% मुफ्त, विज्ञापन-मुक्त और ऑफ़लाइन ऐप। सीधे एंड्रॉइड डिवाइस पर इंस्टॉल करें।'
                : '100% free, privacy-first Android app. Download the standalone App installation file directly.'}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Release Spec & Download Card */}
            <div className="lg:col-span-7">
              <Card className="bg-linear-to-br from-slate-900 via-slate-900 to-emerald-950 text-white border-none shadow-2xl p-6 sm:p-8 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-mint/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-700/30 flex items-center justify-center p-1.5 shadow-lg">
                      <img src="/logo.svg" alt="Gharkilist Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">Gharkilist (घर की लिस्ट)</h3>
                      <p className="text-xs text-slate-300">Android Application &middot; Testing Release</p>
                    </div>
                  </div>
                  <Badge variant="saffron" className="px-3 py-1 font-extrabold text-xs">
                    v1.0.0 Stable
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">File Size</span>
                    <span className="text-sm sm:text-base font-extrabold text-white">~59 MB</span>
                  </div>
                  <div className="border-x border-white/10">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Requirement</span>
                    <span className="text-sm sm:text-base font-extrabold text-white">Android 7.0+</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">License</span>
                    <span className="text-sm sm:text-base font-extrabold text-mint">100% Free</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button variant="emerald" size="lg" asChild className="w-full justify-center gap-3 py-6 text-base font-bold shadow-xl shadow-emerald/30">
                    <a href="/gharkilist.apk" download>
                      <Download className="w-5 h-5" />
                      <span>{lang === 'hi' ? 'एंड्रॉइड ऐप डाउनलोड करें (v1.0)' : 'Download Android App v1.0.0'}</span>
                    </a>
                  </Button>
                  <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-4 h-4 text-mint" />
                    <span>Scanned with Google Play Protect &middot; Safe & Verified App</span>
                  </p>
                </div>
              </Card>
            </div>

            {/* QR Code Scan Card */}
            <div className="lg:col-span-5">
              <Card className="bg-white border-slate/15 shadow-xl p-6 rounded-3xl text-center flex flex-col items-center">
                <div className="w-12 h-12 rounded-2xl bg-slate/5 border border-slate/10 flex items-center justify-center text-slate mb-4">
                  <QrCode className="w-6 h-6 text-emerald" />
                </div>
                <h3 className="text-lg font-bold text-slate mb-1">
                  {lang === 'hi' ? 'फोन से क्यूआर कोड स्कैन करें' : 'Scan to Download on Mobile'}
                </h3>
                <p className="text-xs text-slate/50 mb-4">
                  {lang === 'hi'
                    ? 'अपने स्मार्टफोन के कैमरे से स्कैन करें और तुरंत ऐप इंस्टॉल करें'
                    : 'Point your camera to scan QR code and open direct download link'}
                </p>

                {/* Actual QR Code Box */}
                <div className="w-40 h-40 bg-white rounded-2xl p-2 border-4 border-emerald/20 flex items-center justify-center shadow-md mb-3 overflow-hidden">
                  <img src="/qr.png" alt="Gharkilist Download QR Code" className="w-full h-full object-contain" />
                </div>
                <Badge variant="outline" className="text-[10px] text-slate/60">
                  direct link: gharkilist app
                </Badge>
              </Card>
            </div>
          </div>

          {/* 3 Step Installation Walkthrough */}
          <div className="mt-16 pt-10 border-t border-slate/10">
            <h3 className="text-xl font-extrabold text-slate text-center mb-8">
              {lang === 'hi' ? 'आसान 3-स्टेप इंस्टॉलेशन गाइड' : 'Simple 3-Step Installation Guide'}
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {installSteps.map((s, i) => (
                <Card key={i} className="bg-slate-50/60 border-slate/10 p-6 relative">
                  <div className="text-3xl font-black text-emerald/20 mb-2">{s.step}</div>
                  <h4 className="text-base font-bold text-slate mb-1">
                    {lang === 'hi' ? s.title_hi : s.title_en}
                  </h4>
                  <p className="text-xs text-slate/60 leading-relaxed">
                    {lang === 'hi' ? s.desc_hi : s.desc_en}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
