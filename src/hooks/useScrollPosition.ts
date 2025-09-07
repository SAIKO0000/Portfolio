import { useState, useEffect } from 'react';

export interface ScrollPosition {
  x: number;
  y: number;
}

export interface UseScrollPositionOptions {
  throttleMs?: number;
}

export function useScrollPosition(options: UseScrollPositionOptions = {}) {
  const { throttleMs = 100 } = options;
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>({ x: 0, y: 0 });

  useEffect(() => {
    let timeoutId: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        setScrollPosition({
          x: window.scrollX,
          y: window.scrollY
        });
        timeoutId = null;
      }, throttleMs);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Set initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [throttleMs]);

  return scrollPosition;
}

// Hook to detect scroll direction
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return { scrollDirection, scrollY: lastScrollY };
}

// Hook to check if an element is in viewport
export function useInViewport(threshold: number = 0) {
  const [isInViewport, setIsInViewport] = useState(false);
  const [elementRef, setElementRef] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!elementRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(elementRef);

    return () => {
      observer.unobserve(elementRef);
    };
  }, [elementRef, threshold]);

  return { isInViewport, ref: setElementRef };
}
