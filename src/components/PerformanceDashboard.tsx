'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/hooks/useTheme';

interface PerformanceMetric {
  name: string;
  value: number;
  unit: string;
  status: 'good' | 'needs-improvement' | 'poor';
  description: string;
}

interface AnalyticsData {
  pageViews: number;
  uniqueVisitors: number;
  bounceRate: number;
  avgSessionDuration: number;
  topPages: Array<{ path: string; views: number }>;
  topCountries: Array<{ country: string; visits: number }>;
}

export default function PerformanceDashboard() {
  const { isDark } = useTheme();
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetric[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const metricThresholds: Record<string, { good: number; needsImprovement: number }> = {
    LCP: { good: 2500, needsImprovement: 4000 },
    FID: { good: 100, needsImprovement: 300 },
    CLS: { good: 0.1, needsImprovement: 0.25 },
    FCP: { good: 1800, needsImprovement: 3000 },
    TTFB: { good: 800, needsImprovement: 1800 }
  };

  const getMetricStatus = (metricName: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const thresholds = metricThresholds[metricName];
    if (!thresholds) return 'good';
    
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  };

  const getMetricDescription = (metricName: string): string => {
    const descriptions: Record<string, string> = {
      LCP: 'Largest Contentful Paint - measures loading performance',
      FID: 'First Input Delay - measures interactivity',
      CLS: 'Cumulative Layout Shift - measures visual stability',
      FCP: 'First Contentful Paint - measures perceived loading speed',
      TTFB: 'Time to First Byte - measures connection and server response time'
    };
    return descriptions[metricName] || '';
  };

  const processWebVitalsMetrics = useCallback((parsedMetrics: Record<string, { value: number }>): PerformanceMetric[] => {
    const metrics: PerformanceMetric[] = [];
    
    Object.entries(parsedMetrics).forEach(([name, data]: [string, { value: number }]) => {
      const status = getMetricStatus(name, data.value);
      const description = getMetricDescription(name);

      metrics.push({
        name,
        value: Math.round(data.value * 100) / 100,
        unit: name === 'CLS' ? '' : 'ms',
        status,
        description
      });
    });

    return metrics;
  }, [getMetricStatus, getMetricDescription]);

  const addMemoryMetrics = (metrics: PerformanceMetric[]): void => {
    if ('memory' in performance) {
      const memory = (performance as unknown as { memory: { usedJSHeapSize: number } }).memory;
      const memoryUsedMB = Math.round(memory.usedJSHeapSize / 1024 / 1024);
      const memoryStatus = memory.usedJSHeapSize < 50 * 1024 * 1024 ? 'good' : 'needs-improvement';
      
      metrics.push({
        name: 'JS Heap Used',
        value: memoryUsedMB,
        unit: 'MB',
        status: memoryStatus,
        description: 'JavaScript memory usage in megabytes'
      });
    }
  };

  useEffect(() => {
    // Collect performance metrics
    if (typeof window !== 'undefined') {
      const metrics: PerformanceMetric[] = [];
      
      // Get Web Vitals data from localStorage if available
      const storedMetrics = localStorage.getItem('webVitalsMetrics');
      if (storedMetrics) {
        const parsedMetrics = JSON.parse(storedMetrics);
        const webVitalsMetrics = processWebVitalsMetrics(parsedMetrics);
        metrics.push(...webVitalsMetrics);
      }

      // Add memory metrics
      addMemoryMetrics(metrics);

      setPerformanceMetrics(metrics);

      // Simulate analytics data (in a real app, this would come from Google Analytics, Vercel Analytics, etc.)
      setAnalyticsData({
        pageViews: 1247,
        uniqueVisitors: 892,
        bounceRate: 32.5,
        avgSessionDuration: 145,
        topPages: [
          { path: '/', views: 891 },
          { path: '/projects', views: 234 },
          { path: '/about', views: 122 }
        ],
        topCountries: [
          { country: 'United States', visits: 423 },
          { country: 'United Kingdom', visits: 234 },
          { country: 'Canada', visits: 156 },
          { country: 'Germany', visits: 79 }
        ]
      });
    }
  }, [processWebVitalsMetrics]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'text-green-600 bg-green-100 border-green-200';
      case 'needs-improvement':
        return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'poor':
        return 'text-red-600 bg-red-100 border-red-200';
      default:
        return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return '✅';
      case 'needs-improvement':
        return '⚠️';
      case 'poor':
        return '❌';
      default:
        return 'ℹ️';
    }
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg transition-colors z-50 ${
          isDark 
            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
            : 'bg-white hover:bg-gray-50 text-gray-900'
        }`}
        title="Show Performance Dashboard"
      >
        📊
      </button>
    );
  }

  return (
    <div className={`fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto rounded-lg shadow-xl z-50 ${
      isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
    }`}>
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">Performance Dashboard</h3>
          <button
            onClick={() => setIsVisible(false)}
            className={`text-sm px-2 py-1 rounded ${
              isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            ✕
          </button>
        </div>

        {/* Web Vitals Metrics */}
        <div className="mb-6">
          <h4 className="text-md font-semibold mb-3">Core Web Vitals</h4>
          <div className="space-y-2">
            {performanceMetrics.filter(m => ['LCP', 'FID', 'CLS'].includes(m.name)).map((metric) => (
              <div
                key={metric.name}
                className={`p-2 rounded border text-xs ${getStatusColor(metric.status)}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {getStatusIcon(metric.status)} {metric.name}
                  </span>
                  <span className="font-bold">
                    {metric.value}{metric.unit}
                  </span>
                </div>
                <div className="text-xs opacity-75 mt-1">
                  {metric.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Metrics */}
        {performanceMetrics.filter(m => !['LCP', 'FID', 'CLS'].includes(m.name)).length > 0 && (
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-3">Additional Metrics</h4>
            <div className="space-y-2">
              {performanceMetrics.filter(m => !['LCP', 'FID', 'CLS'].includes(m.name)).map((metric) => (
                <div
                  key={metric.name}
                  className={`p-2 rounded border text-xs ${getStatusColor(metric.status)}`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{metric.name}</span>
                    <span className="font-bold">
                      {metric.value}{metric.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Analytics Overview */}
        {analyticsData && (
          <div>
            <h4 className="text-md font-semibold mb-3">Analytics Overview</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="font-medium">Page Views</div>
                <div className="text-lg font-bold">{analyticsData.pageViews.toLocaleString()}</div>
              </div>
              <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="font-medium">Unique Visitors</div>
                <div className="text-lg font-bold">{analyticsData.uniqueVisitors.toLocaleString()}</div>
              </div>
              <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="font-medium">Bounce Rate</div>
                <div className="text-lg font-bold">{analyticsData.bounceRate}%</div>
              </div>
              <div className={`p-2 rounded ${isDark ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="font-medium">Avg. Session</div>
                <div className="text-lg font-bold">{analyticsData.avgSessionDuration}s</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-xs font-medium mb-1">Top Pages</div>
              {analyticsData.topPages.map((page) => (
                <div key={page.path} className="flex justify-between text-xs py-1">
                  <span className="truncate">{page.path}</span>
                  <span className="font-medium">{page.views}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 pt-3 border-t border-gray-200 text-xs text-center opacity-75">
          Real-time performance monitoring
        </div>
      </div>
    </div>
  );
}
