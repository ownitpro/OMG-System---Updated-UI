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
      {msg ? <span className="text-xs text-zinc-600">{msg}</span> : null}

      <button
        onClick={() => copy(orderId, "Order ID")}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
        type="button"
      >
        Copy Order ID
      </button>

      <button
        onClick={() => copy(email, "Email")}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-white"
        type="button"
      >
        Copy Email
      </button>
    </div>
  );
}

