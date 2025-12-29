"use client";

import React from "react";
import { usePathname } from "next/navigation";

// Import Header and Footer components directly from their files
// Using direct imports to avoid webpack module resolution issues
import { Header } from "@/components/navigation/header";
import { Footer } from "@/components/navigation/footer";

// Helper to check if nav should be hidden for a given path
function shouldHideNavForPath(path: string | null): boolean {
  if (!path) return false;
  return (
    path.startsWith("/dashboard/admin") ||
    path.startsWith("/admin") ||
    path.startsWith("/portal") ||
    path.startsWith("/products") ||
    path.startsWith("/checkout")
  );
}

export function ConditionalLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Compute hide state directly from pathname (no useEffect delay)
  const shouldHideNav = shouldHideNavForPath(pathname);
  
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
