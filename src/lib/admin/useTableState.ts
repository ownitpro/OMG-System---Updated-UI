"use client";

import * as React from "react";

function key(tableId: string) {
  return `omg_table_state:${tableId}`;
}

export function useTableState<T extends Record<string, any>>(
  tableId: string,
  defaults: T
) {
  const [state, setState] = React.useState<T>(defaults);
  const [ready, setReady] = React.useState(false);

  // Load once
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(key(tableId));
      if (raw) {
        const parsed = JSON.parse(raw);
        setState({ ...defaults, ...parsed });
      } else {
        setState(defaults);
      }
    } catch {
      setState(defaults);
    } finally {
      setReady(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tableId]);

  // Save on change (after initial load)
  React.useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(key(tableId), JSON.stringify(state));
    } catch {}
  }, [ready, state, tableId]);

  function patch(p: Partial<T>) {
    setState((s) => ({ ...s, ...p }));
  }

  function reset() {
    setState(defaults);
    try {
      localStorage.removeItem(key(tableId));
    } catch {}
  }

  return { state, setState, patch, reset, ready };
}

