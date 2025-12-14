import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';
import { analytics } from './analytics';

export function reportWebVitals(metric: any) {
  // Send to analytics system
  analytics.trackPerformance(metric.name, metric.value, {
    metric_id: metric.id,
    metric_delta: metric.delta,
    metric_rating: metric.rating,
  });

  // Also send to Google Analytics if available
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    });
  }
  
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(metric);
  }
}

// Performance budget
export const PERFORMANCE_BUDGET = {
  LCP: 2500, // 2.5s
  FID: 100,  // 100ms
  CLS: 0.1,  // 0.1
  FCP: 1800, // 1.8s
  TTFB: 600  // 600ms
};