"use client";

import * as React from "react";

function key(tableId: string) {
  return `omg_last_opened:${tableId}`;
}

export function useLastOpened(tableId: string) {
  const [lastId, setLastId] = React.useState<string | null>(null);

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key(tableId));
      setLastId(raw || null);
    } catch {
      setLastId(null);
    }
  }, [tableId]);

  function remember(id: string | null) {
    setLastId(id);
    try {
      if (!id) localStorage.removeItem(key(tableId));
      else localStorage.setItem(key(tableId), id);
    } catch {}
  }

  function clear() {
    remember(null);
  }

  return { lastId, remember, clear };
}

