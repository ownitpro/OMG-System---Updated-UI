"use client";

import React from "react";
import { useEffect } from "react";

interface PerformanceMetrics {
  lcp?: number; // Largest Contentful Paint
  cls?: number; // Cumulative Layout Shift
  fcp?: number; // First Contentful Paint
  ttfb?: number; // Time to First Byte
  tbt?: number; // Total Blocking Time
  inp?: number; // Interaction to Next Paint
}

interface PerformanceBudget {
  lcp: number; // 2.5s
  cls: number; // 0.1
  fcp: number; // 1.8s
  ttfb: number; // 600ms
  tbt: number; // 200ms
  inp: number; // 200ms
}

const PERFORMANCE_BUDGET: PerformanceBudget = {
  lcp: 2500, // 2.5s
  cls: 0.1, // 0.1
  fcp: 1800, // 1.8s
  ttfb: 600, // 600ms
  tbt: 200, // 200ms
  inp: 200, // 200ms
};

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and if Web Vitals API is available
    if (process.env.NODE_ENV !== "production" || typeof window === "undefined") {
      return;
    }

    // Import web-vitals dynamically to avoid bundle bloat
    import("web-vitals").then(({ onCLS, onFCP, onLCP, onTTFB, onINP }) => {
      const metrics: PerformanceMetrics = {};

      // Collect Core Web Vitals
      onCLS((metric) => {
        metrics.cls = metric.value;
        reportMetric("CLS", metric.value, PERFORMANCE_BUDGET.cls);
      });

      onFCP((metric) => {
        metrics.fcp = metric.value;
        reportMetric("FCP", metric.value, PERFORMANCE_BUDGET.fcp);
      });

      onLCP((metric) => {
        metrics.lcp = metric.value;
        reportMetric("LCP", metric.value, PERFORMANCE_BUDGET.lcp);
      });

      onTTFB((metric) => {
        metrics.ttfb = metric.value;
        reportMetric("TTFB", metric.value, PERFORMANCE_BUDGET.ttfb);
      });

      // INP (Interaction to Next Paint) - newer metric
      onINP((metric) => {
        metrics.inp = metric.value;
        reportMetric("INP", metric.value, PERFORMANCE_BUDGET.inp);
      });

      // Report all metrics after a delay to ensure collection
      setTimeout(() => {
        reportAllMetrics(metrics);
      }, 5000);
    }).catch((error) => {
      console.warn("Failed to load web-vitals:", error);
    });
  }, []);

  return null; // This component doesn't render anything
}

function reportMetric(name: string, value: number, budget: number) {
  const status = value <= budget ? "good" : "needs-improvement";
  
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Performance] ${name}: ${value.toFixed(2)}ms (${status})`);
  }

  // Send to analytics if consent is granted
  const consent = localStorage.getItem("omgsystems_consent");
  if (consent === "granted") {
    // Example: Send to your analytics service
    // gtag('event', 'web_vitals', {
    //   metric_name: name,
    //   metric_value: Math.round(value),
    //   metric_rating: status,
    //   page_path: window.location.pathname,
    // });
    
    console.log(`[Analytics] ${name}: ${value.toFixed(2)}ms (${status})`);
  }
}

function reportAllMetrics(metrics: PerformanceMetrics) {
  const consent = localStorage.getItem("omgsystems_consent");
  if (consent === "granted") {
    // Example: Send batch metrics to analytics
    // gtag('event', 'performance_metrics', {
    //   lcp: metrics.lcp,
    //   fid: metrics.fid,
    //   cls: metrics.cls,
    //   fcp: metrics.fcp,
    //   ttfb: metrics.ttfb,
    //   inp: metrics.inp,
    //   page_path: window.location.pathname,
    // });
    
    console.log("[Analytics] Performance metrics batch:", metrics);
  }
}

// Hook for manual performance monitoring
export function usePerformanceMonitoring() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Monitor resource loading
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === "resource") {
          const resource = entry as PerformanceResourceTiming;
          
          // Log slow resources
          if (resource.duration > 1000) {
            console.warn(`[Performance] Slow resource: ${resource.name} (${resource.duration.toFixed(2)}ms)`);
          }
        }
      }
    });

    observer.observe({ entryTypes: ["resource"] });

    return () => observer.disconnect();
  }, []);
}

// Utility for measuring custom performance
export function measurePerformance<T>(name: string, fn: () => T): T {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  
  const duration = end - start;
  
  if (duration > 100) {
    console.warn(`[Performance] Slow operation: ${name} (${duration.toFixed(2)}ms)`);
  }
  
  return result;
}

// Utility for measuring async operations
export async function measureAsyncPerformance<T>(name: string, fn: () => Promise<T>): Promise<T> {
  const start = performance.now();
  const result = await fn();
  const end = performance.now();
  
  const duration = end - start;
  
  if (duration > 1000) {
    console.warn(`[Performance] Slow async operation: ${name} (${duration.toFixed(2)}ms)`);
  }
  
  return result;
}
