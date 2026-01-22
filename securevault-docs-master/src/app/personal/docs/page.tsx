// src/app/personal/docs/page.tsx

"use client";

import * as React from "react";

function Drop({ onFiles }: { onFiles: (files: File[]) => void }) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current!;
    function onDrop(e: DragEvent) {
      e.preventDefault();
      onFiles(Array.from(e.dataTransfer!.files));
    }
    function onOver(e: DragEvent) {
      e.preventDefault();
    }
    el.addEventListener("drop", onDrop as any);
    el.addEventListener("dragover", onOver as any);
    return () => {
      el.removeEventListener("drop", onDrop as any);
      el.removeEventListener("dragover", onOver as any);
    };
  }, [onFiles]);

  return (
    <div ref={ref} className="border-2 border-dashed rounded-2xl p-8 text-center">
      <div className="text-sm opacity-70">Drag & drop files here, or</div>
      <label className="inline-block mt-2 px-4 py-2 rounded-xl bg-blue-500 text-white cursor-pointer">
        Browse
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => onFiles(Array.from(e.target.files || []))}
        />
      </label>
    </div>
  );
}

type Item = { name: string; size: number; status: string };

export default function PersonalDocsPage() {
  const [items, setItems] = React.useState<Item[]>([]);
  const [ocr, setOcr] = React.useState<{ name: string; text: string } | null>(
    null
  );

  async function upload(files: File[]) {
    for (const f of files) {
      // 1) ask backend for presign (mock or real)
      const presign = await fetch("/api/personal/upload/presign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: f.name, type: f.type, size: f.size }),
      }).then((r) => r.json());

      if (presign.mock) {
        // dev-only path (no AWS)
        setItems((prev) => [
          { name: f.name, size: f.size, status: "uploaded (mock)" },
          ...prev,
        ]);
        const o = await fetch("/api/personal/ocr/preview", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: f.name }),
        }).then((r) => r.json());
        setOcr({ name: f.name, text: o.text });
        continue;
      }

      // 2) PUT to S3 using presigned URL
      await fetch(presign.url, {
        method: "PUT",
        body: f,
        headers: presign.headers || {},
      });

      setItems((prev) => [
        { name: f.name, size: f.size, status: "uploaded" },
        ...prev,
      ]);

      // 3) OCR preview (real if enabled)
      const o = await fetch("/api/personal/ocr/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          key: presign.key,
          name: f.name,
          type: f.type,
          size: f.size,
        }),
      }).then((r) => r.json());
      setOcr({ name: f.name, text: o.text });
    }
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Documents</h1>
      <Drop onFiles={upload} />

      {ocr && (
        <div className="rounded-2xl border p-4">
          <div className="text-sm font-semibold mb-1">
            OCR preview — {ocr.name}
          </div>
          <pre className="text-xs whitespace-pre-wrap opacity-90">
            {ocr.text}
          </pre>
        </div>
      )}

      <div className="grid gap-2">
        {items.map((it, i) => (
          <div
            key={i}
            className="rounded-xl border p-3 flex items-center justify-between"
          >
            <div className="text-sm">{it.name}</div>
            <div className="text-xs opacity-70">
              {Math.round(it.size / 1024)} KB • {it.status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

