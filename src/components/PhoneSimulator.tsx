'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, Plus, Minus, Share2, Copy, Check, Wifi, Battery, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { INDIAN_PANTRY_CATALOG, CATEGORIES, INVENTORY_LISTS } from '@/lib/data';
import IPhoneMockup from '@/components/IPhoneMockup';
import AndroidMockup from '@/components/AndroidMockup';
import { useLanguage } from '@/context/LanguageContext';

interface CartItem {
  id: string;
  qty: number;
}

export default function PhoneSimulator() {
  const { lang } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeList, setActiveList] = useState('monthly');
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', qty: 1 }, // Aashirvaad Atta
    { id: '2', qty: 1 }, // Toor Dal
    { id: '3', qty: 1 }, // Everest Turmeric
  ]);
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return INDIAN_PANTRY_CATALOG.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category.toLowerCase().includes(activeCategory);
      const matchesSearch =
        !searchQuery ||
        item.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name_hi.includes(searchQuery);
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
      if (!product) return sum;
      return sum + product.price_per_unit * product.default_qty * item.qty;
    }, 0);
  }, [cart]);

  const formatWhatsAppMessage = useCallback(() => {
    const listName =
      INVENTORY_LISTS.find((l) => l.id === activeList)?.[
        lang === 'hi' ? 'label_hi' : 'label_en'
      ] || 'Kirana Order';

    const lines = cart
      .map((item, i) => {
        const product = INDIAN_PANTRY_CATALOG.find((p) => p.id === item.id);
        if (!product) return '';
        const name = lang === 'hi' ? product.name_hi : product.name_en;
        const total = Math.round(product.price_per_unit * product.default_qty * item.qty);
        const qtyDisplay = `${product.default_qty * item.qty} ${product.unit}`;
        return `${i + 1}. ${name}: ${qtyDisplay} — ₹${total}`;
      })
      .filter(Boolean);

    return `🛒 *Gharkilist — ${listName}*\n-----------------------------\n${lines.join(
      '\n'
    )}\n-----------------------------\n💵 *Estimated Total: ₹${Math.round(
      cartTotal
    )}*\n📍 Please deliver to my address. Thank you!`;
  }, [cart, cartTotal, activeList, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const [deviceType, setDeviceType] = useState<'ios' | 'android'>('ios');

  const selectedCount = cart.length;

  const renderAppScreen = () => (
    <div className="w-full h-full bg-slate-50 flex flex-col p-3.5 pt-2">
      {/* App Navigation & Header */}
      <div className="px-1 pt-1 pb-2 bg-slate-50 border-b border-slate-200/60">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <img src="/logo.svg" alt="Gharkilist Logo" className="w-5.5 h-5.5 object-contain" />
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-extrabold text-slate tracking-tight">
                ghark<span className="text-mint">i</span>list
              </span>
              <span className="text-[7.5px] text-slate/40 font-semibold" style={{ fontFamily: 'var(--font-hindi)' }}>
                घर की लिस्ट
              </span>
            </div>
          </div>

          {/* Multi-Inventory List Switcher */}
          <div className="flex bg-slate-200/50 p-0.5 rounded-lg border border-slate-200/60 overflow-x-auto max-w-[170px] scrollbar-none">
            {INVENTORY_LISTS.map((list) => (
              <button
                key={list.id}
                onClick={() => setActiveList(list.id)}
                className={`px-2 py-0.5 rounded-md text-[8.5px] font-bold whitespace-nowrap transition-all ${
                  activeList === list.id
                    ? 'bg-emerald text-white shadow-2xs'
                    : 'text-slate/60 hover:text-slate'
                }`}
              >
                {lang === 'hi' ? list.label_hi : list.label_en}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-2">
          <Search className="w-3 h-3 text-slate/40 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={lang === 'hi' ? 'सामान खोजें (जैसे आटा, दाल, तेल)...' : 'Search items (e.g. Atta, Dal, Oil)...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-[10px] rounded-lg bg-white border border-slate-200/80 outline-none focus:border-emerald text-slate placeholder:text-slate/40 font-sans shadow-2xs"
          />
        </div>

        {/* Category Pill Tabs */}
        <div className="flex gap-1 overflow-x-auto pb-0.5 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-0.5 rounded-full text-[9px] font-semibold whitespace-nowrap transition-colors border ${
                activeCategory === cat.id
                  ? 'bg-emerald text-white border-emerald'
                  : 'bg-white text-slate/60 border-slate-250 hover:border-slate/30'
              }`}
            >
              <span className="mr-1">{cat.icon}</span>
              {lang === 'hi' ? cat.label_hi : cat.label_en}
            </button>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="flex-1 overflow-y-auto px-1 py-2 space-y-1.5 bg-slate-50/50 scrollbar-none">
        {filteredItems.map((item) => {
          const qty = getQty(item.id);
          const unitPrice = Math.round(item.price_per_unit * item.default_qty);
          return (
            <div
              key={item.id}
              className={`p-2 rounded-xl border transition-all duration-200 flex items-center justify-between ${
                qty > 0
                  ? 'bg-emerald/[0.03] border-emerald/20 shadow-2xs'
                  : 'bg-white border-slate-200/60 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate leading-tight">
                    {lang === 'hi' ? item.name_hi : item.name_en}
                  </div>
                  <div className="text-[8px] text-slate/50 flex items-center gap-1 mt-0.5">
                    <span>{item.default_qty} {item.unit}</span>
                    <span>&middot;</span>
                    <span className="font-semibold text-emerald">₹{unitPrice}</span>
                  </div>
                </div>
              </div>

              {/* Steppers */}
              {qty === 0 ? (
                <button
                  onClick={() => updateQty(item.id, 1)}
                  className="w-6.5 h-6.5 rounded-lg border border-slate/20 bg-white flex items-center justify-center text-slate hover:border-emerald hover:text-emerald transition-all shadow-2xs active:scale-90"
                >
                  <Plus className="w-3 h-3" />
                </button>
              ) : (
                <div className="flex items-center gap-1 bg-white border border-emerald/20 rounded-lg p-0.5 shadow-2xs">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="w-5.5 h-5.5 rounded-md bg-emerald/10 text-emerald flex items-center justify-center font-bold hover:bg-emerald/20 transition-colors"
                  >
                    <Minus className="w-2.5 h-2.5" />
                  </button>
                  <span className="w-3 text-center text-[10px] font-bold text-slate">
                    {qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="w-5.5 h-5.5 rounded-md bg-emerald text-white flex items-center justify-center font-bold hover:bg-emerald-light transition-colors"
                  >
                    <Plus className="w-2.5 h-2.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Real-time Budget & Action Footer */}
      <div className="p-2 border-t border-slate-200/60 bg-white shadow-xs rounded-b-xl">
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-[9px] font-bold text-slate/50">
            {selectedCount} {lang === 'hi' ? 'सामान चुना गया' : 'Items Selected'}
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-[8px] text-slate/40 uppercase font-semibold">Total:</span>
            <span className="text-[13px] font-black text-emerald">₹{Math.round(cartTotal)}</span>
          </div>
        </div>

        <Button
          onClick={() => setShowWhatsAppModal(true)}
          disabled={selectedCount === 0}
          variant="whatsapp"
          size="sm"
          className="w-full text-[10px] font-extrabold tracking-wide uppercase gap-1.5 py-1.5 shadow-sm shadow-whatsapp/10 rounded-lg"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span>{lang === 'hi' ? 'WhatsApp पर लिस्ट भेजें' : 'Share List on WhatsApp'}</span>
        </Button>
      </div>
    </div>
  );

  return (
    <section id="demo" className="relative border-b border-slate-100">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-[#FAF9F5]/40 relative overflow-hidden">
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge variant="mint" className="mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
              {lang === 'hi' ? 'इंटरएक्टिव लाइव सिम्युलेटर' : 'Interactive App Simulator'}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-tight mb-3">
              {lang === 'hi' ? 'खुद आज़माकर देखें' : 'Experience Gharkilist Live'}
            </h2>
            <p className="text-base text-slate/50 max-w-md mx-auto leading-relaxed">
              {lang === 'hi'
                ? 'सामान जोड़ें, मात्रा बदलें और ₹ में बजट की लाइव गणना देखें। 1-टैप में WhatsApp लिस्ट एक्सपोर्ट करें।'
                : 'Add pantry stock, adjust quantities, watch total budget update in ₹, and preview the WhatsApp export in real-time.'}
            </p>

            {/* iOS vs Android Toggle Buttons */}
            <div className="flex justify-center items-center gap-2.5 mt-6">
              <button
                onClick={() => setDeviceType('ios')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  deviceType === 'ios'
                    ? 'bg-emerald text-white border-emerald shadow-xs'
                    : 'bg-white text-slate/60 border-slate-200 hover:text-slate'
                }`}
              >
                Apple iOS
              </button>
              <button
                onClick={() => setDeviceType('android')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  deviceType === 'android'
                    ? 'bg-emerald text-white border-emerald shadow-xs'
                    : 'bg-white text-slate/60 border-slate-200 hover:text-slate'
                }`}
              >
                Google Android
              </button>
            </div>
          </div>

          <div className="flex justify-center">
            {deviceType === 'ios' ? (
              <IPhoneMockup height="h-[600px] sm:h-[650px]" className="scale-95 sm:scale-100 transition-all duration-300">
                {/* iOS Status Bar */}
                <div className="pt-3.5 px-6 pb-1 bg-white text-slate-800 flex items-center justify-between text-[10px] font-bold select-none z-30">
                  <span className="font-semibold">9:41</span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="text-[8px] font-extrabold text-emerald">5G</span>
                    <Wifi className="w-3.5 h-3.5 text-slate-700" />
                    <Battery className="w-4.5 h-3.5 text-slate-700" />
                  </div>
                </div>
                {renderAppScreen()}
              </IPhoneMockup>
            ) : (
              <AndroidMockup height="h-[600px] sm:h-[650px]" className="scale-95 sm:scale-100 transition-all duration-300">
                {/* Android Status Bar */}
                <div className="pt-3 px-6 pb-1 bg-white text-slate-800 flex items-center justify-between text-[10px] font-bold select-none z-30">
                  <span className="font-semibold">09:41</span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Wifi className="w-3.5 h-3.5 text-slate-700" />
                    <Battery className="w-4.5 h-3.5 text-slate-700" />
                  </div>
                </div>
                {renderAppScreen()}
              </AndroidMockup>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Export Modal */}
      <Dialog open={showWhatsAppModal} onOpenChange={setShowWhatsAppModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-emerald">
              <MessageSquare className="w-5 h-5 text-whatsapp" />
              <span>{lang === 'hi' ? 'WhatsApp किराना लिस्ट एक्सपोर्ट' : 'WhatsApp Kirana Export Preview'}</span>
            </DialogTitle>
            <DialogDescription>
              {lang === 'hi'
                ? 'यह संदेश सीधे आपके स्थानीय किराना स्टोर के WhatsApp पर भेजा जाएगा:'
                : 'This auto-formatted message will be sent directly to your local Kirana store:'}
            </DialogDescription>
          </DialogHeader>

          <div className="bg-[#DCF8C6]/60 border border-emerald/20 rounded-2xl p-4 my-2 relative font-sans shadow-inner">
            <Badge variant="whatsapp" className="absolute top-2 right-2 text-[9px]">
              Ready to Send
            </Badge>
            <pre className="text-xs text-slate whitespace-pre-wrap leading-relaxed font-mono">
              {formatWhatsAppMessage()}
            </pre>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              variant="outline"
              onClick={handleCopy}
              className="flex-1 gap-2 border-slate/20"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald" />
                  <span className="text-emerald font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate/60" />
                  <span>Copy Text</span>
                </>
              )}
            </Button>

            <Button
              variant="whatsapp"
              onClick={() => {
                const text = encodeURIComponent(formatWhatsAppMessage());
                window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
              }}
              className="flex-1 gap-2 shadow-md shadow-whatsapp/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Open in WhatsApp</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
