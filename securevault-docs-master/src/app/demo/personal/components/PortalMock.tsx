// app/demo/personal/components/PortalMock.tsx

"use client";

import { useState } from "react";

export default function PortalMock() {
  const [pin, setPin] = useState("");
  const [link, setLink] = useState<string | null>(null);
  const make = () => {
    const id = Math.random().toString(36).slice(2, 8).toUpperCase();
    const pin4 = ("0000" + Math.floor(Math.random() * 10000)).slice(-4);
    setPin(pin4);
    setLink(`/portal/login?token=${id}`);
  };
  return (
    <div className="rounded-2xl border p-4">
      <h3 className="font-semibold mb-2">Create Portal (mock)</h3>
      <button
        className="rounded-xl bg-primary text-primary-foreground px-4 py-2"
        onClick={make}
      >
        Generate PIN & Link
      </button>
      {link && (
        <div className="mt-3 text-sm">
          <div>
            <span className="font-mono">PIN:</span> <strong>{pin}</strong>
          </div>
          <div>
            <span className="font-mono">Link:</span>{" "}
            <a className="underline" href={link}>
              {link}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

