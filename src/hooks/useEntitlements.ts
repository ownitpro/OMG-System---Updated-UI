"use client";

import { useEffect, useState } from "react";
import type { Entitlements } from "@/mock/entitlements";
import { getEntitlements } from "@/mock/entitlementStore";

export function useEntitlements() {
  const [entitlements, setEntitlements] = useState<Entitlements>(() => getEntitlements());

  useEffect(() => {
    // refresh once on mount
    setEntitlements(getEntitlements());

    // refresh whenever user returns to tab
    const onFocus = () => setEntitlements(getEntitlements());
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  return entitlements;
}
