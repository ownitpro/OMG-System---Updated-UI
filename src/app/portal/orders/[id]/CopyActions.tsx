"use client";

import * as React from "react";

export default function CopyActions({ orderId, email }: { orderId: string; email: string }) {
  const [msg, setMsg] = React.useState("");

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setMsg(`${label} copied`);
      window.setTimeout(() => setMsg(""), 1200);
    } catch {
      setMsg("Copy failed");
      window.setTimeout(() => setMsg(""), 1200);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {msg ? <span className="text-xs text-[#47BD79]">{msg}</span> : null}

      <button
        onClick={() => copy(orderId, "Order ID")}
        className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all"
        type="button"
      >
        Copy Order ID
      </button>

      <button
        onClick={() => copy(email, "Email")}
        className="rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm text-white hover:bg-white/10 transition-all"
        type="button"
      >
        Copy Email
      </button>
    </div>
  );
}

