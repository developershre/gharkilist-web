'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Search, 
  Tag, 
  Calendar, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  Info,
  Clock,
  ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';

interface BlogUpdate {
  id: string;
  version?: string;
  date_en: string;
  date_hi: string;
  title_en: string;
  title_hi: string;
  category: 'release' | 'feature' | 'improvement';
  excerpt_en: string;
  excerpt_hi: string;
  bullets_en: string[];
  bullets_hi: string[];
  apkLink?: string;
  apkSize?: string;
}

const BLOG_UPDATES: BlogUpdate[] = [
  {
    id: 'update-101',
    version: 'v1.0.1',
    date_en: 'August 18, 2026',
    date_hi: '18 अगस्त, 2026',
    title_en: 'v1.0.1 — Android Adaptive Themed Icons & Translation Fix',
    title_hi: 'v1.0.1 — एंड्रॉइड थीम वाले आइकॉन और अनुवाद सुधार',
    category: 'release',
    excerpt_en: 'Introduced adaptive themed launcher icons for Android 13+, resolved rendering issues in the Hindi translation layout, and optimized internal SQLite load queries.',
    excerpt_hi: 'एंड्रॉइड 13+ के लिए थीम वाले एडेप्टिव आइकॉन पेश किए गए, हिंदी अनुवाद में आ रही टेक्स्ट दिखने की समस्या को ठीक किया गया और डेटाबेस लोड परफॉरमेंस बढ़ाया गया।',
    bullets_en: [
      "Themed Adaptive Launcher Icons: Supports Android 13+ Material You icon dynamic coloring.",
      "Bilingual UI Fixes: Improved typography rendering metrics for Noto Sans Devanagari font stack across all page mockups and live simulator.",
      "Line-height improvements: Corrected height clipping on headers and badge elements in Hindi.",
      "Database Optimization: 20% faster list loads by indexing item ID mappings locally."
    ],
    bullets_hi: [
      "थीम वाले एडेप्टिव आइकॉन: एंड्रॉइड 13+ के मटीरियल यू आइकॉन डायनामिक कलरिंग का समर्थन।",
      "द्विभाषी यूआई सुधार: लाइव सिम्युलेटर और सभी सेक्शनों में देवनागरी फॉन्ट रेंडरिंग में सुधार।",
      "लाइन-हाइट सुधार: हिंदी भाषा में हेडिंग्स और बैज एलिमेंट्स के कटने की समस्या को हल किया गया।",
      "डेटाबेस अनुकूलन: लोकल आईडी मैपिंग को इंडेक्स करके सूचियों की लोडिंग स्पीड 20% बढ़ाई गई।"
    ],
    apkLink: '/GharKiList-v1.0.1.apk',
    apkSize: '~59 MB'
  },
  {
    id: 'update-100',
    version: 'v1.0.0',
    date_en: 'August 10, 2026',
    date_hi: '10 अगस्त, 2026',
    title_en: 'v1.0.0 — The Initial Testing Launch of Gharkilist',
    title_hi: 'v1.0.0 — घर की लिस्ट ऐप का पहला टेस्टिंग लॉन्च',
    category: 'release',
    excerpt_en: 'The official first release of Gharkilist pantry and grocery list builder. Created for Indian kitchens to solve loose grocery management, budget calculations, and WhatsApp local kirana sharing.',
    excerpt_hi: 'किचन इन्वेंट्री और किराने की लिस्ट बनाने के लिए घर की लिस्ट ऐप का पहला लॉन्च। खुले सामान (आटा, दाल) के प्रबंधन, बजट की गणना और 1-टैप में WhatsApp ऑर्डर भेजने की सुविधा के साथ।',
    bullets_en: [
      "Curated Pantry Catalog: Over 100 preloaded Indian staples like Dals, Atta, Pooja Needs, and Oils.",
      "100% Offline Database: Built locally using SQLite for absolute privacy—no login, no ads, no cloud.",
      "1-Tap WhatsApp Export: Copy and auto-format your selected items into a clean message for your local kirana shop.",
      "Multi-Inventory Lists: Manage separate lists for Kitchen Pantry, Monthly Kirana, Pooja Needs, or Festival Shopping."
    ],
    bullets_hi: [
      "प्री-लोडेड पेंट्री कैटलॉग: 100+ भारतीय रसोई की सामग्री जैसे दालें, आटा, पूजा सामग्री और तेल शामिल।",
      "100% ऑफ़लाइन डेटाबेस: पूर्ण गोपनीयता के लिए SQLite स्थानीय डेटाबेस पर सुरक्षित—कोई लॉगिन या विज्ञापन नहीं।",
      "1-टैप WhatsApp एक्सपोर्ट: स्थानीय किराने की दुकान के लिए सामान और बजट के साथ साफ संदेश बनाकर ऑटो-सेंड।",
      "मल्टी-इन्वेंट्री लिस्ट: रसोई स्टॉक, मासिक राशन, पूजा सामग्री या त्योहार की अलग-अलग सूचियां बनाएं।"
    ],
    apkLink: '/GharKiList-v1.0.1.apk',
    apkSize: '~59 MB'
  },
  {
    id: 'update-spotlight',
    date_en: 'August 05, 2026',
    date_hi: '05 अगस्त, 2026',
    title_en: 'Feature Spotlight — Curated Staples & Indian Kitchen Units',
    title_hi: 'फीचर स्पॉटलाइट — भारतीय रसोई की आवश्यकताएं और इकाइयाँ',
    category: 'feature',
    excerpt_en: 'Standard Western apps rely on barcode scanning of packaged supermarket items. Here is how Gharkilist catalog support for loose Atta, unbranded spices, and dedicated festive Pooja needs is built.',
    excerpt_hi: 'साधारण पश्चिमी ऐप्स बारकोड पर निर्भर करते हैं। जानिए कैसे घर की लिस्ट ऐप में खुले सामान (आटा, दाल), पिसे मसालों और समर्पित पूजा सामग्री के लिए विशेष कैटलॉग तैयार किया गया है।',
    bullets_en: [
      "Bilingual Item Catalog: Items pre-mapped with English and Hindi regional names for quick search.",
      "Built-in Metric Steppers: Support for Indian measurements (KG, G, Litre, ML, Packets, Pieces).",
      "Dedicated Pooja Category: Catalog of camphor (kapur), cotton wicks (batti), incense (agarbatti), and festive pooja lists."
    ],
    bullets_hi: [
      "द्विभाषी खोज कैटलॉग: त्वरित बोलकर/लिखकर खोजने के लिए अंग्रेजी और क्षेत्रीय हिंदी नाम एक साथ प्री-मैप्ड।",
      "भारतीय माप इकाइयाँ: भारतीय परिवारों के माप जैसे किलो (KG), ग्राम (G), लीटर (L), पैकेट और पीस का समर्थन।",
      "विशेष पूजा सामग्री श्रेणी: भीमसेनी कपूर, बत्ती, अगरबत्ती, दीया तेल और त्योहार पूजन लिस्ट शामिल।"
    ]
  }
];

export default function BlogPage() {
  const { lang } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'release' | 'feature' | 'improvement'>('all');
  const [expandedNotes, setExpandedNotes] = useState<Record<string, boolean>>({
    'update-101': true, // Keep the latest update expanded by default
  });

  const toggleExpand = (id: string) => {
    setExpandedNotes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredUpdates = useMemo(() => {
    return BLOG_UPDATES.filter((post) => {
      const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
      const titleText = lang === 'hi' ? post.title_hi : post.title_en;
      const excerptText = lang === 'hi' ? post.excerpt_hi : post.excerpt_en;
      const matchesSearch = 
        !searchQuery ||
        titleText.toLowerCase().includes(searchQuery.toLowerCase()) ||
        excerptText.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery, lang]);

  const categories = [
    { id: 'all', label_en: 'All Updates', label_hi: 'सभी अपडेट्स' },
    { id: 'release', label_en: 'Releases', label_hi: 'वर्जन रिलीज' },
    { id: 'feature', label_en: 'Features', label_hi: 'फीचर हाइलाइट्स' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Header />

      {/* Main Content Container */}
      <main className="flex-grow pt-28 pb-20 relative overflow-hidden">
        {/* Radial dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-60 pointer-events-none" />

        {/* Ambient background glow spheres */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-12 left-1/4 w-[450px] h-[450px] bg-gradient-to-tr from-mint/10 via-emerald/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-[450px] h-[450px] bg-gradient-to-bl from-saffron/10 via-amber-500/5 to-transparent rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          
          {/* Back Button to Homepage */}
          <div className="mb-6 animate-fade-in">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate/50 hover:text-emerald transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{lang === 'hi' ? 'मुख्य पृष्ठ पर वापस जाएं' : 'Back to Home'}</span>
            </Link>
          </div>

          {/* Page Banner Header */}
          <div className="mb-14 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald/[0.07] border border-emerald/20 rounded-full px-4 py-1.5 mb-4 animate-slide-up shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-mint" />
              <span className="text-[10px] font-bold text-emerald tracking-wider uppercase">
                {lang === 'hi' ? 'अपडेट्स और बदलाव' : 'App Updates & Changelog'}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight mb-4 animate-slide-up">
              {lang === 'hi' ? 'घर की लिस्ट में नया क्या है?' : "What's New in Gharkilist"}
            </h1>
            <p className="text-base text-slate/60 leading-relaxed max-w-2xl animate-slide-up">
              {lang === 'hi'
                ? 'हमारे विकास के सफर, नए वर्जन रिलीज, सुविधाओं के विस्तार और तकनीकी बदलावों पर नजर रखें।'
                : 'Follow our development journey, version releases, themed app icon integration, and product improvements.'}
            </p>
          </div>

          {/* Interactive Filters and Search Row */}
          <div className="bg-white/80 backdrop-blur-md border border-slate/10 p-3 rounded-2xl shadow-sm mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4 animate-slide-up">
            
            {/* Filter Pills */}
            <div className="flex gap-1.5 overflow-x-auto scrollbar-none pb-1 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-1.8 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activeCategory === cat.id
                      ? 'bg-emerald text-white border-emerald shadow-xs'
                      : 'bg-white text-slate/60 border-slate-200 hover:text-slate hover:bg-slate-50'
                  }`}
                >
                  {lang === 'hi' ? cat.label_hi : cat.label_en}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:max-w-xs">
              <input
                type="text"
                placeholder={lang === 'hi' ? 'अपडेट सर्च करें...' : 'Search updates...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.8 text-xs rounded-xl border border-slate-200 outline-none focus:border-emerald text-slate bg-white placeholder:text-slate/40 shadow-inner"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

          </div>

          {/* Chronological Changelog Timeline */}
          {filteredUpdates.length === 0 ? (
            <div className="text-center py-20 bg-white/50 backdrop-blur-md border border-slate-100 rounded-3xl p-8">
              <Info className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="text-sm font-bold text-slate-700">{lang === 'hi' ? 'कोई अपडेट नहीं मिला' : 'No Updates Found'}</h3>
              <p className="text-xs text-slate-400 mt-1">
                {lang === 'hi' 
                  ? 'आपके खोजे गए कीवर्ड से मेल खाता हुआ कोई भी बदलाव नहीं मिला।' 
                  : 'No changes match your selected filters or search terms.'}
              </p>
            </div>
          ) : (
            <div className="relative border-l border-slate-200/80 ml-4 sm:ml-6 pl-6 sm:pl-8 space-y-12 py-2">
              
              {filteredUpdates.map((post) => {
                const isExpanded = !!expandedNotes[post.id];
                const displayCategory = post.category === 'release' 
                  ? (lang === 'hi' ? 'वर्जन रिलीज' : 'Release') 
                  : (lang === 'hi' ? 'फीचर' : 'Feature');
                
                return (
                  <div key={post.id} className="relative group">
                    
                    {/* Timeline Pulse Indicator Dot */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-emerald flex items-center justify-center z-15 shadow-2xs group-hover:scale-110 transition-transform">
                      <div className="w-1.5 h-1.5 rounded-full bg-mint animate-pulse" />
                    </div>

                    {/* Date Block */}
                    <div className="flex flex-wrap items-center gap-3.5 text-xs text-slate-400 font-bold mb-2.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{lang === 'hi' ? post.date_hi : post.date_en}</span>
                      </span>
                      <span className="w-1 h-1 rounded-full bg-slate-350" />
                      <Badge 
                        variant={post.category === 'release' ? 'default' : 'outline'} 
                        className={`text-[9px] uppercase px-2 py-0.5 tracking-wider ${
                          post.category === 'release' ? 'bg-[#03B459]' : 'border-slate/15 text-slate-500'
                        }`}
                      >
                        {displayCategory}
                      </Badge>
                      {post.version && (
                        <Badge variant="saffron" className="text-[9px] font-extrabold px-2 py-0.5 tracking-wide">
                          {post.version}
                        </Badge>
                      )}
                    </div>

                    {/* Content Card container */}
                    <Card className="bg-white border-slate/10 hover:border-emerald/20 hover:shadow-lg transition-all duration-300 rounded-2xl overflow-hidden relative p-5 sm:p-6">
                      
                      {/* Decorative colored strip for releases */}
                      {post.category === 'release' && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#03B459] to-mint" />
                      )}

                      <h3 className="text-lg font-black text-slate group-hover:text-emerald transition-colors mb-3">
                        {lang === 'hi' ? post.title_hi : post.title_en}
                      </h3>
                      
                      <p className="text-sm text-slate/60 leading-relaxed mb-4">
                        {lang === 'hi' ? post.excerpt_hi : post.excerpt_en}
                      </p>

                      {/* Expandable detailed release notes */}
                      <div className="border-t border-slate/5 pt-4">
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="flex items-center gap-1.5 text-xs font-bold text-emerald hover:text-emerald-light transition-colors"
                        >
                          <span>{lang === 'hi' ? 'विवरण और रिलीज नोट्स' : 'Detailed Release Notes'}</span>
                          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>

                        {isExpanded && (
                          <div className="mt-4 bg-slate-50/60 border border-slate-100 rounded-xl p-4 animate-slide-up">
                            <ul className="space-y-2.5 text-xs text-slate-650 list-disc pl-4 leading-relaxed">
                              {(lang === 'hi' ? post.bullets_hi : post.bullets_en).map((bullet, idx) => (
                                <li key={idx} className="marker:text-mint">{bullet}</li>
                              ))}
                            </ul>

                            {/* Direct Download Badge & APK info for releases */}
                            {post.category === 'release' && post.apkLink && (
                              <div className="mt-4 pt-4 border-t border-slate-200/50 flex flex-wrap items-center gap-3">
                                <Button variant="emerald" size="sm" asChild className="gap-2 text-[11px] font-bold">
                                  <a href={post.apkLink} download>
                                    <Download className="w-3.5 h-3.5" />
                                    <span>{lang === 'hi' ? 'ऐप डाउनलोड करें' : 'Download Standalone APK'}</span>
                                  </a>
                                </Button>
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  {lang === 'hi' ? `फ़ाइल आकार: ${post.apkSize}` : `Size: ${post.apkSize}`} &middot; Android 7.0+
                                </span>
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                    </Card>

                  </div>
                );
              })}

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}
