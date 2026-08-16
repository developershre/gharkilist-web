'use client';

import { useState, useMemo, useCallback } from 'react';
import { INDIAN_PANTRY_CATALOG, CATEGORIES } from '@/lib/data';

interface CartItem {
  id: string;
  qty: number;
}

export default function PhoneSimulator() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return INDIAN_PANTRY_CATALOG.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category.toLowerCase().includes(activeCategory);
      const matchesSearch = !searchQuery || item.name_en.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const getQty = useCallback((id: string) => cart.find((c) => c.id === id)?.qty || 0, [cart]);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === id);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter((c) => c.id !== id);
        return prev.map((c) => (c.id === id ? { ...c, qty: newQty } : c));
      }
      if (delta > 0) return [...prev, { id, qty: 1 }];
      return prev;
    });
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = INDIAN_PANTRY_CATALOG.find((p) => p.id === item.id);
      return sum + (product ? product.price_per_unit * product.default_qty * item.qty : 0);
    }, 0);
  }, [cart]);

  const formatWhatsAppMessage = useCallback(() => {
    const lines = cart.map((item, i) => {
      const product = INDIAN_PANTRY_CATALOG.find((p) => p.id === item.id);
      if (!product) return '';
      const total = product.price_per_unit * product.default_qty * item.qty;
      return `${i + 1}. ${product.name_en}: ${product.default_qty * item.qty} ${product.unit} - ₹${Math.round(total)}`;
    }).filter(Boolean);
    return `🛒 *Gharkilist — Kirana Order*\n-----------------------------\n${lines.join('\n')}\n-----------------------------\n💵 *Estimated Total: ₹${Math.round(cartTotal)}*\n📍 Please deliver to my address. Thank you!`;
  }, [cart, cartTotal]);

  const selectedCount = cart.length;

  return (
    <section id="demo" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-[0.12em] mb-3">Interactive Demo</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-[-0.02em] mb-3">
              Try It Right Now
            </h2>
            <p className="text-[15px] text-slate/45 max-w-md mx-auto leading-relaxed">
              Add items, adjust quantities, and see the WhatsApp export in action.
            </p>
          </div>

          <div className="flex justify-center">
            <div className="relative w-[340px] sm:w-[380px] h-[700px] sm:h-[750px] rounded-[44px] bg-slate p-[10px] phone-glow" style={{ perspective: '1200px' }}>
              <div className="w-full h-full rounded-[36px] bg-white overflow-hidden flex flex-col relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-5 bg-slate rounded-b-xl z-10" />

                <div className="px-4 pt-8 pb-3 border-b border-black/[0.04]">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-md bg-emerald flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-white">
                          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2.5"/>
                        </svg>
                      </div>
                      <span className="text-[11px] font-bold text-slate">ghark<span className="text-mint">i</span>list</span>
                    </div>
                    <button className="w-7 h-7 rounded-md bg-gray-50 flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
                        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>
                      </svg>
                    </button>
                  </div>

                  <div className="bg-gray-50 rounded-lg px-2.5 py-2 flex items-center gap-1.5 mb-2.5">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#bbb" strokeWidth="2">
                      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                      type="text"
                      placeholder="Search items (e.g. Atta, Rice...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent text-[11px] text-slate outline-none w-full placeholder:text-gray-400"
                    />
                  </div>

                  <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-2.5 py-1 rounded-md text-[10px] font-medium whitespace-nowrap transition-colors ${
                          activeCategory === cat.id
                            ? 'bg-emerald text-white'
                            : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        }`}
                      >
                        {cat.icon} {cat.label_en}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto px-3.5 py-2.5 space-y-1">
                  {filteredItems.map((item) => {
                    const qty = getQty(item.id);
                    return (
                      <div key={item.id} className="border border-black/[0.04] rounded-lg p-2.5 flex items-center gap-2.5 hover:border-black/[0.08] transition-colors">
                        <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-base flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-semibold text-slate truncate">{item.name_en}</div>
                          <div className="text-[9px] text-gray-400">{item.default_qty} {item.unit}</div>
                        </div>
                        {qty === 0 ? (
                          <button
                            onClick={() => updateQty(item.id, 1)}
                            className="w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-emerald hover:text-emerald transition-colors"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          </button>
                        ) : (
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => updateQty(item.id, -1)}
                              className="stepper-btn bg-emerald/10 text-emerald"
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                            <span className="text-[10px] font-bold text-slate w-3 text-center">{qty}</span>
                            <button
                              onClick={() => updateQty(item.id, 1)}
                              className="stepper-btn bg-emerald text-white"
                            >
                              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="px-3.5 py-3 border-t border-black/[0.04] bg-white">
                  <div className="flex items-center justify-between mb-2 text-[10px] text-gray-500">
                    <span>{selectedCount} items selected</span>
                    <span className="font-bold text-emerald text-[13px]">₹{Math.round(cartTotal)}</span>
                  </div>
                  <button
                    onClick={() => setShowWhatsApp(true)}
                    disabled={selectedCount === 0}
                    className={`w-full py-2.5 rounded-lg flex items-center justify-center gap-2 text-[12px] font-semibold transition-colors ${
                      selectedCount > 0
                        ? 'bg-whatsapp text-white hover:bg-whatsapp/90'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Share on WhatsApp
                  </button>
                </div>

                {showWhatsApp && (
                  <div className="absolute inset-0 bg-black/30 rounded-[36px] flex items-end p-4 z-20 animate-fade-in">
                    <div className="bg-white rounded-2xl p-5 w-full animate-slide-up">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[13px] font-bold text-slate">WhatsApp Preview</h3>
                        <button onClick={() => setShowWhatsApp(false)} className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                      <div className="bg-[#dcf8c6] rounded-xl p-4 mb-4 max-h-64 overflow-y-auto">
                        <pre className="text-[10px] text-slate whitespace-pre-wrap font-sans leading-relaxed">{formatWhatsAppMessage()}</pre>
                      </div>
                      <button className="w-full py-2.5 rounded-lg bg-whatsapp text-white text-[12px] font-semibold flex items-center justify-center gap-2 hover:bg-whatsapp/90 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        Open in WhatsApp
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
