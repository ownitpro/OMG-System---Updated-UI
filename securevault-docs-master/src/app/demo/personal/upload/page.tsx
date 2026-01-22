// src/app/demo/personal/upload/page.tsx
// Personal upload page with Portal button (Pro only)

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { loadPersonalPlan } from "@/app/lib/plan";

export default function Upload() {
  // Initialize with "starter" to match server render (prevents hydration mismatch)
  const [plan, setPlan] = useState<"starter" | "growth" | "pro">("starter");
  const isPro = plan === "pro";

  // Load plan from localStorage after hydration
  useEffect(() => {
    const storedPlan = loadPersonalPlan("starter");
    setPlan(storedPlan);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Upload</h1>
          <p className="text-sm text-white/70">Add files to your personal vault</p>
        </div>
        {isPro && (
          <Link
            href="/personal/portal"
            className="rounded-xl bg-[#3b82f6] hover:bg-[#3b82f6]/90 text-black px-6 py-3 text-base font-semibold transition"
          >
            Portal
          </Link>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="text-sm text-white/70 mb-4">
          Pick files to add to your personal vault (mock).
        </p>
        <input
          type="file"
          multiple
          className="block w-full max-w-lg rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#3b82f6] file:text-black hover:file:bg-[#3b82f6]/90 file:cursor-pointer"
        />
      </div>
    </div>
  );
}
