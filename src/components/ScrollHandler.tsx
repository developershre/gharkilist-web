'use client';

import { useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function ScrollBehavior() {
  const searchParams = useSearchParams();
  const scrollTarget = searchParams.get('scroll');

  useEffect(() => {
    if (scrollTarget) {
      const element = document.getElementById(scrollTarget);
      if (element) {
        // Wait briefly for elements to render completely before scrolling
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
        return () => clearTimeout(timer);
      }
    }
  }, [scrollTarget]);

  return null;
}

export default function ScrollHandler() {
  return (
    <Suspense fallback={null}>
      <ScrollBehavior />
    </Suspense>
  );
}
