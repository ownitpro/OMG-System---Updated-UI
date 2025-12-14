"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

// Always import PortalShell to ensure webpack resolves it at build time
// This import must be at the top level, not conditional
import { PortalShell } from "@/components/portal/portal-shell";

interface PortalShellWrapperProps {
  children: React.ReactNode;
}

export function PortalShellWrapper({ children }: PortalShellWrapperProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isAdminRoute = mounted && pathname?.startsWith("/portal/admin");

  // If admin route, render children directly (admin layout will handle it)
  if (isAdminRoute) {
    return <>{children}</>;
  }

  // For client routes, always use PortalShell
  // This ensures webpack always loads the PortalShell module
  return (
    <div className="min-h-screen">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to content
      </a>
      {mounted ? (
        <PortalShell>
          <main id="main-content" className="flex-1">
            {children}
          </main>
        </PortalShell>
      ) : (
        <main id="main-content" className="flex-1">
          {children}
        </main>
      )}
    </div>
  );
}

// Also export as default for better webpack compatibility
export default PortalShellWrapper;

