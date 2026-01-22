// app/demo/personal/components/Tabs.tsx

"use client";

import { useState } from "react";
import { ProPortalTab } from "@/components/personal/ProPortalTab";

export function Tabs({ showPortal }: { showPortal: boolean }) {
  const base = [
    { key: "overview", label: "Overview" },
    { key: "vault", label: "Vault" },
  ];
  const tabs = showPortal ? [...base, { key: "portal", label: "Portal" }] : base;
  const [active, setActive] = useState(tabs[0].key);

  return (
    <div>
      <div className="flex gap-2 border-b mb-4">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`px-3 py-2 rounded-t-xl ${
              active === t.key
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {active === "overview" && (
        <div className="grid md:grid-cols-3 gap-4">
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">Uploads this week</div>
            <div className="text-2xl font-semibold">42</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">OCR pages</div>
            <div className="text-2xl font-semibold">118</div>
          </div>
          <div className="rounded-2xl border p-4">
            <div className="text-sm text-muted-foreground">Storage used</div>
            <div className="text-2xl font-semibold">1.8 GB</div>
          </div>
        </div>
      )}

      {active === "vault" && (
        <div className="rounded-2xl border p-4">
          <h3 className="font-semibold mb-2">Vault</h3>
          <ul className="grid md:grid-cols-3 gap-3 text-sm">
            <li className="rounded-xl bg-muted p-3">ID Documents</li>
            <li className="rounded-xl bg-muted p-3">Home Bills</li>
            <li className="rounded-xl bg-muted p-3">Entertainment</li>
            <li className="rounded-xl bg-muted p-3">Taxes</li>
            <li className="rounded-xl bg-muted p-3">Receipts</li>
            <li className="rounded-xl bg-muted p-3">Insurance</li>
          </ul>
        </div>
      )}

      {showPortal && active === "portal" && <ProPortalTab />}
    </div>
  );
}

