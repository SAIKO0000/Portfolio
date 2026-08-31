'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';
import { SiteWordmark } from './SiteWordmark';

const MOBILE_HEADER_HIDE_START = 96;
const MOBILE_HEADER_TOP_ZONE = 24;
const MOBILE_HEADER_DIRECTION_THRESHOLD = 12;

export function SiteHeader() {
  const pathname = usePathname();
  const [mobileHidden, setMobileHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileHiddenRef = useRef(false);
  const menuOpenRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const directionRef = useRef<-1 | 0 | 1>(0);
  const directionDistanceRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  const updateMobileHeader = useCallback((hidden: boolean) => {
    if (mobileHiddenRef.current === hidden) return;
    mobileHiddenRef.current = hidden;
    setMobileHidden(hidden);
  }, []);

  const revealMobileHeader = useCallback(() => {
    directionRef.current = 0;
    directionDistanceRef.current = 0;
    updateMobileHeader(false);
  }, [updateMobileHeader]);

  const handleMobileMenuOpenChange = useCallback((open: boolean) => {
    menuOpenRef.current = open;
    setMobileMenuOpen(open);
    if (open) revealMobileHeader();
  }, [revealMobileHeader]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lastScrollYRef.current = Math.max(window.scrollY, 0);
      revealMobileHeader();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, revealMobileHeader]);

  useEffect(() => {
    const mobileQuery = window.matchMedia('(max-width: 767px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const syncPersistentState = () => {
      if (!mobileQuery.matches || reducedMotionQuery.matches) revealMobileHeader();
      lastScrollYRef.current = Math.max(window.scrollY, 0);
    };

    const updateFromScroll = () => {
      animationFrameRef.current = null;

      const scrollY = Math.max(window.scrollY, 0);
      const delta = scrollY - lastScrollYRef.current;
      lastScrollYRef.current = scrollY;

      if (!mobileQuery.matches || reducedMotionQuery.matches || menuOpenRef.current) {
        revealMobileHeader();
        return;
      }

      if (scrollY <= MOBILE_HEADER_TOP_ZONE) {
        revealMobileHeader();
        return;
      }

      if (Math.abs(delta) < 1) return;

      const direction = delta > 0 ? 1 : -1;
      if (directionRef.current !== direction) {
        directionRef.current = direction;
        directionDistanceRef.current = 0;
      }

      directionDistanceRef.current += Math.abs(delta);
      if (directionDistanceRef.current < MOBILE_HEADER_DIRECTION_THRESHOLD) return;

      updateMobileHeader(direction > 0 && scrollY > MOBILE_HEADER_HIDE_START);
      directionDistanceRef.current = 0;
    };

    const handleScroll = () => {
      if (animationFrameRef.current !== null) return;
      animationFrameRef.current = window.requestAnimationFrame(updateFromScroll);
    };

    lastScrollYRef.current = Math.max(window.scrollY, 0);
    window.addEventListener('scroll', handleScroll, { passive: true });
    mobileQuery.addEventListener('change', syncPersistentState);
    reducedMotionQuery.addEventListener('change', syncPersistentState);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mobileQuery.removeEventListener('change', syncPersistentState);
      reducedMotionQuery.removeEventListener('change', syncPersistentState);
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, [revealMobileHeader, updateMobileHeader]);

  return (
    <header
      id="site-top"
      className="site-header"
      data-mobile-hidden={mobileHidden ? 'true' : undefined}
      onFocusCapture={revealMobileHeader}
    >
      <div className="site-container site-header__inner">
        <SiteWordmark />
        <DesktopNav />
        <MobileNav open={mobileMenuOpen} onOpenChange={handleMobileMenuOpenChange} />
      </div>
    </header>
  );
}
