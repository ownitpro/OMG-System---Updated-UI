// src/app/s/[token]/page.tsx

"use client";

import * as React from "react";

async function fetchShare(token: string, pin?: string) {
  const query = pin ? `?pin=${encodeURIComponent(pin)}` : "";
  const res = await fetch(`/api/shares/${token}${query}`);
  return res.json();
}

type Props = {
  params: Promise<{ token: string }>;
};

export default function ShareViewerPage({ params }: Props) {
  const [token, setToken] = React.useState<string>("");
  const [pin, setPin] = React.useState("");
  const [data, setData] = React.useState<any | null>(null);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    params.then((p) => setToken(p.token));
  }, [params]);

  React.useEffect(() => {
    if (!token) return;
    (async () => {
      const out = await fetchShare(token);
      if (out.error) setErr(out.error);
      else setData(out);
    })();
  }, [token]);

  async function submitPin() {
    const out = await fetchShare(token, pin);
    if (out.error) {
      setErr(out.error);
      setData(null);
    } else {
      setErr(null);
      setData(out);
    }
  }

  if (!data) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-4">
        <h1 className="text-xl font-semibold">Secure share</h1>
        {err && (
          <div className="rounded-xl border p-3 text-sm text-red-600">
            {err}
          </div>
        )}
        <div className="rounded-2xl border p-4 space-y-3">
          <div className="text-sm">
            Enter PIN (if the sender gave you one), then click Open.
          </div>
          <input
            className="w-full rounded-xl border p-2 text-sm"
            placeholder="PIN (optional)"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
          />
          <button
            type="button"
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-sm"
            onClick={submitPin}
          >
            Open
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">
          {data.label || "Shared documents"}
        </h1>
        <span className="text-xs opacity-70">
          Expires: {new Date(data.expiresAt).toLocaleString()}
        </span>
      </div>
      <div className="grid gap-3">
        {(data.docs || []).map((d: any) => (
          <div
            key={d.id}
            className="rounded-xl border p-3 text-sm space-y-1"
          >
            <div className="font-medium">{d.name}</div>
            <div className="text-xs opacity-70">
              {d.sizeKB} KB • Watermarked
            </div>
            {data.allowDownload ? (
              <a
                className="text-xs underline"
                href={`/api/shares/${token}/download?doc=${encodeURIComponent(
                  d.id
                )}${pin ? `&pin=${encodeURIComponent(pin)}` : ""}`}
              >
                Download
              </a>
            ) : (
              <div className="text-xs opacity-70">
                Downloads disabled for this link.
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

