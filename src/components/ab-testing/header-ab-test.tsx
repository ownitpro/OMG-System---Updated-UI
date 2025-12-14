"use client";

import React from "react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

interface HeaderABTestProps {
  children: React.ReactNode;
}

export function HeaderABTest({ children }: HeaderABTestProps) {
  const [variant, setVariant] = useState<'A' | 'B' | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only run A/B test on public pages (not admin/portal)
    if (pathname.startsWith('/admin') || pathname.startsWith('/portal') || pathname.startsWith('/campaign/') && pathname.includes('-v2')) {
      return;
    }

    // Check if user already has a variant assigned
    const existingVariant = getCookie('omg_hdr_ab');
    if (existingVariant === 'A' || existingVariant === 'B') {
      setVariant(existingVariant);
      return;
    }

    // Assign new variant (50/50 split)
    const newVariant = Math.random() < 0.5 ? 'A' : 'B';
    setVariant(newVariant);
    
    // Set cookie for 90 days
    setCookie('omg_hdr_ab', newVariant, 90);
    
    // Track assignment if analytics consent given
    const consent = localStorage.getItem('omg_consent');
    if (consent === 'accepted' && window.gtag) {
      window.gtag('event', 'ab_assign', {
        event_category: 'Header A/B Test',
        variant: newVariant,
        page_path: pathname
      });
    }
  }, [pathname]);

  // Track clicks on A/B test elements
  const handleABClick = (element: string, destination: string) => {
    if (variant && window.gtag) {
      const consent = localStorage.getItem('omg_consent');
      if (consent === 'accepted') {
        window.gtag('event', 'ab_click', {
          event_category: 'Header A/B Test',
          variant: variant,
          element: element,
          destination: destination,
          page_path: pathname
        });
      }
    }
  };

  // Clone children and inject A/B test props
  const childrenWithABTest = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        abVariant: variant,
        onABClick: handleABClick
      } as any);
    }
    return child;
  });

  return <>{childrenWithABTest}</>;
}

// Helper functions
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

function setCookie(name: string, value: string, days: number): void {
  if (typeof document === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
}

// Extend window type for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
