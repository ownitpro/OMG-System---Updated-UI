"use client";

import * as React from "react";

function key(tableId: string) {
  return `omg_table_scroll:${tableId}`;
}

export function useTableScrollRestore(tableId: string) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  // Restore on mount
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    try {
      const raw = localStorage.getItem(key(tableId));
      const value = raw ? Number(raw) : 0;
      if (!Number.isNaN(value)) el.scrollTop = value;
    } catch {}
  }, [tableId]);

  // Save on scroll (throttled via rAF)
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;

    function onScroll() {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        if (!el) return;
        try {
          localStorage.setItem(key(tableId), String(el.scrollTop));
        } catch {}
      });
    }

    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [tableId]);

  function resetScroll() {
    try {
      localStorage.removeItem(key(tableId));
    } catch {}
    if (ref.current) ref.current.scrollTop = 0;
  }

  return { scrollRef: ref, resetScroll };
}

