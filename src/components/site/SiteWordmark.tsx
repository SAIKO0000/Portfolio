'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, type MouseEvent } from 'react';
import { ShiftMark } from './ShiftMark';

const returnHomeScrollKey = 'portfolio-return-home-top';

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;
}

export function SiteWordmark() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== '/') return;

    let shouldResetScroll = window.location.hash === '#site-top';

    try {
      if (window.sessionStorage.getItem(returnHomeScrollKey) === 'true') {
        window.sessionStorage.removeItem(returnHomeScrollKey);
        shouldResetScroll = true;
      }
    } catch {
      // The link's native navigation and Next.js scroll behavior remain the fallback.
    }

    if (!shouldResetScroll) return;
    if (window.location.hash === '#site-top') {
      window.history.replaceState(window.history.state, '', '/');
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname]);

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || isModifiedClick(event)) return;

    if (pathname === '/') {
      event.preventDefault();

      if (window.location.hash) {
        window.history.replaceState(window.history.state, '', '/');
      }

      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: 0, left: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
      return;
    }

    try {
      window.sessionStorage.setItem(returnHomeScrollKey, 'true');
    } catch {
      // Navigation still succeeds if storage is unavailable.
    }
  };

  return (
    <Link className="site-wordmark" href="/#site-top" scroll onClick={handleHomeClick}>
      <span className="site-wordmark__icon" aria-hidden="true">
        <ShiftMark />
      </span>
      <span className="site-wordmark__keyline" aria-hidden="true" />
      <span className="site-wordmark__copy">
        <span className="site-wordmark__name">Mark Daniel Iguban</span>
        <span className="site-wordmark__role">Software engineer</span>
      </span>
      <span className="sr-only">Home</span>
    </Link>
  );
}
