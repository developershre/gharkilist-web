'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Track visits on home and blog pages
    if (pathname === '/' || pathname === '/blog') {
      // Prevent double tracking in development/react strict mode render cycles
      if (lastTrackedPath.current === pathname) return;
      lastTrackedPath.current = pathname;

      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ page: pathname }),
      }).catch((err) => console.error('Failed to log page view:', err));
    }
  }, [pathname]);

  return null;
}
