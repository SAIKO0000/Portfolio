'use client';

import { useEffect } from 'react';

// Define types for Web Vitals metrics
interface Metric {
  name: string;
  value: number;
  id: string;
  navigationType?: string;
}

export function reportWebVitals(metric: Metric) {
  // Log to console for development (in production, send to analytics)
  console.log(`🚀 Web Vitals - ${metric.name}:`, {
    value: metric.value,
    id: metric.id,
    navigationType: metric.navigationType
  });
  
  // Performance thresholds for 2025
  const thresholds = {
    LCP: 2500, // Largest Contentful Paint
    FID: 100,  // First Input Delay  
    CLS: 0.1,  // Cumulative Layout Shift
    FCP: 1800, // First Contentful Paint
    TTFB: 800  // Time to First Byte
  };
  
  const threshold = thresholds[metric.name as keyof typeof thresholds];
  const isGood = metric.name === 'CLS' 
    ? metric.value < threshold 
    : metric.value <= threshold;
    
  console.log(`📊 ${metric.name} Status: ${isGood ? '✅ Good' : '⚠️ Needs Improvement'}`);
}

export default function WebVitals() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Use Next.js built-in performance observer
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Report core metrics
          if (entry.entryType === 'navigation') {
            const nav = entry as PerformanceNavigationTiming;
            reportWebVitals({
              name: 'TTFB',
              value: nav.responseStart - nav.requestStart,
              id: 'navigation-' + Date.now()
            });
          }
          
          if (entry.entryType === 'paint') {
            reportWebVitals({
              name: entry.name === 'first-contentful-paint' ? 'FCP' : 'FP',
              value: entry.startTime,
              id: entry.name + '-' + Date.now()
            });
          }
        }
      });
      
      // Observe navigation and paint events
      try {
        observer.observe({ entryTypes: ['navigation', 'paint'] });
      } catch (error) {
        console.warn('Performance Observer not supported:', error);
      }
      
      return () => observer.disconnect();
    }
  }, []);

  return null;
}
