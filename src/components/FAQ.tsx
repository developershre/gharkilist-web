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
      a_en: 'No, Gharkilist is not a free app. It is completely free to download and use only during the testing period. Following the testing phase, a subscription-based model will be implemented for full feature access.',
      a_hi: 'नहीं, घर की लिस्ट पूरी तरह से मुफ़्त ऐप नहीं है। यह केवल बीटा टेस्टिंग अवधि के दौरान डाउनलोड और उपयोग करने के लिए मुफ़्त है। टेस्टिंग चरण के बाद, इसमें सब्सक्रिप्शन मॉडल लागू किया जाएगा।',
    },
    {
      q_en: 'Does Gharkilist require an internet connection?',
      q_hi: 'क्या ऐप चलाने के लिए इंटरनेट कनेक्शन आवश्यक है?',
      a_en: 'Yes, it requires an internet connection to keep track of analytics and sync your pantry data. However, the app also includes an in-app database. Users can opt to use the app completely free and offline, though exclusive features will not be available.',
      a_hi: 'हाँ, घर की लिस्ट को आपके डेटा को ट्रैक और सिंक करने के लिए इंटरनेट कनेक्शन की आवश्यकता होती है। यह ऐप इन-ऐप लोकल डेटाबेस के साथ भी आता है जिसे आप चाहें तो पूरी तरह से मुफ़्त और ऑफ़लाइन उपयोग कर सकते हैं, लेकिन तब विशेष फीचर्स उपलब्ध नहीं होंगे।',
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
    {
      q_en: 'What does "Beta Testing Phase" mean?',
      q_hi: 'पब्लिक बीटा टेस्टिंग का क्या अर्थ है?',
      a_en: 'Gharkilist is currently in its public beta testing phase. This means the app features are fully functional, but we are actively collecting feedback to optimize performance and squash any remaining bugs before the official production release.',
      a_hi: 'घर की लिस्ट अभी पब्लिक बीटा टेस्टिंग के चरण में है। इसका मतलब है कि ऐप पूरी तरह से काम कर रहा है, लेकिन आधिकारिक रिलीज से पहले प्रदर्शन को बेहतर बनाने और बग्स को ठीक करने के लिए हम उपयोगकर्ताओं से प्रतिक्रिया एकत्र कर रहे हैं।',
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
