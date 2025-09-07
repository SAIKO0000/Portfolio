'use client';

import { ReactNode } from 'react';
import { useIntersectionAnimation } from '@/hooks/useAnimation';

interface AnimatedSectionProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
}

export default function AnimatedSection({ 
  children, 
  delay = 0, 
  className = '' 
}: AnimatedSectionProps) {
  const { ref, isVisible } = useIntersectionAnimation({ delay });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  );
}
