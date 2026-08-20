'use client';

import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CATEGORIES, INDIAN_PANTRY_CATALOG } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function CategoryExplorer() {
  const { lang } = useLanguage();
  const explorerCategories = CATEGORIES.filter((c) => c.id !== 'all');

  return (
    <section id="categories" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-cream/40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="mint" className="mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'भारतीय पेंट्री एक्सप्लोरर' : 'Catalog Explorer'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight mb-3">
              {lang === 'hi' ? 'भारतीय रसोई का संपूर्ण कैटलॉग' : 'Explore Indian Pantry Categories'}
            </h2>
            <p className="text-base text-slate/50 max-w-md mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'अनाज, दालों, मसालों से लेकर पूजा सामग्री तक हर वस्तु की द्विभाषी सूची देखिये।'
                : 'Discover pre-filled items with authentic English and Hindi names across all 6 Indian household categories.'}
            </p>
          </div>

          <Tabs defaultValue="grains" className="w-full">
            {/* Category Tabs */}
            <div className="flex justify-center mb-8 overflow-x-auto pb-2">
              <TabsList className="bg-white border border-slate/10 p-1.5 rounded-2xl shadow-sm">
                {explorerCategories.map((cat) => (
                  <TabsTrigger
                    key={cat.id}
                    value={cat.id}
                    className="gap-2 px-4 py-2 text-xs font-bold rounded-xl data-[state=active]:bg-emerald data-[state=active]:text-white transition-all"
                  >
                    <span>{cat.icon}</span>
                    <span>{lang === 'hi' ? cat.label_hi : cat.label_en}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {/* Category Content */}
            {explorerCategories.map((cat) => {
              const catItems = INDIAN_PANTRY_CATALOG.filter((item) =>
                item.category.toLowerCase().includes(cat.id)
              );

              return (
                <TabsContent key={cat.id} value={cat.id} className="focus:outline-none">
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {catItems.map((item) => (
                      <Card
                        key={item.id}
                        className="bg-white border-slate/10 hover:border-emerald/30 hover:shadow-lg transition-all duration-200 p-4 group cursor-default"
                      >
                        <div className="flex items-start gap-3.5">
                          {/* Item Icon */}
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                            {item.icon}
                          </div>

                          {/* Item Details */}
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-bold text-slate truncate group-hover:text-emerald transition-colors">
                              {item.name_en}
                            </h4>
                            <p
                              className="text-xs text-slate/50 font-medium truncate mt-0.5"
                              style={{ fontFamily: 'var(--font-hindi)' }}
                            >
                              {item.name_hi}
                            </p>
                          </div>
                        </div>

                        {/* Price & Quantity Row */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate/5">
                          <span className="text-[10px] font-semibold text-slate/40 uppercase tracking-wide">
                            Standard: {item.default_qty} {item.unit}
                          </span>
                          <span className="text-xs font-extrabold text-emerald">
                            ₹{Math.round(item.price_per_unit * item.default_qty)}
                          </span>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
