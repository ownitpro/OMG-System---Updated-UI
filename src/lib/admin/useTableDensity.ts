"use client";

import * as React from "react";
import { readAdminSettings } from "@/lib/admin/adminSettings";

type Density = "comfortable" | "compact";

function key(tableId: string) {
  return `omg_table_density:${tableId}`;
}

function readLocal(tableId: string): Density | null {
  try {
    const raw = localStorage.getItem(key(tableId));
    if (raw === "compact" || raw === "comfortable") return raw;
    return null;
  } catch {
    return null;
  }
}

function writeLocal(tableId: string, value: Density | null) {
  try {
    if (value === null) localStorage.removeItem(key(tableId));
    else localStorage.setItem(key(tableId), value);
  } catch {}
}

function globalDefault(): Density {
  return readAdminSettings().compactTables ? "compact" : "comfortable";
}

export function useTableDensity(tableId: string) {
  const [density, setDensity] = React.useState<Density>("comfortable");
  const [isOverride, setIsOverride] = React.useState(false);

  const sync = React.useCallback(() => {
    const local = readLocal(tableId);
    if (local) {
      setDensity(local);
      setIsOverride(true);
    } else {
      setDensity(globalDefault());
      setIsOverride(false);
    }
  }, [tableId]);

  React.useEffect(() => {
    sync();

    const onUpdated = () => sync();
    window.addEventListener("omg-admin-settings-updated", onUpdated);
    window.addEventListener("storage", onUpdated);

    return () => {
      window.removeEventListener("omg-admin-settings-updated", onUpdated);
      window.removeEventListener("storage", onUpdated);
    };
  }, [sync]);

  function toggle() {
    const next: Density = density === "compact" ? "comfortable" : "compact";
    // write override explicitly
    writeLocal(tableId, next);
    setDensity(next);
    setIsOverride(true);
  }

  function clearOverride() {
    writeLocal(tableId, null);
    sync();
  }

  return { density, isOverride, toggle, clearOverride };
}

