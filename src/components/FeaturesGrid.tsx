'use client';

import { BookOpen, MessageCircle, Layers, ShieldCheck, Scale, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function FeaturesGrid() {
  const { lang } = useLanguage();

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-emerald" />,
      title_en: '100+ Indian Pantry Catalog',
      title_hi: '100+ भारतीय रसोई कैटलॉग',
      desc_en: 'Pre-loaded with regional names like Toor / Tuvar / Arhar Dal, Atta, & Spices. Every item your kitchen needs.',
      desc_hi: 'क्षेत्रीय नामों जैसे तूर / अरहर दाल, आटा और मसालों के साथ प्री-लोड। आपकी रसोई की हर जरूरत शामिल।',
      badge_en: 'Bilingual Catalog',
      badge_hi: 'द्विभाषी सूची',
    },
    {
      icon: <MessageCircle className="w-6 h-6 text-whatsapp" />,
      title_en: '1-Tap Kirana WhatsApp Export',
      title_hi: '1-टैप किराना WhatsApp एक्सपोर्ट',
      desc_en: 'Formats items, quantities, and total budget automatically into a clean message for your local kirana store.',
      desc_hi: 'सामान, मात्रा और कुल बजट को स्वचालित रूप से साफ संदेश में बदलकर किराना वाले को भेजता है।',
      badge_en: 'Kirana Friendly',
      badge_hi: 'किराना फ्रेंडली',
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald" />,
      title_en: 'Multi-Inventory Switching',
      title_hi: 'मल्टी-इन्वेंट्री लिस्ट',
      desc_en: 'Keep separate lists for Kitchen Pantry, Monthly Kirana, Pooja Needs, and Party Feasts. Switch instantly.',
      desc_hi: 'रसोई स्टॉक, मासिक किराना, पूजा सामग्री और पार्टी लिस्ट की अलग-अलग सूचियां बनाएं।',
      badge_en: 'Organized',
      badge_hi: 'व्यवस्थित',
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-emerald" />,
      title_en: '100% Offline & Private',
      title_hi: '100% ऑफ़लाइन और निजी',
      desc_en: 'Local SQLite database. Zero cloud sync, zero tracking, no account required. Your data stays on your phone.',
      desc_hi: 'लोकल SQLite डेटाबेस। कोई क्लाउड सिंक नहीं, कोई ट्रैकिंग नहीं, कोई अकाउंट नहीं। डेटा आपके फोन में सुरक्षित।',
      badge_en: 'Zero Tracking',
      badge_hi: 'ज़ीरो ट्रैकिंग',
    },
    {
      icon: <Scale className="w-6 h-6 text-saffron" />,
      title_en: 'Quantity & Unit Stepper',
      title_hi: 'मात्रा और इकाई स्टेपर',
      desc_en: 'Built-in support for KG, G, L, ML, Packets, and Pieces. Adjust quantities with simple + and - buttons.',
      desc_hi: 'KG, G, L, ML, पैकेट और पीस के लिए निर्मित समर्थन। सरल + और - बटन से मात्रा समायोजित करें।',
      badge_en: 'Indian Units',
      badge_hi: 'भारतीय इकाइयाँ',
    },
    {
      icon: <Zap className="w-6 h-6 text-mint" />,
      title_en: 'Zero Ad Clutter',
      title_hi: 'बिना किसी विज्ञापन का अनुभव',
      desc_en: 'Superfast, lightweight app optimized for performance. No ads, no popups, zero distraction.',
      desc_hi: 'सुपरफ़ास्ट, हल्का ऐप जो प्रदर्शन के लिए अनुकूलित है। कोई विज्ञापन नहीं, कोई रुकावट नहीं।',
      badge_en: 'Fast & Clean',
      badge_hi: 'तेज़ और साफ',
    },
  ];

  return (
    <section id="features" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-cream/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="default" className="mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'विशेषताएं' : 'Key Features'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight mb-3">
              {lang === 'hi' ? 'भारतीय रसोई के लिए आवश्यक हर सुविधा' : 'Everything Your Kitchen Needs'}
            </h2>
            <p className="text-base text-slate/50 max-w-md mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'पश्चिमी ग्रॉसरी ऐप्स की कमियों को दूर करने के लिए विशेष रूप से डिज़ाइन किया गया।'
                : 'Built specifically for Indian households with features standard western grocery apps lack.'}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <Card key={i} className="group bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-slate/10 overflow-hidden relative">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald via-mint to-saffron opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald/5 border border-emerald/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <Badge variant="outline" className="text-[10px] border-slate/15">
                      {lang === 'hi' ? feature.badge_hi : feature.badge_en}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-bold text-slate mb-2">
                    {lang === 'hi' ? feature.title_hi : feature.title_en}
                  </CardTitle>
                  <CardDescription className="text-sm text-slate/60 leading-relaxed">
                    {lang === 'hi' ? feature.desc_hi : feature.desc_en}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
