"use client";

import { resetEntitlements } from "@/mock/entitlementStore";

export function DevToolsResetEntitlements() {
  // Only show in dev
  if (process.env.NODE_ENV === "production") return null;

  function onReset() {
    resetEntitlements();
    // Refresh UI state cleanly
    window.location.reload();
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Dev Tools</div>
          <div className="mt-1 text-sm text-zinc-600">
            Testing only. Reset all test purchases (local unlocks).
          </div>
        </div>

        <button
          onClick={onReset}
          className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-semibold hover:bg-zinc-50"
        >
          Reset test purchases
        </button>
      </div>

      <div className="mt-2 text-xs text-zinc-500">
        Clears localStorage entitlements and reloads the page.
      </div>
    </div>
  );
}

