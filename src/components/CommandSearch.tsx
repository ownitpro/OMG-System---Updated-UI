"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

export type CommandItem = {
  label: string;
  description?: string;
  kind: "internal" | "external";
  href: string;
};

export function CommandSearch({ items }: { items: CommandItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    const base = query
      ? items.filter((i) => {
          const hay = `${i.label} ${i.description ?? ""}`.toLowerCase();
          return hay.includes(query);
        })
      : items;

    return base.slice(0, 12);
  }, [q, items]);

  const go = React.useCallback((item: CommandItem) => {
    setOpen(false);
    if (item.kind === "internal") router.push(item.href);
    else window.location.href = item.href;
  }, [router]);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const isK = e.key.toLowerCase() === "k";
      const isCmdK = (e.metaKey || e.ctrlKey) && isK;

      if (isCmdK) {
        e.preventDefault();
        setOpen(true);
        return;
      }

      if (!open) return;

      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((v) => Math.min(v + 1, Math.max(filtered.length - 1, 0)));
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((v) => Math.max(v - 1, 0));
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const item = filtered[activeIndex];
        if (!item) return;
        go(item);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, filtered, activeIndex, go]);

  useEffect(() => {
    if (!open) {
      setQ("");
      setActiveIndex(0);
    }
  }, [open]);

  useEffect(() => {
    function onOpenCommand() {
      setOpen(true);
    }
    document.addEventListener("open-command", onOpenCommand);
    return () => document.removeEventListener("open-command", onOpenCommand);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:items-start md:pt-24">
      {/* overlay */}
      <button
        className="absolute inset-0 bg-black/30"
        onClick={() => setOpen(false)}
        aria-label="Close command search"
      />

      {/* modal */}
      <div className="relative mx-auto mt-20 w-[92%] max-w-xl rounded-2xl border border-zinc-200 bg-white shadow-xl">
        <div className="border-b border-zinc-200 p-3">
          <input
            autoFocus
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActiveIndex(0);
            }}
            placeholder="Type to search… (CRM, Docs, Leads, Billing)"
            className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-zinc-200"
          />
          <div className="mt-2 text-xs text-zinc-500">
            Use ↑ ↓ to move • Enter to open • Esc to close
          </div>
        </div>

        <div className="max-h-[420px] overflow-auto p-2">
          {filtered.length === 0 ? (
            <div className="rounded-xl px-3 py-10 text-center text-sm text-zinc-600">
              No matches. Try a different word.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <button
                key={item.label + item.href}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => go(item)}
                className={`w-full rounded-xl px-3 py-3 text-left ${
                  idx === activeIndex ? "bg-zinc-100" : "hover:bg-zinc-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{item.label}</div>
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600">
                    {item.kind === "internal" ? "Portal" : "App"}
                  </span>
                </div>
                {item.description ? (
                  <div className="mt-1 text-sm text-zinc-600">{item.description}</div>
                ) : null}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

