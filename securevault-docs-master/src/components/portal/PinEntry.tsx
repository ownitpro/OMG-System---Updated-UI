// components/portal/PinEntry.tsx

"use client";

import React, { useState } from "react";

export function PinEntry({
  onSubmit,
  hint,
}: {
  onSubmit: (pin: string) => void;
  hint?: string;
}) {
  const [pin, setPin] = useState("");

  return (
    <div className="flex flex-col gap-3">
      <label className="text-sm text-white/70">Enter 6-digit PIN</label>
      <input
        inputMode="numeric"
        maxLength={6}
        value={pin}
        onChange={e =>
          setPin(e.target.value.replace(/\D/g, "").slice(0, 6))
        }
        className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/50 outline-none focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6]/50 transition"
        placeholder="••••••"
      />
      <div className="flex items-center gap-2">
        <button
          onClick={() => onSubmit(pin)}
          disabled={pin.length !== 6}
          className="rounded-xl bg-[#3b82f6] px-4 py-2 text-black font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
        {hint && (
          <span className="text-xs text-white/50">(dev hint: {hint})</span>
        )}
      </div>
    </div>
  );
}

