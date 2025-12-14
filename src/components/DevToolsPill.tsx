"use client";

import { useEffect, useState } from "react";
import { resetEntitlements, activateAllProducts, lockAllProducts } from "@/mock/entitlementStore";

function CloseIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6 6l12 12M18 6l-12 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DevToolsPill() {
  // Only show in dev
  if (process.env.NODE_ENV === "production") return null;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (!open) return;
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function onReset() {
    resetEntitlements();
    window.location.reload();
  }

  function onUnlockAll() {
    activateAllProducts();
    window.location.reload();
  }

  function onLockAll() {
    lockAllProducts();
    window.location.reload();
  }

  return (
    <>
      {/* Pill */}
      <button
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-zinc-50"
        aria-label="Open Dev Tools"
        title="Dev Tools"
      >
        <span aria-hidden="true">⚙</span>
        <span className="hidden sm:inline">Dev Tools</span>
      </button>

      {/* Modal */}
      {open ? (
        <div className="fixed inset-0 z-50">
          {/* overlay */}
          <button
            className="absolute inset-0 bg-black/30"
            onClick={() => setOpen(false)}
            aria-label="Close Dev Tools overlay"
          />

          {/* modal card */}
          <div className="relative mx-auto mt-24 w-[92%] max-w-md rounded-2xl border border-zinc-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-zinc-200 px-4 py-4">
              <div>
                <div className="text-sm text-zinc-500">Dev Tools</div>
                <div className="text-lg font-semibold">Testing Controls</div>
              </div>

              <button
                className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white p-2 hover:bg-zinc-50"
                onClick={() => setOpen(false)}
                aria-label="Close Dev Tools"
              >
                <CloseIcon />
              </button>
            </div>

            <div className="px-4 py-4">
              <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-4">
                <div className="text-sm font-semibold">Reset test purchases</div>
                <div className="mt-1 text-sm text-zinc-600">
                  Reset purchases or unlock everything for testing. (Dev only)
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={onReset}
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
                  >
                    Reset purchases
                  </button>

                  <button
                    onClick={onLockAll}
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
                  >
                    Lock all (test)
                  </button>

                  <button
                    onClick={onUnlockAll}
                    className="rounded-xl bg-zinc-900 px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800"
                  >
                    Unlock all (test)
                  </button>

                  <button
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold hover:bg-zinc-50"
                  >
                    Close
                  </button>
                </div>

                <div className="mt-3 text-xs text-zinc-500">
                  Dev only. This will not appear in production.
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

