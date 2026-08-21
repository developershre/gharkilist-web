'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, Plus, Minus, Share2, Copy, Check, Wifi, Battery, MessageSquare, Settings, Trash2, Edit3, GripVertical, SlidersHorizontal, ArrowLeft, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import IPhoneMockup from '@/components/IPhoneMockup';
import AndroidMockup from '@/components/AndroidMockup';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';


interface CartItem {
  id: string;
  qty: number;
}

// Custom dataset matching screenshots perfectly
const SIMULATOR_ITEMS = [
  { id: '1', name_en: 'Basmati Rice', name_hi: 'बासमती चावल', category: 'Grains & Flours', unit: 'kg', default_qty: 1, type: 'rice', price: 110, isIllustration: true, imgColor: 'bg-amber-50' },
  { id: '2', name_en: 'Flattened Rice', name_hi: 'पोहा / चिउड़ा', category: 'Grains & Flours', unit: 'g', default_qty: 500, type: 'wheat', price: 40, isIllustration: false, imgColor: 'bg-amber-500/10' },
  { id: '3', name_en: 'Kolam', name_hi: 'कोलम चावल', category: 'Grains & Flours', unit: 'kg', default_qty: 1, type: 'rice', price: 90, isIllustration: true, imgColor: 'bg-amber-50' },
  { id: '4', name_en: 'Semolina', name_hi: 'सूजी / रवा', category: 'Grains & Flours', unit: 'g', default_qty: 500, type: 'wheat', price: 45, isIllustration: false, imgColor: 'bg-amber-500/10' },
  
  // Catalog items (Image 1)
  { id: '5', name_en: 'Dishwash Soap', name_hi: 'बर्तन धोने का साबुन', category: 'Cleaning Essentials', unit: 'pcs', default_qty: 1, type: 'droplet', price: 20, isIllustration: false, imgColor: 'bg-sky-50' },
  { id: '6', name_en: 'Floor Disinfectant Cleaner', name_hi: 'फर्श साफ करने वाला तरल', category: 'Cleaning Essentials', unit: 'L', default_qty: 1, type: 'droplet', price: 120, isIllustration: false, imgColor: 'bg-sky-50' },
  { id: '7', name_en: 'Toilet Cleaner', name_hi: 'टॉयलेट क्लीनर', category: 'Cleaning Essentials', unit: 'L', default_qty: 1, type: 'droplet', price: 85, isIllustration: false, imgColor: 'bg-sky-50' },
  { id: '8', name_en: 'Washing Powder', name_hi: 'कपड़े धोने का पाउडर', category: 'Cleaning Essentials', unit: 'kg', default_qty: 1, type: 'droplet', price: 140, isIllustration: false, imgColor: 'bg-sky-50' },
  { id: '9', name_en: 'Fresh Cottage Cheese', name_hi: 'ताज़ा पनीर', category: 'Dairy & Bakery', unit: 'g', default_qty: 200, type: 'cheese', price: 90, isIllustration: false, imgColor: 'bg-blue-50' },
  { id: '10', name_en: 'Fresh Cream', name_hi: 'ताजी मलाई', category: 'Dairy & Bakery', unit: 'g', default_qty: 250, type: 'cow', price: 110, isIllustration: false, imgColor: 'bg-blue-50' },
  { id: '11', name_en: 'Fresh Curd', name_hi: 'ताजा दही', category: 'Dairy & Bakery', unit: 'g', default_qty: 400, type: 'cow', price: 45, isIllustration: false, imgColor: 'bg-blue-50' },
  { id: '12', name_en: 'Fresh Milk Packet', name_hi: 'ताजा दूध पैकेट', category: 'Dairy & Bakery', unit: 'L', default_qty: 1, type: 'milk', price: 66, isIllustration: false, imgColor: 'bg-blue-50' },
  { id: '13', name_en: 'Sandwich Bread', name_hi: 'सैंडविच ब्रेड', category: 'Dairy & Bakery', unit: 'pcs', default_qty: 1, type: 'bread', price: 45, isIllustration: false, imgColor: 'bg-blue-50' },
  { id: '14', name_en: 'Tea Rusk', name_hi: 'चाय टोस्ट / रस्क', category: 'Dairy & Bakery', unit: 'pkt', default_qty: 1, type: 'cow', price: 40, isIllustration: false, imgColor: 'bg-blue-50' },
];

const CATALOG_CATEGORIES = [
  { id: 'all', label_en: 'All', label_hi: 'सभी', icon: '📋' },
  { id: 'cleaning', label_en: 'Cleaning Essentials', label_hi: 'सफाई सामग्री', icon: '🧴' },
  { id: 'dairy', label_en: 'Dairy & Bakery', label_hi: 'डेयरी व बेकरी', icon: '🥛' },
  { id: 'grains', label_en: 'Dals & Pulses', label_hi: 'दालें और अनाज', icon: '🌾' },
];

const INVENTORY_PILLS = [
  { id: 'monthly', label_en: 'Monthly', label_hi: 'मासिक' },
  { id: 'rakhi', label_en: 'Rakhi', label_hi: 'राखी' },
  { id: 'diwali', label_en: 'Diwali', label_hi: 'दिवाली' },
  { id: 'puja', label_en: 'puja ka list', label_hi: 'पूजा की लिस्ट' },
  { id: 'medical', label_en: 'medical', label_hi: 'मेडिकल' },
];

export default function PhoneSimulator() {
  const { lang } = useLanguage();
  const [deviceType, setDeviceType] = useState<'ios' | 'android'>('ios');
  
  // Navigation screen states
  const [currentScreen, setCurrentScreen] = useState<'list' | 'catalog'>('list');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePill, setActivePill] = useState('monthly');
  
  // Cart state storing active items in "Monthly" list
  const [cart, setCart] = useState<CartItem[]>([
    { id: '1', qty: 1 }, // Basmati Rice
    { id: '2', qty: 1 }, // Flattened Rice
    { id: '3', qty: 1 }, // Kolam
    { id: '4', qty: 1 }, // Semolina
  ]);
  
  const [showWhatsAppModal, setShowWhatsAppModal] = useState(false);
  const [showAddSheet, setShowAddSheet] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Items visible inside the current active inventory list
  const currentListItems = useMemo(() => {
    return cart.map(cartItem => {
      const item = SIMULATOR_ITEMS.find(p => p.id === cartItem.id);
      return item ? { ...item, qty: cartItem.qty } : null;
    }).filter(Boolean);
  }, [cart]);

  // Catalog items filtered by selected category and search query
  const filteredCatalogItems = useMemo(() => {
    return SIMULATOR_ITEMS.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || 
        (activeCategory === 'cleaning' && item.category === 'Cleaning Essentials') ||
        (activeCategory === 'dairy' && item.category === 'Dairy & Bakery') ||
        (activeCategory === 'grains' && item.category === 'Grains & Flours');
      
      const matchesSearch =
        !searchQuery ||
        item.name_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.name_hi.includes(searchQuery);
        
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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

  const deleteItem = useCallback((id: string) => {
    setCart(prev => prev.filter(c => c.id !== id));
  }, []);

  const addToCartFromCatalog = useCallback((id: string) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === id);
      if (existing) {
        return prev.map(c => c.id === id ? { ...c, qty: c.qty + 1 } : c);
      }
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((sum, item) => {
      const product = SIMULATOR_ITEMS.find((p) => p.id === item.id);
      if (!product) return sum;
      return sum + product.price * item.qty;
    }, 0);
  }, [cart]);

  const formatWhatsAppMessage = useCallback(() => {
    const listName = INVENTORY_PILLS.find(p => p.id === activePill)?.[lang === 'hi' ? 'label_hi' : 'label_en'] || 'Order';
    const lines = cart
      .map((item, i) => {
        const product = SIMULATOR_ITEMS.find((p) => p.id === item.id);
        if (!product) return '';
        const name = lang === 'hi' ? product.name_hi : product.name_en;
        const qtyVal = product.default_qty * item.qty;
        return `${i + 1}. ${name}: ${qtyVal} ${product.unit}`;
      })
      .filter(Boolean);

    const footerMsg = lang === 'hi' ? '📍 कृपया मेरे पते पर भेजें। धन्यवाद!' : '📍 Please deliver to my address. Thank you!';
    return `🛒 *Gharkilist — ${listName}*\n-----------------------------\n${lines.join('\n')}\n-----------------------------\n${footerMsg}`;
  }, [cart, activePill, lang]);

  const handleCopy = () => {
    navigator.clipboard.writeText(formatWhatsAppMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Helper to render customized blue icons matching Image 1
  const renderItemIcon = (type: string) => {
    const blueBg = "w-8.5 h-8.5 rounded-full bg-[#E0F7FA] border border-[#B2EBF2] flex items-center justify-center flex-shrink-0";
    
    if (type === 'droplet') {
      return (
        <div className={blueBg}>
          <svg className="w-4.5 h-4.5 text-[#00ACC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      );
    }
    if (type === 'cow') {
      return (
        <div className={blueBg}>
          <svg className="w-4.5 h-4.5 text-[#00ACC1]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
      );
    }
    if (type === 'milk') {
      return (
        <div className={blueBg}>
          <svg className="w-4.5 h-4.5 text-[#00ACC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2zM9 5V3h6v2" />
          </svg>
        </div>
      );
    }
    if (type === 'bread') {
      return (
        <div className={blueBg}>
          <svg className="w-4.5 h-4.5 text-[#00ACC1]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.06 2.06c-1.34-1.34-3.52-.39-3.52 1.5V5H9.46c0-1.89-2.18-2.84-3.52-1.5-1.34 1.34-.39 3.52 1.5 3.52v2.46c-1.89 0-2.84 2.18-1.5 3.52 1.34 1.34 3.52.39 3.52-1.5H12v2.46c-1.89 0-2.84 2.18-1.5 3.52 1.34 1.34 3.52.39 3.52-1.5h1.52v2.06c0 1.89 2.18 2.84 3.52 1.5 1.34-1.34.39-3.52-1.5-3.52V12h2.54c1.89 0 2.84-2.18 1.5-3.52-1.34-1.34-3.52-.39-3.52 1.5H12V7.54c1.89 0 2.84-2.18 1.5-3.52z" />
          </svg>
        </div>
      );
    }
    if (type === 'cheese') {
      return (
        <div className={blueBg}>
          <svg className="w-4.5 h-4.5 text-[#00ACC1]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
      );
    }
    return (
      <div className="w-8.5 h-8.5 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-xs flex-shrink-0">
        🌾
      </div>
    );
  };

  const renderAppScreen = () => {
    if (currentScreen === 'list') {
      // Monthly List Screen (Image 2)
      return (
        <div className="w-full h-full bg-white flex flex-col p-3.5 pt-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5 pb-1">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Gharkilist Logo" className="w-6.5 h-6.5 object-contain" />
              <span className="text-[14px] font-bold text-slate-800 tracking-tight font-sans">
                gharki<span className="text-[#03B459]">list</span>
              </span>
            </div>
            <Settings className="w-4.5 h-4.5 text-slate-650 cursor-pointer" />
          </div>

          {/* Search bar */}
          <div className="relative mb-3">
            <div className="w-full pl-8 pr-8 py-1.5 text-[10px] rounded-xl border border-slate-200 bg-[#FAF9F5]/40 text-slate-400 font-sans flex items-center justify-between">
              <span className="truncate">{lang === 'hi' ? 'खोजें' : 'Search'}</span>
              <SlidersHorizontal className="w-3 h-3 text-slate-400 absolute right-2.5" />
            </div>
            <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Inventory lists selector pills */}
          <div className="flex gap-1.5 mb-3 overflow-x-auto scrollbar-none relative">
            {INVENTORY_PILLS.map((pill) => (
              <span
                key={pill.id}
                onClick={() => setActivePill(pill.id)}
                className={`relative text-[9px] font-bold px-3.5 py-1.5 rounded-xl whitespace-nowrap cursor-pointer transition-all z-10 ${
                  activePill === pill.id
                    ? 'text-white'
                    : 'bg-[#FAF9F5] border border-slate-150 text-slate-650'
                }`}
              >
                {activePill === pill.id && (
                  <motion.span
                    layoutId="activeSimulatorPill"
                    className="absolute inset-0 bg-[#03B459] rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {lang === 'hi' ? pill.label_hi : pill.label_en}
              </span>
            ))}
          </div>

          {/* Items List */}
          <div className="flex-1 space-y-2.5 overflow-y-auto scrollbar-none">
            {currentListItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-4">
                <span className="text-2xl mb-1">🛒</span>
                <div className="text-[11px] font-bold text-slate-800">{lang === 'hi' ? 'आपकी सूची खाली है' : 'Your list is empty'}</div>
                <div className="text-[9px] text-slate-400 mt-0.5">{lang === 'hi' ? 'सामान जोड़ने के लिए + दबाएं' : 'Tap + below to add items'}</div>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {currentListItems.map((item: any) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className="bg-white rounded-2xl p-2.5 border border-slate-150 flex items-center justify-between shadow-2xs overflow-hidden"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <GripVertical className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      
                      <div className={`w-9 h-9 rounded-xl ${item.imgColor} border border-slate-100 flex items-center justify-center text-xs flex-shrink-0 overflow-hidden`}>
                        {item.isIllustration ? (
                          <svg className="w-5 h-5 text-amber-600/70" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5 2h14l1 3v15l-1 2H5l-1-2V5l1-3zm2 4h10v14H7V6z" />
                          </svg>
                        ) : (
                          <span className="text-sm">{item.icon || '🌾'}</span>
                        )}
                      </div>
                      
                      <div className="min-w-0">
                        <div className="text-[10.5px] font-bold text-slate-800 truncate font-sans">
                          {lang === 'hi' ? item.name_hi : item.name_en}
                        </div>
                        <div className="text-[8.5px] text-slate-400 font-sans mt-0.5">{item.qty} {item.unit}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {/* Stepper adjustment inside items list */}
                      <div className="flex items-center gap-1 border border-slate-100 rounded-lg p-0.5 bg-[#FAF9F5]">
                        <button 
                          onClick={() => updateQty(item.id, -1)}
                          className="w-5 h-5 rounded-md bg-white border border-slate-200 text-slate-650 flex items-center justify-center hover:bg-slate-50 transition-colors"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-3 text-center text-[9px] font-bold text-slate-800">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.id, 1)}
                          className="w-5 h-5 rounded-md bg-[#03B459] text-white flex items-center justify-center hover:bg-[#03B459]/90 transition-colors"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => deleteItem(item.id)}
                        className="w-6.5 h-6.5 rounded-lg border border-red-200 flex items-center justify-center bg-red-50 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3 h-3 text-red-500" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>

          {/* Bottom WhatsApp share & plus buttons */}
          <div className="mt-2.5 pt-2 border-t border-slate-100 flex gap-2">
            <button
              onClick={() => setShowWhatsAppModal(true)}
              disabled={cart.length === 0}
              className="flex-1 bg-[#03B459] hover:bg-[#03B459]/90 disabled:opacity-50 disabled:pointer-events-none rounded-xl py-2.5 px-3 flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-all duration-150 active:scale-98 text-white text-[9.5px] font-bold font-sans"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>{lang === 'hi' ? 'WhatsApp पर भेजें' : 'Share On WhatsApp'}</span>
            </button>
            <button 
              onClick={() => setShowAddSheet(true)}
              className="w-9 h-9 rounded-xl bg-[#03B459] hover:bg-[#03B459]/90 flex items-center justify-center text-white cursor-pointer active:scale-90 transition-all shadow-md flex-shrink-0"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      );
    } else {
      // Catalog Browser Screen (Image 1)
      return (
        <div className="w-full h-full bg-white flex flex-col p-3.5 pt-2">
          {/* Header */}
          <div className="flex items-center justify-between mb-2.5 pb-1">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setCurrentScreen('list')}
                className="w-6.5 h-6.5 rounded-lg hover:bg-slate-50 flex items-center justify-center transition-colors mr-0.5"
              >
                <ArrowLeft className="w-4.5 h-4.5 text-slate-800" />
              </button>
              <img src="/logo.png" alt="Gharkilist Logo" className="w-6 h-6 object-contain" />
              <span className="text-[13.5px] font-bold text-slate-800 tracking-tight font-sans">
                gharki<span className="text-[#03B459]">list</span>
              </span>
            </div>
            <Settings className="w-4.5 h-4.5 text-slate-650 cursor-pointer" />
          </div>

          {/* Search bar */}
          <div className="relative mb-3">
            <input
              type="text"
              placeholder={lang === 'hi' ? 'खोजें (जैसे आटा, चावल, साबुन)...' : 'Search items (e.g. Atta, Rice, Soap...)'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-[9.5px] rounded-xl border border-slate-200 outline-none focus:border-emerald text-slate placeholder:text-slate/40 font-sans shadow-2xs"
            />
            <svg className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Pill Tabs */}
          <div className="flex gap-1.5 mb-3 overflow-x-auto scrollbar-none">
            {CATALOG_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-[9px] font-bold whitespace-nowrap transition-colors border ${
                  activeCategory === cat.id
                    ? 'bg-[#03B459] text-white border-[#03B459]'
                    : 'bg-[#FAF9F5] text-slate-600 border-slate-150 hover:border-slate/20'
                }`}
              >
                {lang === 'hi' ? cat.label_hi : cat.label_en}
              </button>
            ))}
          </div>

          {/* Catalog Items list with blue circle icons and plus on the right (Image 1) */}
          <div className="flex-1 space-y-2.5 overflow-y-auto scrollbar-none">
            {filteredCatalogItems.length === 0 ? (
              <div className="text-center py-6 text-[10px] text-slate-400 font-sans">
                No items match search
              </div>
            ) : (
              filteredCatalogItems.map((item) => {
                const inList = cart.some(c => c.id === item.id);
                return (
                  <div key={item.id} className="bg-white rounded-2xl p-2.5 border border-slate-150 flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      {renderItemIcon(item.type)}
                      <div className="min-w-0">
                        <div className="text-[10px] font-bold text-slate-800 font-sans">
                          {lang === 'hi' ? item.name_hi : item.name_en}
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => addToCartFromCatalog(item.id)}
                      className={`w-6.5 h-6.5 rounded-full border border-slate-300 flex items-center justify-center hover:border-[#03B459] hover:bg-[#03B459]/5 transition-all active:scale-90 flex-shrink-0 ${
                        inList ? 'text-[#03B459] border-[#03B459] bg-[#03B459]/5' : 'text-slate-650'
                      }`}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <section id="demo" className="relative border-b border-slate-100">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-[#FAF9F5]/40 relative overflow-hidden">
        {/* Ambient Grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1.5px,transparent_1.5px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <Badge variant="mint" className="bg-[#03B459]/10 text-[#03B459] border border-[#03B459]/20 mb-3 px-3 py-1 text-[11px] font-bold uppercase tracking-wider">
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
                    ? 'bg-[#03B459] text-white border-[#03B459] shadow-xs'
                    : 'bg-white text-slate/60 border-slate-200 hover:text-slate'
                }`}
              >
                Apple iOS
              </button>
              <button
                onClick={() => setDeviceType('android')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all border ${
                  deviceType === 'android'
                    ? 'bg-[#03B459] text-white border-[#03B459] shadow-xs'
                    : 'bg-white text-slate/60 border-slate-200 hover:text-slate'
                }`}
              >
                Google Android
              </button>
            </div>
          </div>

          <div className="flex justify-center relative">
            {deviceType === 'ios' ? (
              <IPhoneMockup height="h-[600px] sm:h-[650px]" className="scale-95 sm:scale-100 transition-all duration-300">
                {/* iOS Status Bar */}
                <div className="pt-3.5 px-6 pb-1 bg-white text-slate-800 flex items-center justify-between text-[10px] font-bold select-none z-30">
                  <span className="font-semibold">2:56</span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <span className="text-[8px] font-extrabold text-[#03B459]">VoLTE 4G</span>
                    <Wifi className="w-3.5 h-3.5 text-slate-700" />
                    <Battery className="w-4.5 h-3.5 text-slate-700" />
                  </div>
                </div>
                
                {/* Interactive display frame content */}
                <div className="w-full h-full flex flex-col relative overflow-hidden bg-white">
                  {renderAppScreen()}
                  
                  {/* Sliding Bottom Sheet panel */}
                  {renderAddSheet()}
                </div>
              </IPhoneMockup>
            ) : (
              <AndroidMockup height="h-[600px] sm:h-[650px]" className="scale-95 sm:scale-100 transition-all duration-300">
                {/* Android Status Bar */}
                <div className="pt-3 px-6 pb-1 bg-white text-slate-800 flex items-center justify-between text-[10px] font-bold select-none z-30">
                  <span className="font-semibold">14:56</span>
                  <div className="flex items-center gap-1.5 text-slate-700">
                    <Wifi className="w-3.5 h-3.5 text-slate-700" />
                    <Battery className="w-4.5 h-3.5 text-slate-700" />
                  </div>
                </div>
                
                {/* Interactive display frame content */}
                <div className="w-full h-full flex flex-col relative overflow-hidden bg-white">
                  {renderAppScreen()}
                  
                  {/* Sliding Bottom Sheet panel */}
                  {renderAddSheet()}
                </div>
              </AndroidMockup>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Export Modal */}
      <Dialog open={showWhatsAppModal} onOpenChange={setShowWhatsAppModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-[#03B459]">
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
            <Badge variant="whatsapp" className="absolute top-2 right-2 text-[9px] bg-[#03B459]">
              Ready to Send
            </Badge>
            <pre className="text-xs text-slate-800 whitespace-pre-wrap leading-relaxed font-mono">
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
                  <span className="text-emerald font-bold">{lang === 'hi' ? 'कॉपी हो गया!' : 'Copied!'}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate/60" />
                  <span>{lang === 'hi' ? 'टेक्स्ट कॉपी करें' : 'Copy Text'}</span>
                </>
              )}
            </Button>

            <Button
              variant="whatsapp"
              onClick={() => {
                const text = encodeURIComponent(formatWhatsAppMessage());
                window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
              }}
              className="flex-1 gap-2 bg-[#03B459] hover:bg-[#03B459]/90 shadow-md shadow-whatsapp/20"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>{lang === 'hi' ? 'WhatsApp पर खोलें' : 'Open in WhatsApp'}</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );

  // Helper function to render sliding Bottom Sheet panel (Image 3)
  function renderAddSheet() {
    if (!showAddSheet) return null;
    
    return (
      <div className="absolute inset-0 bg-slate-900/60 z-50 flex flex-col justify-end">
        <div className="flex-1" onClick={() => setShowAddSheet(false)} />
        
        <div className="bg-white rounded-t-3xl p-5 border-t border-slate-100 flex flex-col gap-4 animate-slide-up shadow-2xl font-sans text-left">
          <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-1" />
          <h3 className="text-[12.5px] font-black text-slate-800 text-center uppercase tracking-wider">
            {lang === 'hi' ? 'सूची में सामान जोड़ें' : 'Add Item to Monthly'}
          </h3>
          
          <div className="flex flex-col gap-2.5">
            {/* Scan Photo Option */}
            <button className="flex items-center gap-3.5 p-3.5 bg-slate-50/50 hover:bg-slate-100/70 active:scale-[0.99] rounded-2xl border border-slate-100 text-left transition-all">
              <div className="w-9.5 h-9.5 bg-[#A8E6CF]/20 border border-[#03B459]/20 rounded-xl flex items-center justify-center text-[#03B459] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[11.5px] font-extrabold text-slate-800 leading-tight">
                  {lang === 'hi' ? 'फोटो स्कैन करें' : 'Scan Photo'}
                </div>
                <div className="text-[9px] text-slate-400 font-medium leading-normal mt-0.5">
                  {lang === 'hi' ? 'उत्पाद की तस्वीर लें या स्कैन करें' : 'Take or scan images of the product'}
                </div>
              </div>
            </button>

            {/* Add Item Form Option */}
            <button className="flex items-center gap-3.5 p-3.5 bg-slate-50/50 hover:bg-slate-100/70 active:scale-[0.99] rounded-2xl border border-slate-100 text-left transition-all">
              <div className="w-9.5 h-9.5 bg-[#A8E6CF]/20 border border-[#03B459]/20 rounded-xl flex items-center justify-center text-[#03B459] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2v12a2 2 0 01-2 2zM9 5V3h6v2" />
                </svg>
              </div>
              <div>
                <div className="text-[11.5px] font-extrabold text-slate-800 leading-tight">
                  {lang === 'hi' ? 'मैन्युअल फॉर्म भरें' : 'Add Item Form'}
                </div>
                <div className="text-[9px] text-slate-400 font-medium leading-normal mt-0.5">
                  {lang === 'hi' ? 'वैकल्पिक फोटो के साथ फॉर्म भरें' : 'Fill Form manually with optional photo'}
                </div>
              </div>
            </button>

            {/* Browse Collection Option */}
            <button 
              onClick={() => {
                setShowAddSheet(false);
                setCurrentScreen('catalog');
              }}
              className="flex items-center gap-3.5 p-3.5 bg-slate-50/50 hover:bg-slate-100/70 active:scale-[0.99] rounded-2xl border border-slate-100 text-left transition-all"
            >
              <div className="w-9.5 h-9.5 bg-[#A8E6CF]/20 border border-[#03B459]/20 rounded-xl flex items-center justify-center text-[#03B459] flex-shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[11.5px] font-extrabold text-slate-800 leading-tight">
                  {lang === 'hi' ? 'कलेक्शन ब्राउज़ करें' : 'Browse Collection'}
                </div>
                <div className="text-[9px] text-slate-400 font-medium leading-normal mt-0.5">
                  {lang === 'hi' ? 'हमारे 200+ उत्पादों के कैटलॉग से चुनें' : 'Browse our collection of 200+ products'}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }
}
