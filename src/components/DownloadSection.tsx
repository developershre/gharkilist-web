'use client';

export default function DownloadSection() {
  return (
    <section id="download" className="relative">
      <div className="section-divider" />
      <div className="py-20 md:py-28 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold text-emerald uppercase tracking-[0.12em] mb-3">Download</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate tracking-[-0.02em] mb-3">
              Get Gharkilist Today
            </h2>
            <p className="text-[15px] text-slate/45 max-w-md mx-auto leading-relaxed">
              Free, lightweight, and built for Indian kitchens.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <div className="bg-cream rounded-2xl border border-black/[0.04] p-7">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-emerald flex items-center justify-center">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-white">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate tracking-[-0.01em]">Gharkilist</h3>
                  <span className="text-[13px] text-slate/35" style={{ fontFamily: 'var(--font-hindi)' }}>घर की लिस्ट</span>
                </div>
              </div>

              <div className="mb-6">
                {[
                  { label: 'Version', value: 'v1.0.0' },
                  { label: 'Size', value: '~12.4 MB' },
                  { label: 'Requirement', value: 'Android 7.0+' },
                  { label: 'Price', value: '100% Free', highlight: true },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between py-2.5 ${i < 3 ? 'border-b border-black/[0.04]' : ''}`}>
                    <span className="text-[13px] text-slate/45">{item.label}</span>
                    <span className={`text-[13px] font-semibold ${item.highlight ? 'text-emerald' : 'text-slate'}`}>{item.value}</span>
                  </div>
                ))}
              </div>

              <button className="w-full bg-emerald text-white font-semibold py-3 rounded-xl hover:bg-emerald-light transition-all flex items-center justify-center gap-2 text-[14px] shadow-sm shadow-emerald/15">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download APK v1.0
              </button>
            </div>

            <div className="bg-cream rounded-2xl border border-black/[0.04] p-7 flex flex-col items-center justify-center">
              <div className="w-40 h-40 bg-white rounded-xl border border-black/[0.04] flex items-center justify-center mb-5">
                <div className="text-center">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none" className="mx-auto mb-1.5 text-slate/15">
                    <rect x="3" y="3" width="7" height="7" rx="1" fill="currentColor"/>
                    <rect x="14" y="3" width="7" height="7" rx="1" fill="currentColor"/>
                    <rect x="3" y="14" width="7" height="7" rx="1" fill="currentColor"/>
                    <rect x="14" y="14" width="4" height="4" rx="1" fill="currentColor"/>
                    <rect x="18" y="18" width="3" height="3" rx="1" fill="currentColor"/>
                    <rect x="14" y="18" width="3" height="3" rx="1" fill="currentColor"/>
                  </svg>
                  <span className="text-[9px] text-slate/25 font-medium">QR Code</span>
                </div>
              </div>

              <h4 className="text-[15px] font-bold text-slate mb-1 text-center tracking-[-0.01em]">Scan to Download</h4>
              <p className="text-[13px] text-slate/40 text-center mb-5">
                Point your camera at the QR code.
              </p>

              <div className="w-full space-y-2.5">
                {[
                  'Click the Download APK button',
                  'Allow "Install from unknown sources" if prompted',
                  'Open Gharkilist and start managing your pantry',
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-emerald text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    <span className="text-[13px] text-slate/55">{step}</span>
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
