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
      ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
      : state === "Locked"
      ? "bg-white/10 text-white/60 border-white/20"
      : "bg-amber-500/20 text-amber-400 border-amber-500/30";

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">
      <h2 className="text-sm font-semibold text-white">Related info</h2>

      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/50">Client</div>
          <div className="mt-1 text-sm font-medium text-white">{clientEmail}</div>

          <div className="mt-2 flex gap-2">
            <a
              href={`/portal/clients/${clientId}`}
              className="rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-all"
            >
              View client
            </a>
            <a
              href={`/portal/clients`}
              className="rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-all"
            >
              All clients
            </a>
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-3">
          <div className="text-xs text-white/50">Product</div>
          <div className="mt-1 text-sm font-medium text-white">{productName}</div>

          <div className="mt-2 flex flex-wrap items-center gap-2">
            <a
              href={`/products/${productId}`}
              className="rounded-xl border border-white/20 bg-white/5 px-2.5 py-1.5 text-xs font-medium text-white hover:bg-white/10 transition-all"
            >
              View product page
            </a>

            <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${pill}`}>
              Entitlement: {state}
            </span>
          </div>

          <div className="mt-2 text-xs text-white/50">
            Week 1 peek reads: <span className="font-mono">localStorage.omg_entitlements</span>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
        <div className="text-xs text-white/50">Order ID</div>
        <div className="mt-1 font-mono text-sm text-white">{orderId}</div>
      </div>
    </div>
  );
}

