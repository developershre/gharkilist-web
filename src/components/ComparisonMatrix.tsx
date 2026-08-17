'use client';

import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function ComparisonMatrix() {
  const { lang } = useLanguage();

  const comparisonRows = [
    {
      feature_en: 'Loose Staples (Atta, Dals by KG/G)',
      feature_hi: 'खुला सामान (आटा, दाल किलो/ग्राम में)',
      generic_en: 'Fails (Requires barcode scan)',
      generic_hi: 'विफल (बारकोड की आवश्यकता)',
      gharkilist_en: '100% Pre-cataloged with KG/G units',
      gharkilist_hi: '100% पूर्व-सूचीबद्ध (KG/G के साथ)',
    },
    {
      feature_en: 'Bilingual Item Names',
      feature_hi: 'द्विभाषी नाम (English + हिंदी)',
      generic_en: 'English only',
      generic_hi: 'केवल अंग्रेज़ी',
      gharkilist_en: 'Bilingual (English + Hindi/हिन्दी)',
      gharkilist_hi: 'द्विभाषी (English + हिंदी)',
    },
    {
      feature_en: 'Local Kirana Ordering',
      feature_hi: 'स्थानीय किराना ऑर्डरिंग',
      generic_en: 'Forces unwanted online checkout',
      generic_hi: 'ऑनलाइन चेकआउट का दबाव',
      gharkilist_en: '1-Tap Formatted WhatsApp Export',
      gharkilist_hi: '1-टैप में WhatsApp लिस्ट एक्सपोर्ट',
    },
    {
      feature_en: 'Privacy & Internet Requirement',
      feature_hi: 'प्राइवेसी और इंटरनेट की जरूरत',
      generic_en: 'Requires online account & tracking',
      generic_hi: 'अकाउंट व ट्रैकिंग अनिवार्य',
      gharkilist_en: '100% Offline SQLite, Zero Tracking',
      gharkilist_hi: '100% ऑफ़लाइन SQLite, ज़ीरो ट्रैकिंग',
    },
    {
      feature_en: 'Indian Pooja & Festival Lists',
      feature_hi: 'पूजा और त्योहारों की सूची',
      generic_en: 'Not available',
      generic_hi: 'उपलब्ध नहीं',
      gharkilist_en: 'Dedicated Pooja & Festival Categories',
      gharkilist_hi: 'समर्पित पूजा और त्योहार कैटगरी',
    },
  ];

  return (
    <section id="why" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <Badge variant="saffron" className="mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'तुलना तालिका' : 'Why Standard Apps Fail'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight mb-3">
              {lang === 'hi' ? 'साधारण ग्रॉसरी ऐप बनाम घर की लिस्ट' : 'Why Generic Apps Fail Indian Kitchens'}
            </h2>
            <p className="text-base text-slate/50 max-w-md mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'जानिए क्यों पश्चिमी बारकोड ऐप्स भारतीय रसोई के लिए बेकार साबित होते हैं।'
                : 'Western barcode apps are designed for packaged supermarket goods, not Indian households.'}
            </p>
          </div>

          <Card className="overflow-hidden border-slate/15 shadow-xl bg-white">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-slate/10 bg-slate-50/70 text-slate">
                    <th className="py-4 px-6 font-extrabold text-sm w-1/3">
                      {lang === 'hi' ? 'सुविधा' : 'Feature'}
                    </th>
                    <th className="py-4 px-6 font-bold text-sm text-slate/50 w-1/3">
                      <span className="flex items-center gap-1.5">
                        <ShieldAlert className="w-4 h-4 text-amber-500" />
                        {lang === 'hi' ? 'साधारण ऐप्स' : 'Generic Western Apps'}
                      </span>
                    </th>
                    <th className="py-4 px-6 font-extrabold text-sm text-emerald bg-emerald/5 w-1/3">
                      <span className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4 text-emerald" />
                        Gharkilist (घर की लिस्ट)
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate/10 text-sm">
                  {comparisonRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate">
                        {lang === 'hi' ? row.feature_hi : row.feature_en}
                      </td>

                      <td className="py-4 px-6 text-slate/60">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center flex-shrink-0">
                            <X className="w-3 h-3" />
                          </div>
                          <span>{lang === 'hi' ? row.generic_hi : row.generic_en}</span>
                        </div>
                      </td>

                      <td className="py-4 px-6 bg-emerald/[0.02] font-semibold text-slate">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-emerald text-white flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                          <span className="text-emerald font-bold">
                            {lang === 'hi' ? row.gharkilist_hi : row.gharkilist_en}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
