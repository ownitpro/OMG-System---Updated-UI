"use client";

import { useEffect, useState } from "react";
import type { Entitlements } from "@/mock/entitlements";
import { MOCK_ENTITLEMENTS } from "@/mock/entitlements";
import { getEntitlements } from "@/mock/entitlementStore";

export function useEntitlements() {
  // Initialize with MOCK_ENTITLEMENTS to ensure SSR and initial client render match
  // This prevents hydration mismatch since localStorage is only available on client
  const [entitlements, setEntitlements] = useState<Entitlements>(MOCK_ENTITLEMENTS);

  useEffect(() => {
    // Read from localStorage only after hydration is complete
    setEntitlements(getEntitlements());

    // Refresh whenever user returns to tab
    const onFocus = () => setEntitlements(getEntitlements());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return entitlements;
}
