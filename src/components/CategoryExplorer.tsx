'use client';

import { useState } from 'react';

const categoryData = [
  {
    id: 'grains',
    emoji: '🌾',
    name: 'Grains & Atta',
    hindi: 'अनाज और आटा',
    items: [
      { en: 'Whole Wheat Atta', hi: 'गेहूं का आटा', unit: '5 KG' },
      { en: 'Basmati Rice', hi: 'बास्मती चावल', unit: '5 KG' },
      { en: 'Maida (Refined Flour)', hi: 'मैदा', unit: '1 KG' },
      { en: 'Sooji (Semolina)', hi: 'सूजी', unit: '500 G' },
      { en: 'Poha (Flattened Rice)', hi: 'पोहा', unit: '500 G' },
    ],
  },
  {
    id: 'dals',
    emoji: '🥣',
    name: 'Dals & Pulses',
    hindi: 'दालें',
    items: [
      { en: 'Toor / Arhar Dal', hi: 'तूर / अरहर दाल', unit: '1 KG' },
      { en: 'Moong Dal', hi: 'मूंग दाल', unit: '1 KG' },
      { en: 'Chana Dal', hi: 'चना दाल', unit: '1 KG' },
      { en: 'Rajma (Kidney Beans)', hi: 'राजमा', unit: '500 G' },
      { en: 'Kabuli Chana', hi: 'काबुली चना', unit: '500 G' },
    ],
  },
  {
    id: 'spices',
    emoji: '🌶️',
    name: 'Spices & Masala',
    hindi: 'मसाले',
    items: [
      { en: 'Haldi (Turmeric)', hi: 'हल्दी', unit: '200 G' },
      { en: 'Lal Mirch (Red Chili)', hi: 'लाल मिर्च', unit: '200 G' },
      { en: 'Dhaniya Powder', hi: 'धनिया पाउडर', unit: '100 G' },
      { en: 'Garam Masala', hi: 'गरम मसाला', unit: '50 G' },
      { en: 'Mustard Seeds', hi: 'राई', unit: '100 G' },
    ],
  },
  {
    id: 'oils',
    emoji: '🛢️',
    name: 'Oils & Ghee',
    hindi: 'तेल और घी',
    items: [
      { en: 'Desi Ghee', hi: 'देसी घी', unit: '500 ML' },
      { en: 'Mustard Oil', hi: 'सरसों का तेल', unit: '1 L' },
      { en: 'Sunflower Oil', hi: 'सूरजमुखी तेल', unit: '1 L' },
      { en: 'Refined Oil', hi: 'रिफाइंड तेल', unit: '1 L' },
    ],
  },
  {
    id: 'pooja',
    emoji: '🪔',
    name: 'Pooja Needs',
    hindi: 'पूजा सामग्री',
    items: [
      { en: 'Camphor (Kapur)', hi: 'भीमसेनी कपूर', unit: '1 PKT' },
      { en: 'Agarbatti (Incense)', hi: 'अगरबत्ती', unit: '2 PKT' },
      { en: 'Diya Oil', hi: 'दीया का तेल', unit: '500 ML' },
      { en: 'Cotton Wicks', hi: 'रूई बत्ती', unit: '1 PKT' },
      { en: 'Roli / Kumkum', hi: 'रोली / कुमकुम', unit: '1 PKT' },
    ],
  },
  {
    id: 'dairy',
    emoji: '🥛',
    name: 'Dairy & Bakery',
    hindi: 'दूध और बेकरी',
    items: [
      { en: 'Fresh Milk', hi: 'ताज़ा दूध', unit: '1 L' },
      { en: 'Paneer', hi: 'पनीर', unit: '200 G' },
      { en: 'Curd / Dahi', hi: 'दही', unit: '400 G' },
      { en: 'Butter', hi: 'मक्खन', unit: '100 G' },
      { en: 'Bread', hi: 'ब्रेड', unit: '1 PKT' },
    ],
  },
];

export default function CategoryExplorer() {
  const [activeTab, setActiveTab] = useState('grains');
  const activeCategory = categoryData.find((c) => c.id === activeTab) || categoryData[0];

  return (
    <section className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-cream">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-[0.12em] mb-3">Catalog</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-[-0.02em] mb-3">
              Explore Our Pantry Catalog
            </h2>
            <p className="text-[15px] text-slate/45 max-w-md mx-auto leading-relaxed">
              100+ pre-filled items with bilingual names in English and Hindi.
            </p>
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-8 justify-start lg:justify-center scrollbar-hide">
            {categoryData.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-[13px] font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === cat.id
                    ? 'bg-emerald text-white shadow-sm shadow-emerald/15'
                    : 'bg-white text-slate/50 border border-black/[0.06] hover:border-emerald/25 hover:text-emerald'
                }`}
              >
                <span className="text-sm">{cat.emoji}</span>
                {cat.name}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-black/[0.04] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
            <div className="px-6 sm:px-8 py-5 border-b border-black/[0.04]">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{activeCategory.emoji}</span>
                <div>
                  <h3 className="text-base font-bold text-slate tracking-[-0.01em]">{activeCategory.name}</h3>
                  <span className="text-[13px] text-slate/35" style={{ fontFamily: 'var(--font-hindi)' }}>{activeCategory.hindi}</span>
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-1">
                {activeCategory.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-black/[0.02] transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald/[0.05] flex items-center justify-center text-sm flex-shrink-0">
                      {activeCategory.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[13px] font-medium text-slate truncate">{item.en}</div>
                      <div className="text-[11px] text-slate/35" style={{ fontFamily: 'var(--font-hindi)' }}>{item.hi}</div>
                    </div>
                    <span className="text-[10px] font-medium text-slate/30 bg-black/[0.03] px-2 py-0.5 rounded-full whitespace-nowrap">{item.unit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
