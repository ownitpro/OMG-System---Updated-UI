// src/components/dashboard/QuickActions.tsx

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Vertical } from "@/lib/orgContext";

type QuickActionsProps = {
  orgId: string;
  vertical?: Vertical;
};

export function QuickActions({ orgId, vertical }: QuickActionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const v =
    vertical ||
    ((searchParams?.get("v") as Vertical | null) ?? "accounting");

  function go(path: string) {
    router.push(path);
  }

  const cards: { id: string; label: string; hint?: string }[] = [
    { id: "upload", label: "Upload" },
    { id: "new_share", label: "New share link" },
    { id: "create_client_portal", label: "Create client portal" },
    { id: "send_request_docs", label: "Send request for docs" },
  ];

  if (v === "accounting") {
    cards.push({
      id: "connect_qbo",
      label: "Connect QBO (coming soon)",
    });
  }

  return (
    <div className="rounded-2xl border bg-card text-card-foreground p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold">Quick actions</h2>
        <span className="text-[11px] uppercase tracking-wide opacity-60">
          {v.replace("_", " ")}
        </span>
      </div>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <button
            key={c.id}
            type="button"
            className="rounded-xl border bg-background px-3 py-2 text-left text-sm hover:shadow-sm transition"
            onClick={() => {
              if (c.id === "upload") {
                go(`/org/${orgId}/upload?v=${v}`);
                return;
              }
              if (c.id === "new_share") {
                go(`/org/${orgId}/shares/new?v=${v}`);
                return;
              }
              if (c.id === "create_client_portal") {
                go(`/org/${orgId}/portals/new?v=${v}`);
                return;
              }
              if (c.id === "send_request_docs") {
                go(`/org/${orgId}/requests/new?v=${v}`);
                return;
              }
              if (c.id === "connect_qbo") {
                alert("QBO connection will be wired in a later pass.");
              }
            }}
          >
            <div className="font-medium">{c.label}</div>
            {c.hint && (
              <div className="text-xs mt-0.5 opacity-70">{c.hint}</div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

