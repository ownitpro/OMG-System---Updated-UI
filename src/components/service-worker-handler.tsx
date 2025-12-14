"use client";

import { useEffect } from "react";

export function ServiceWorkerHandler() {
  useEffect(() => {
    if (!('serviceWorker' in navigator)) {
      return;
    }

    // Always unregister existing service workers first to prevent conflicts
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      for (const registration of registrations) {
        registration.unregister().catch(() => {
          // Ignore errors
        });
      }
    });

    // In development, don't register service worker to avoid conflicts
    // In production, it can be registered if needed
    // For now, we'll keep it unregistered to prevent errors
  }, []);

  return null;
}

