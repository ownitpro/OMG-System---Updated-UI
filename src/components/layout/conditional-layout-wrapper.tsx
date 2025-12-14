"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

// Import Header and Footer components directly from their files
// Using direct imports to avoid webpack module resolution issues
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";

export function ConditionalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [shouldHideNav, setShouldHideNav] = useState(false);
  
  // Check pathname after mount to avoid hydration mismatches
  useEffect(() => {
    // Hide Header/Footer for admin routes, portal routes, and product pages
    // Product pages have their own custom headers
    setShouldHideNav(
      pathname?.startsWith("/dashboard/admin") || 
      pathname?.startsWith("/admin") || 
      pathname?.startsWith("/portal") || 
      pathname?.startsWith("/products") || 
      false
    );
  }, [pathname]);
  
  // Always render Header/Footer but hide them for admin/portal routes using CSS class
  // This ensures webpack always loads the modules at build time, avoiding runtime errors
  // Using 'hidden' class instead of conditional rendering to ensure modules are always loaded
  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-white px-4 py-2 rounded-md z-50"
      >
        Skip to content
      </a>
      <div className={shouldHideNav ? "hidden" : ""}>
        <Header />
      </div>
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <div className={shouldHideNav ? "hidden" : ""}>
        <Footer />
      </div>
    </div>
  );
}
