// components/personal/ProPortalTab.tsx

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PortalStore } from "@/lib/mock/portalStore";

export function ProPortalTab() {
  const [last, setLast] = useState<{
    token: string;
    pin: string;
    url: string;
  } | null>(null);

  function handleGenerate() {
    const invite = PortalStore.createInvite("Demo Personal – Guest");
    const url = `/portal/login?token=${invite.token}`;
    setLast({ token: invite.token, pin: invite.pin, url });
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-white/10 p-4 bg-white/5">
        <h3 className="font-semibold mb-1 text-white">Create Portal Link (Demo)</h3>
        <p className="text-sm text-white/70 mb-3">
          Generates a client link + PIN. No emails sent — copy the link and PIN
          below.
        </p>
        <button
          onClick={handleGenerate}
          className="rounded-xl bg-[#3b82f6] px-4 py-2 text-black font-semibold hover:opacity-90 transition"
        >
          Generate Link
        </button>
        {last && (
          <div className="mt-4 rounded-xl border border-white/10 p-3 bg-white/5 text-sm">
            <div className="text-white">
              <span className="font-medium">Link:</span>{" "}
              <Link
                href={last.url}
                className="underline break-all text-[#3b82f6] hover:text-[#3b82f6]/80"
              >
                {last.url}
              </Link>
            </div>
            <div className="text-white mt-2">
              <span className="font-medium">PIN:</span> {last.pin}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-white/10 p-3 bg-white/5">
        <p className="text-xs text-white/50">Powered by OMGsystems • 2025</p>
      </div>
    </div>
  );
}

