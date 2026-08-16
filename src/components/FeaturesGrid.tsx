'use client';

const features = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="11" x2="15" y2="11"/></svg>
    ),
    title: '100+ Indian Pantry Catalog',
    description: 'Pre-loaded with regional names like Toor / Tuvar / Arhar Dal. Every item your kitchen needs.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
    ),
    title: 'One-Tap WhatsApp Export',
    description: 'Formats items, quantities, and prices into a clean message for your kirana store.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
    ),
    title: 'Multi-Inventory Switching',
    description: 'Kitchen Pantry, Monthly Kirana, Pooja Supplies, Party List — switch instantly.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
    ),
    title: '100% Offline & Private',
    description: 'Local SQLite. No servers, no tracking, no accounts. Your data stays on your phone.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
    ),
    title: 'Quantity & Unit Stepper',
    description: 'Built-in support for KG, G, L, ML, Packets, Pieces. Adjust with a single tap.',
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    ),
    title: 'Zero Ad Clutter',
    description: 'Superfast, lightweight Flutter app. No ads, no bloat, just what you need.',
  },
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-[0.12em] mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-[-0.02em] mb-3">
              Everything Your Kitchen Needs
            </h2>
            <p className="text-[15px] text-slate/45 max-w-md mx-auto leading-relaxed">
              Built for Indian households with features western grocery apps don&apos;t offer.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl border border-black/[0.04] p-6 hover:border-emerald/20 hover:shadow-[0_8px_30px_-12px_rgba(15,81,50,0.08)] transition-all duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-emerald/[0.06] flex items-center justify-center text-emerald mb-4 group-hover:bg-emerald/[0.1] transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-[15px] font-bold text-slate mb-1.5 tracking-[-0.01em]">{feature.title}</h3>
                <p className="text-[13px] text-slate/45 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
