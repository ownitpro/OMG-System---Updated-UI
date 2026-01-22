// components/portal/UploadStub.tsx

"use client";

import React, { useMemo, useState } from "react";

type Item = { id: string; name: string; size: number; type: string };

export function UploadStub({
  existing = [],
  onUploaded,
}: {
  existing?: Item[];
  onUploaded?: (items: Item[]) => void;
}) {
  const [items, setItems] = useState<Item[]>(existing);
  const [busy, setBusy] = useState(false);

  const total = useMemo(() => items.reduce((a, b) => a + b.size, 0), [items]);

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-white/10 p-4 bg-white/5">
        <input
          type="file"
          multiple
          onChange={e => {
            const files = Array.from(e.target.files || []);
            setBusy(true);
            // Fake a small delay for UX; still no network calls
            setTimeout(() => {
              const next: Item[] = [
                ...items,
                ...files.map((f, i) => ({
                  id: `${Date.now()}-${i}`,
                  name: f.name,
                  size: f.size,
                  type: f.type,
                })),
              ];
              setItems(next);
              onUploaded?.(next);
              setBusy(false);
            }, 350);
          }}
          className="block w-full text-sm file:mr-3 file:rounded-lg file:border file:border-white/10 file:bg-white/5 file:px-3 file:py-2 file:text-white file:hover:bg-white/10"
        />
        {busy && (
          <p className="mt-2 text-sm text-white/50">Processing…</p>
        )}
      </div>

      <div className="rounded-xl border border-white/10">
        <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/5">
          <span className="text-sm font-medium text-white">Uploaded (mock)</span>
          <span className="text-xs text-white/50">
            {items.length} files • {(total / 1024).toFixed(1)} KB
          </span>
        </div>
        <ul className="max-h-56 overflow-auto divide-y divide-white/10">
          {items.map(it => (
            <li
              key={it.id}
              className="px-4 py-2 text-sm flex items-center justify-between text-white"
            >
              <span className="truncate">{it.name}</span>
              <span className="text-xs text-white/50">
                {(it.size / 1024).toFixed(1)} KB
              </span>
            </li>
          ))}
          {items.length === 0 && (
            <li className="px-4 py-6 text-sm text-white/50 text-center">
              No files yet.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

