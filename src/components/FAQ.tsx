'use client';

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/context/LanguageContext';

export default function FAQ() {
  const { lang } = useLanguage();

  const faqs = [
    {
      q_en: 'Is Gharkilist completely free to use?',
      q_hi: 'क्या घर की लिस्ट ऐप पूरी तरह से मुफ़्त है?',
      a_en: 'Yes! Gharkilist is 100% free forever with zero hidden fees, no subscriptions, and zero ad clutter.',
      a_hi: 'हाँ! घर की लिस्ट पूरी तरह से मुफ़्त है। इसमें कोई छिपा हुआ शुल्क, कोई सदस्यता और कोई विज्ञापन नहीं है।',
    },
    {
      q_en: 'Does Gharkilist require an internet connection?',
      q_hi: 'क्या ऐप चलाने के लिए इंटरनेट कनेक्शन आवश्यक है?',
      a_en: 'No! Gharkilist is built 100% offline using a local SQLite database on your device. It works without Wi-Fi or mobile data.',
      a_hi: 'नहीं! ऐप आपके डिवाइस पर लोकल SQLite डेटाबेस का उपयोग करता है। यह बिना इंटरनेट के 100% काम करता है।',
    },
    {
      q_en: 'How does 1-Tap Kirana WhatsApp export work?',
      q_hi: 'WhatsApp किराना एक्सपोर्ट सुविधा कैसे काम करती है?',
      a_en: 'When you finish building your grocery list, tap "Share to Kirana". Gharkilist formats items, quantities, and estimated price in ₹ into a text message and opens WhatsApp automatically.',
      a_hi: 'जब आपकी लिस्ट तैयार हो जाती है, "Share to Kirana" पर टैप करें। यह सामान, मात्रा और अनुमानित बजट को सुव्यवस्थित संदेश में बदलकर WhatsApp पर खोल देता है।',
    },
    {
      q_en: 'Can I add custom items or custom units?',
      q_hi: 'क्या मैं अपने खुद के सामान और इकाइयां जोड़ सकता हूं?',
      a_en: 'Absolutely! While we pre-catalog 100+ standard Indian staples, you can add custom items with custom units (KG, G, L, ML, Packets, Pieces) anytime.',
      a_hi: 'बिल्कुल! हालाँकि 100+ भारतीय वस्तुएं पूर्व-सूचीबद्ध हैं, आप अपनी पसंद के नए सामान और इकाइयां (किलो, ग्राम, लीटर, पैकेट) कभी भी जोड़ सकते हैं।',
    },
    {
      q_en: 'Where is my pantry data stored?',
      q_hi: 'मेरा डेटा कहाँ सहेजा जाता है?',
      a_en: 'Your data never leaves your device. All inventories and budgets are stored 100% locally in your phone storage. Zero cloud servers, zero tracking.',
      a_hi: 'आपका डेटा आपके फोन से बाहर कभी नहीं जाता। सभी सूचियां और बजट 100% स्थानीय रूप से सहेजे जाते हैं। कोई क्लाउड सर्वर नहीं, कोई ट्रैकिंग नहीं।',
    },
  ];

  return (
    <section id="faq" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-cream/50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="saffron" className="mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'सामान्य प्रश्न' : 'Frequently Asked Questions'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight mb-3">
              {lang === 'hi' ? 'अक्सर पूछे जाने वाले सवाल' : 'Got Questions? We Have Answers.'}
            </h2>
            <p className="text-base text-slate/50 max-w-md mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'घर की लिस्ट ऐप से जुड़े मुख्य सवालों के जवाब यहाँ पाएँ।'
                : 'Everything you need to know about privacy, offline storage, and WhatsApp ordering.'}
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate/10 p-6 sm:p-8 shadow-xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, idx) => (
                <AccordionItem key={idx} value={`item-${idx}`}>
                  <AccordionTrigger className="text-base font-bold text-slate hover:text-emerald">
                    {lang === 'hi' ? faq.q_hi : faq.q_en}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-slate/60 leading-relaxed">
                    {lang === 'hi' ? faq.a_hi : faq.a_en}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
