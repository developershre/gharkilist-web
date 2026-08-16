'use client';

const comparisons = [
  {
    feature: 'Loose Staples (Atta/Dal by KG)',
    generic: 'Fails (Requires barcode)',
    gharkilist: 'Pre-cataloged with KG/G units',
  },
  {
    feature: 'Bilingual Item Names',
    generic: 'English only',
    gharkilist: 'English + Hindi bilingual names',
  },
  {
    feature: 'Kirana Ordering',
    generic: 'Forces in-app checkout',
    gharkilist: '1-Tap WhatsApp Export',
  },
  {
    feature: 'Privacy & Internet',
    generic: 'Requires login & tracking',
    gharkilist: '100% Offline, Zero tracking',
  },
  {
    feature: 'Pooja & Festival Needs',
    generic: 'Not available',
    gharkilist: 'Dedicated Pooja Category',
  },
];

export default function ComparisonMatrix() {
  return (
    <section id="why" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-[0.12em] mb-3">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-[-0.02em] mb-3">
              Why Grocery Apps Don&apos;t Work Here
            </h2>
            <p className="text-[15px] text-slate/45 max-w-md mx-auto leading-relaxed">
              Western apps assume every product has a barcode. Indian kitchens don&apos;t.
            </p>
          </div>

          <div className="hidden md:block rounded-2xl border border-black/[0.04] overflow-hidden bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            <div className="grid grid-cols-[1fr_1fr_1.1fr] text-[13px]">
              <div className="px-5 py-3 font-semibold text-slate/50 border-b border-black/[0.04]">Feature</div>
              <div className="px-5 py-3 font-semibold text-slate/50 border-b border-l border-black/[0.04] text-center">Generic Apps</div>
              <div className="px-5 py-3 font-semibold text-white border-b border-l border-black/[0.04] text-center bg-emerald">Gharkilist</div>
            </div>
            {comparisons.map((row, i) => (
              <div key={i} className={`grid grid-cols-[1fr_1fr_1.1fr] text-[13px] ${i < comparisons.length - 1 ? 'border-b border-black/[0.03]' : ''}`}>
                <div className="px-5 py-3.5 font-medium text-slate flex items-center">{row.feature}</div>
                <div className="px-5 py-3.5 flex items-center gap-2 border-l border-black/[0.04]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" className="flex-shrink-0 opacity-70"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  <span className="text-slate/40">{row.generic}</span>
                </div>
                <div className="px-5 py-3.5 flex items-center gap-2 border-l border-black/[0.04] bg-emerald/[0.03]">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0F5132" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="font-medium text-emerald">{row.gharkilist}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden space-y-2.5">
            {comparisons.map((row, i) => (
              <div key={i} className="rounded-xl border border-black/[0.04] p-4 bg-white">
                <div className="text-[13px] font-semibold text-slate mb-2.5 tracking-[-0.01em]">{row.feature}</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" className="flex-shrink-0 opacity-70"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    <span className="text-[13px] text-slate/40">{row.generic}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0F5132" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-[13px] font-medium text-emerald">{row.gharkilist}</span>
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
