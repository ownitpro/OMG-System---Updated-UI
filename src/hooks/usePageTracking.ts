"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { recordPageView, updatePageDuration } from "@/lib/admin/analyticsStore";

// Map paths to friendly page names
const PAGE_NAMES: { [key: string]: string } = {
  "/portal/client": "Dashboard",
  "/portal/client/omg-crm": "OMG-CRM",
  "/portal/client/securevault-docs": "SecureVault Docs",
  "/portal/client/omg-leads": "OMG-Leads",
  "/portal/client/omg-iq": "OMG-IQ",
  "/portal/client/omg-ai-mastery": "OMG AI Mastery",
  "/portal/client/timeguard-ai": "TimeGuard AI",
  "/portal/client/automations": "Automations",
  "/portal/client/strategy-session": "Strategy Session",
  "/portal/client/custom-solutions": "Custom Solutions",
  "/portal/client/ads-management": "Ads Management",
  "/portal/client/branding-creative": "Branding & Creative",
  "/portal/client/content-development": "Content Development",
  "/portal/client/industry-focused/real-estate": "Real Estate",
  "/portal/client/industry-focused/property-management": "Property Management",
  "/portal/client/industry-focused/contractors": "Contractors",
  "/portal/client/industry-focused/accounting": "Accounting",
};

function getPageName(path: string): string {
  return PAGE_NAMES[path] || path.split("/").pop() || "Unknown";
}

// Generate a session ID for the current browser session
function getSessionId(): string {
  if (typeof window === "undefined") return "";

  let sessionId = sessionStorage.getItem("omg_session_id");
  if (!sessionId) {
    sessionId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem("omg_session_id", sessionId);
  }
  return sessionId;
}

// Get current client info (in a real app, this would come from auth context)
function getCurrentClient(): { id: string; name: string } | null {
  if (typeof window === "undefined") return null;

  // Try to get from localStorage or session
  const stored = localStorage.getItem("omg_current_client");
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // Fall through to demo client
    }
  }

  // For demo purposes, use a random client from the mock list
  const demoClients = [
    { id: "client_001", name: "John Doe" },
    { id: "client_002", name: "Jane Smith" },
    { id: "client_003", name: "Bob Johnson" },
    { id: "client_004", name: "Alice Williams" },
    { id: "client_005", name: "Charlie Brown" },
    { id: "client_006", name: "Diana Martinez" },
  ];

  // Use a consistent client per session
  let clientIndex = sessionStorage.getItem("omg_demo_client_index");
  if (!clientIndex) {
    clientIndex = String(Math.floor(Math.random() * demoClients.length));
    sessionStorage.setItem("omg_demo_client_index", clientIndex);
  }

  return demoClients[parseInt(clientIndex, 10)] || demoClients[0];
}

/**
 * Hook to track page views in the client portal.
 * Automatically records page views and duration when navigating between pages.
 *
 * Usage: Add to any client portal layout or page component:
 *   usePageTracking();
 */
export function usePageTracking() {
  const pathname = usePathname();
  const startTimeRef = useRef<number>(0);
  const currentViewIdRef = useRef<string | null>(null);

  useEffect(() => {
    // Only track client portal pages
    if (!pathname.startsWith("/portal/client")) return;

    const client = getCurrentClient();
    if (!client) return;

    const sessionId = getSessionId();
    const pageName = getPageName(pathname);

    // Record page view
    startTimeRef.current = Date.now();
    const view = recordPageView(client.id, client.name, pageName, pathname, sessionId);
    currentViewIdRef.current = view.id;

    // Update duration when leaving page
    return () => {
      if (currentViewIdRef.current && startTimeRef.current) {
        const duration = Math.round((Date.now() - startTimeRef.current) / 1000);
        updatePageDuration(currentViewIdRef.current, duration);
      }
    };
  }, [pathname]);
}

/**
 * Set the current client for tracking.
 * Call this after user authentication.
 */
export function setCurrentClient(clientId: string, clientName: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem("omg_current_client", JSON.stringify({ id: clientId, name: clientName }));
}

/**
 * Clear the current client (on logout).
 */
export function clearCurrentClient() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("omg_current_client");
  sessionStorage.removeItem("omg_session_id");
  sessionStorage.removeItem("omg_demo_client_index");
}
