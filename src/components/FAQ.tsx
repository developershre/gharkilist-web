'use client';

import { useState } from 'react';

const faqs = [
  {
    question: 'Is Gharkilist completely free?',
    answer: 'Yes, 100% free with no hidden fees, subscriptions, or in-app purchases.',
  },
  {
    question: 'Does it need internet?',
    answer: 'No. Your data is stored locally on your device using SQLite. No login, no cloud, no tracking.',
  },
  {
    question: 'How does WhatsApp export work?',
    answer: 'Select items, tap "Share on WhatsApp", and a formatted list with names, quantities, and prices is sent to your kirana store.',
  },
  {
    question: 'Can I add custom items?',
    answer: 'Yes. Create custom items with custom names, units (KG, G, L, ML, Packets), and prices. You can also scan photos or browse our 200+ product collection.',
  },
  {
    question: 'Which languages are supported?',
    answer: 'Every item has bilingual names — English and Hindi (हिन्दी) — making it easy for all family members to use.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Absolutely. Gharkilist runs entirely on your device with zero internet. No servers, no analytics, no tracking.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-cream">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-[0.12em] mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-[-0.02em]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-1.5">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-black/[0.04] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === i ? null : i)}
                  className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left"
                >
                  <span className="text-[13px] font-medium text-slate">{faq.question}</span>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`text-slate/25 flex-shrink-0 transition-transform duration-200 ${openIndex === i ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    openIndex === i ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-4 text-[13px] text-slate/45 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
