import { useState, useEffect, useRef } from 'react';

export interface AnimationState {
  isVisible: boolean;
  isAnimating: boolean;
  hasAnimated: boolean;
}

export interface UseIntersectionAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export function useIntersectionAnimation(
  options: UseIntersectionAnimationOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0
  } = options;

  const elementRef = useRef<HTMLElement>(null);
  const [state, setState] = useState<AnimationState>({
    isVisible: false,
    isAnimating: false,
    hasAnimated: false
  });

  const setVisible = () => {
    setState(prev => ({
      ...prev,
      isVisible: true,
      isAnimating: true,
      hasAnimated: true
    }));
  };

  const setHidden = () => {
    setState(prev => ({
      ...prev,
      isVisible: false,
      isAnimating: false
    }));
  };

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const handleIntersection = ([entry]: IntersectionObserverEntry[]) => {
      const isIntersecting = entry.isIntersecting;
      
      if (isIntersecting && (!state.hasAnimated || !triggerOnce)) {
        if (delay > 0) {
          setTimeout(setVisible, delay);
        } else {
          setVisible();
        }
      } else if (!isIntersecting && !triggerOnce) {
        setHidden();
      }
    };

    const observer = new IntersectionObserver(handleIntersection, { 
      threshold, 
      rootMargin 
    });

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [threshold, rootMargin, triggerOnce, delay, state.hasAnimated]);

  const startAnimation = () => {
    setState(prev => ({
      ...prev,
      isAnimating: true,
      hasAnimated: true
    }));
  };

  const stopAnimation = () => {
    setState(prev => ({
      ...prev,
      isAnimating: false
    }));
  };

  const resetAnimation = () => {
    setState({
      isVisible: false,
      isAnimating: false,
      hasAnimated: false
    });
  };

  return {
    ref: elementRef,
    ...state,
    startAnimation,
    stopAnimation,
    resetAnimation
  };
}

// Hook for managing hover animations
export function useHoverAnimation() {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return {
    isHovered,
    hoverProps: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    }
  };
}

// Hook for managing staggered animations
export function useStaggeredAnimation<T>(
  items: T[],
  staggerDelay: number = 100
) {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());

  const addVisibleItem = (index: number) => {
    setVisibleItems(prev => new Set([...prev, index]));
  };

  const startStaggeredAnimation = () => {
    items.forEach((_, index) => {
      setTimeout(() => addVisibleItem(index), index * staggerDelay);
    });
  };

  const resetStaggeredAnimation = () => {
    setVisibleItems(new Set());
  };

  const isItemVisible = (index: number) => visibleItems.has(index);

  return {
    startStaggeredAnimation,
    resetStaggeredAnimation,
    isItemVisible,
    visibleCount: visibleItems.size
  };
}
