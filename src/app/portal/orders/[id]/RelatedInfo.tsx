"use client";

import * as React from "react";

function entitlementKeyFromProductId(productId: string) {
  // Week 1 mapping: "securevault-docs" -> "securevault_docs"
  return productId.replaceAll("-", "_");
}

function readEntitlements() {
  try {
    const raw = localStorage.getItem("omg_entitlements");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export default function RelatedInfo({
  orderId,
  clientId,
  clientEmail,
  productId,
  productName,
}: {
  orderId: string;
  clientId: string;
  clientEmail: string;
  productId: string;
  productName: string;
}) {
  const [state, setState] = React.useState<"Active" | "Locked" | "Unknown">("Unknown");

  React.useEffect(() => {
    const entitlements = readEntitlements();
    const key = entitlementKeyFromProductId(productId);
    setState(entitlements?.[key] ? "Active" : "Locked");
  }, [productId]);

  const pill =
    state === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
      : state === "Locked"
      ? "bg-slate-50 text-slate-700 border-slate-200"
      : "bg-amber-50 text-amber-700 border-amber-200";

  return (
    <div className="rounded-xl border bg-white p-4">
      <h2 className="text-sm font-semibold">Related info</h2>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-lg border p-3">
          <div className="text-xs text-muted-foreground">Client</div>
          <div className="mt-1 text-sm font-medium">{clientEmail}</div>

          <div className="mt-2 flex gap-2">
            <a
              href={`/portal/clients/${clientId}`}
              className="rounded-lg border px-2.5 py-1.5 text-xs font-medium hover:bg-white"
            >
              View client
            </a>
            <a
              href={`/portal/clients`}
              className="rounded-lg border px-2.5 py-1.5 text-xs font-medium hover:bg-white"
            >
              All clients
            </a>
          </div>
        </div>

        <div className="rounded-lg border p-3">
          <div className="text-xs text-muted-foreground">Product</div>
          <div className="mt-1 text-sm font-medium">{productName}</div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <a
              href={`/products/${productId}`}
              className="rounded-lg border px-2.5 py-1.5 text-xs font-medium hover:bg-white"
            >
              View product page
            </a>

            <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${pill}`}>
              Entitlement: {state}
            </span>
          </div>

          <div className="mt-2 text-xs text-muted-foreground">
            Week 1 peek reads: <span className="font-mono">localStorage.omg_entitlements</span>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-lg border bg-slate-50 p-3">
        <div className="text-xs text-muted-foreground">Order ID</div>
        <div className="mt-1 font-mono text-sm">{orderId}</div>
      </div>
    </div>
  );
}

