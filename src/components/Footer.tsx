export default function Footer() {
  return (
    <footer className="bg-slate text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-emerald flex items-center justify-center">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-white">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M9 22V12h6v10" stroke="currentColor" strokeWidth="2"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[15px] font-bold tracking-[-0.01em]">ghark<span className="text-mint">i</span>list</span>
                <span className="text-[9px] text-white/35 font-medium leading-none mt-0.5" style={{ fontFamily: 'var(--font-hindi)' }}>घर की लिस्ट</span>
              </div>
            </div>
            <p className="text-[13px] text-white/35 leading-relaxed max-w-xs mb-5">
              A 100% offline, privacy-first mobile app for Indian households to track kitchen inventory and automate grocery ordering.
            </p>
            <div className="flex items-center gap-2">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.07] hover:bg-white/[0.12] flex items-center justify-center transition-colors" aria-label="GitHub">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/[0.07] hover:bg-white/[0.12] flex items-center justify-center transition-colors" aria-label="Twitter">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/50 mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Features</a></li>
              <li><a href="#why" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Why Gharkilist</a></li>
              <li><a href="#demo" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Live Demo</a></li>
              <li><a href="#download" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Download</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-[0.1em] text-white/50 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Release Notes</a></li>
              <li><a href="#" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Report an Issue</a></li>
              <li><a href="#" className="text-[13px] text-white/35 hover:text-white/60 transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-white/25">
            &copy; 2026 Gharkilist. Built for Indian kitchens.
          </p>
          <p className="text-[11px] text-white/25" style={{ fontFamily: 'var(--font-hindi)' }}>
            घर की लिस्ट — आपकी रसोई, आपकी लिस्ट
          </p>
        </div>
      </div>
    </footer>
  );
}
