'use client';

import { useState, useEffect } from 'react';
import { Download, QrCode, ShieldCheck, ChevronDown, ChevronUp, Calendar, FileDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

interface ApkRelease {
  url: string;
  pathname: string;
  size: number;
  uploadedAt: string;
  version: string;
  isFallback: boolean;
}

export default function DownloadSection() {
  const { lang } = useLanguage();
  const [apks, setApks] = useState<ApkRelease[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOlder, setShowOlder] = useState(false);

  useEffect(() => {
    fetch('/api/apks')
      .then((res) => res.json())
      .then((data) => {
        setApks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching APK list:', err);
        setLoading(false);
      });
  }, []);

  // Determine latest APK, fallback to default meta if loading or empty
  const latestApk = apks[0] || {
    url: 'https://github.com/developershre/gharkilist/releases/download/beta_v0.0.6%2B1/GharKiList-vbeta_0.0.6%2B1.apk',
    pathname: 'GharKiList-vbeta_0.0.6+1.apk',
    size: 28323994,
    uploadedAt: new Date('2026-08-20T08:22:18Z').toISOString(),
    version: '0.0.6+1',
    isFallback: true,
  };

  const formatSize = (bytes: number) => {
    if (bytes <= 0) return 'GitHub';
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(1)} MB`;
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(lang === 'hi' ? 'hi-IN' : 'en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const installSteps = [
    {
      step: '01',
      title_en: 'Download App',
      title_hi: 'ऐप डाउनलोड करें',
      desc_en: `Click the download button to save the ~${formatSize(latestApk.size)} Android App file to your phone.`,
      desc_hi: `अपने फोन पर ~${formatSize(latestApk.size)} की एंड्रॉइड ऐप सहेजने के लिए बटन पर क्लिक करें।`,
    },
    {
      step: '02',
      title_en: 'Allow Unknown Sources',
      title_hi: 'अअज्ञात स्रोतों की अनुमति दें',
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

  // Get older versions (all apks except the first/latest one)
  const olderApks = apks.slice(1);

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
              <Card className="bg-linear-to-br from-slate-900 via-slate-900 to-emerald-950 text-white border-none shadow-2xl p-6 sm:p-8 rounded-3xl relative overflow-hidden animate-fadeIn">
                <div className="absolute top-0 right-0 w-80 h-80 bg-mint/10 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-700/30 flex items-center justify-center p-1.5 shadow-lg">
                      <img src="/logo.png" alt="Gharkilist Logo" className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h3 className="text-xl font-extrabold tracking-tight">Gharkilist (घर की लिस्ट)</h3>
                      <p className="text-xs text-slate-300">
                        {lang === 'hi' ? 'एंड्रॉइड एप्लीकेशन · परीक्षण रिलीज़' : 'Android Application · Testing Release'}
                      </p>
                    </div>
                  </div>
                  <Badge variant="saffron" className="px-3 py-1 font-extrabold text-xs animate-pulse">
                    {loading ? 'v0.0.6 Beta (Testing)' : `v${latestApk.version} Beta (Testing)`}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 mb-6 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">File Size</span>
                    <span className="text-sm sm:text-base font-extrabold text-white">
                      {loading ? '~58.6 MB' : formatSize(latestApk.size)}
                    </span>
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
                  <Button variant="emerald" size="lg" asChild className="w-full justify-center gap-3 py-6 text-base font-bold shadow-xl shadow-emerald/30 hover:scale-[1.01] transition-transform">
                    <a href="/api/apks/latest">
                      <Download className="w-5 h-5 animate-bounce" />
                      <span>
                        {lang === 'hi' 
                          ? `एंड्रॉइड ऐप डाउनलोड करें (v${latestApk.version})` 
                          : `Download Android App v${latestApk.version}`}
                      </span>
                    </a>
                  </Button>
                  <p className="text-[11px] text-center text-slate-400 flex items-center justify-center gap-1.5 pt-1">
                    <ShieldCheck className="w-4 h-4 text-mint" />
                    <span>Scanned with Google Play Protect &middot; Safe & Verified App</span>
                  </p>

                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block text-center">
                      {lang === 'hi' ? 'यूनिवर्सल APK (v0.0.6+1):' : 'Universal APK (v0.0.6+1):'}
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button variant="outline" size="sm" asChild className="text-[11px] font-bold bg-white/5 border-white/10 hover:bg-white/10 hover:text-white rounded-xl text-slate-300 hover:border-emerald/40 transition-colors">
                        <a href="https://github.com/developershre/gharkilist/releases/tag/beta_v0.0.6%2B1" target="_blank" rel="noreferrer">
                          {lang === 'hi' ? 'सभी डिवाइस के लिए' : 'All Devices'}
                        </a>
                      </Button>
                    </div>
                  </div>
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

          {/* Beta Testing Feedback Callout */}
          <div className="mt-12 bg-emerald/[0.03] border border-emerald/10 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 animate-fadeIn">
            <div className="space-y-2 text-center md:text-left">
              <Badge variant="saffron" className="px-2.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wider bg-amber-500/10 text-amber-600 border-amber-500/20">
                {lang === 'hi' ? 'फीडबैक आवश्यक' : 'Feedback Wanted'}
              </Badge>
              <h4 className="text-base font-extrabold text-slate">
                {lang === 'hi' ? 'बीटा टेस्टिंग फीडबैक और बग रिपोर्ट' : 'Beta Testing Feedback & Bug Reports'}
              </h4>
              <p className="text-xs text-slate/60 max-w-2xl leading-relaxed">
                {lang === 'hi'
                  ? 'घर की लिस्ट अभी पब्लिक बीटा टेस्टिंग के चरण में है। यदि आपको कोई समस्या आती है, क्रैश होता है, या आपके पास कोई नया फीचर सुझाव है, तो कृपया हमारे साथ साझा करें!'
                  : 'Gharkilist is currently in public beta testing. If you experience any issues, crashes, or have feature ideas, we would love to hear from you!'}
              </p>
            </div>
            <div className="flex gap-3 shrink-0 w-full md:w-auto justify-center">
              <Button variant="outline" size="sm" asChild className="rounded-xl border-slate/20 hover:border-emerald/30 font-bold px-4 py-5 text-xs bg-white text-slate-800">
                <a href="https://github.com" target="_blank" rel="noreferrer">
                  {lang === 'hi' ? 'गिटहब पर रिपोर्ट करें' : 'Report on GitHub'}
                </a>
              </Button>
              <Button variant="emerald" size="sm" asChild className="rounded-xl bg-[#03B459] hover:bg-[#03B459]/90 font-bold px-4 py-5 text-xs text-white shadow-md shadow-emerald/10">
                <a href="https://wa.me/910000000000" target="_blank" rel="noreferrer">
                  {lang === 'hi' ? 'व्हाट्सएप फीडबैक' : 'WhatsApp Feedback'}
                </a>
              </Button>
            </div>
          </div>

          {/* Older Versions Section */}
          {!loading && olderApks.length > 0 && (
            <div className="mt-12 pt-8 border-t border-slate/10 text-center animate-fadeIn">
              <Button 
                variant="outline" 
                onClick={() => setShowOlder(!showOlder)}
                className="gap-2 border-slate/15 text-slate/70 hover:text-emerald hover:border-emerald/40 hover:bg-emerald/5 rounded-2xl px-6 py-5 font-bold transition-all shadow-sm"
              >
                {showOlder ? (
                  <>
                    <ChevronUp className="w-4 h-4 text-emerald" />
                    <span>{lang === 'hi' ? 'पुराने वर्शन छिपाएं' : 'Hide Older Versions'}</span>
                  </>
                ) : (
                  <>
                    <ChevronDown className="w-4 h-4 text-emerald" />
                    <span>{lang === 'hi' ? 'पुराने वर्शन देखें' : 'View Older Versions'}</span>
                  </>
                )}
              </Button>

              {showOlder && (
                <div className="mt-6 text-left max-w-3xl mx-auto bg-slate-50/60 border border-slate-100/70 rounded-3xl p-5 sm:p-6 animate-slide-up shadow-sm">
                  <h4 className="text-sm font-extrabold text-slate-800 mb-4 flex items-center gap-2">
                    <FileDown className="w-4 h-4 text-emerald" />
                    <span>{lang === 'hi' ? 'उपलब्ध पिछले रिलीज़' : 'Available Previous Releases'}</span>
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs sm:text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          <th className="pb-3 pl-2">Version</th>
                          <th className="pb-3">Size</th>
                          <th className="pb-3">Release Date</th>
                          <th className="pb-3 pr-2 text-right">Download</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {olderApks.map((apk, index) => (
                          <tr key={index} className="text-slate-650 hover:bg-white/40 group">
                            <td className="py-3.5 pl-2 font-bold text-slate-800 flex flex-wrap items-center gap-1.5">
                              <Badge variant="outline" className="px-2 py-0.5 border-slate-300 text-slate-700 bg-white">
                                v{apk.version}
                              </Badge>
                              {apk.pathname.includes('64bit') && (
                                <span className="text-[10px] text-slate-500 font-semibold">(64-bit ARM)</span>
                              )}
                              {apk.pathname.includes('32bit') && (
                                <span className="text-[10px] text-slate-500 font-semibold">(32-bit ARM)</span>
                              )}
                              {apk.pathname.includes('x86_64') && (
                                <span className="text-[10px] text-slate-500 font-semibold">(x86_64 Emulator)</span>
                              )}
                            </td>
                            <td className="py-3.5 text-slate-500 font-medium">{formatSize(apk.size)}</td>
                            <td className="py-3.5 text-slate-400 flex items-center gap-1.5 mt-0.5">
                              <Calendar className="w-3.5 h-3.5 text-slate-300" />
                              <span>{formatDate(apk.uploadedAt)}</span>
                            </td>
                            <td className="py-3.5 pr-2 text-right">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                asChild 
                                className="h-8 w-8 rounded-xl p-0 hover:bg-emerald/5 hover:text-emerald text-slate-400"
                                title="Download Version"
                              >
                                <a 
                                  href={apk.url} 
                                  target={apk.url.startsWith('http') ? '_blank' : undefined} 
                                  rel={apk.url.startsWith('http') ? 'noreferrer' : undefined}
                                  download={!apk.url.startsWith('http') ? '' : undefined}
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </a>
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

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
