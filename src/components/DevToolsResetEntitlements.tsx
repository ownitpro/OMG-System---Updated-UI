"use client";

import { resetEntitlements } from "@/mock/entitlementStore";
import { BeakerIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export function DevToolsResetEntitlements() {
  // Only show in dev
  if (process.env.NODE_ENV === "production") return null;

  function onReset() {
    resetEntitlements();
    // Refresh UI state cleanly
    window.location.reload();
  }

  return (
    <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-xl p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
            <BeakerIcon className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Dev Tools</div>
            <div className="mt-1 text-sm text-white/60">
              Testing only. Reset all test purchases (local unlocks).
            </div>
          </div>
        </div>

        <button
          onClick={onReset}
          className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/20 px-3 py-2 text-sm font-semibold text-white hover:bg-white/20 transition-all"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="mt-3 text-xs text-white/40">
        Clears localStorage entitlements and reloads the page.
      </div>
    </div>
  );
}
