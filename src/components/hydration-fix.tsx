"use client";

import { useEffect } from "react";

export function HydrationFix() {
  useEffect(() => {
    // Suppress hydration warnings for browser extension attributes and HMR module errors
    const originalError = console.error;
    
    // Handle uncaught promise rejections (Turbopack HMR errors)
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const error = event.reason;
      const errorMessage = error?.message || error?.toString() || '';
      
      if (
        (errorMessage.includes("Module") &&
         errorMessage.includes("was instantiated") &&
         errorMessage.includes("module factory is not available")) ||
        (errorMessage.includes("@swc/helpers") &&
         (errorMessage.includes("HMR update") || 
          errorMessage.includes("was instantiated") ||
          errorMessage.includes("module factory is not available"))) ||
        (errorMessage.includes("dev-base.ts") &&
         errorMessage.includes("instantiateModule")) ||
        (errorMessage.includes("_interop_require_default") &&
         errorMessage.includes("module factory is not available")) ||
        (errorMessage.includes("react-client-callbacks") &&
         errorMessage.includes("@swc/helpers"))
      ) {
        // Suppress known Turbopack/webpack HMR errors - these are non-blocking
        event.preventDefault();
        console.warn("[HMR] Suppressed module error (harmless):", errorMessage.substring(0, 100));
        return;
      }
    };
    
    window.addEventListener('unhandledrejection', handleUnhandledRejection);
    
    console.error = (...args) => {
      // Don't suppress NextAuth errors - they need to be visible for debugging
      if (
        typeof args[0] === "string" &&
        args[0].includes("[next-auth]")
      ) {
        // Let NextAuth errors through
        originalError.apply(console, args);
        return;
      }
      
      // Suppress Turbopack/webpack HMR module errors (known Next.js 16 issue)
      if (
        typeof args[0] === "string" &&
        ((args[0].includes("Module") && args[0].includes("was instantiated") && args[0].includes("module factory is not available")) ||
        (args[0].includes("@swc/helpers") && 
         (args[0].includes("HMR update") || 
          args[0].includes("was instantiated") ||
          args[0].includes("module factory is not available"))) ||
        (args[0].includes("dev-base.ts") && args[0].includes("instantiateModule")) ||
        (args[0].includes("_interop_require_default") && args[0].includes("module factory is not available")) ||
        (args[0].includes("react-client-callbacks") && args[0].includes("@swc/helpers")))
      ) {
        // Suppress known HMR errors - these are non-blocking and don't affect functionality
        return;
      }
      
      if (
        typeof args[0] === "string" &&
        (args[0].includes("Hydration failed") || args[0].includes("Hydration completed but")) &&
        (args[0].includes("data-new-gr-c-s-check-loaded") ||
          args[0].includes("data-gr-ext-installed") ||
          args[0].includes("grammarly") ||
          args[0].includes("browser extension"))
      ) {
        // Suppress Grammarly and other browser extension hydration warnings
        return;
      }
      originalError.apply(console, args);
    };

    // Clean up browser extension attributes that cause hydration mismatches
    const body = document.body;
    if (body) {
      // Remove Grammarly and other browser extension attributes that cause hydration issues
      const extensionAttrs = [
        "data-new-gr-c-s-check-loaded",
        "data-gr-ext-installed",
        "data-grammarly-shadow-root",
        "data-grammarly-ignore",
        "data-grammarly-ignore-all"
      ];
      
      extensionAttrs.forEach(attr => {
        if (body.hasAttribute(attr)) {
          body.removeAttribute(attr);
        }
      });
    }

    // Restore original console.error after a delay
    const timeout = setTimeout(() => {
      console.error = originalError;
    }, 2000);

    return () => {
      clearTimeout(timeout);
      console.error = originalError;
      // Clean up event listener
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
}
