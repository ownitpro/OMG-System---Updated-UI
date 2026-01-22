// src/app/org/[orgId]/upload/page.tsx

"use client";

import * as React from "react";
import { Suspense } from "react";
import {
  presignOrgUpload,
  uploadViaPresign,
  ocrOrgPreview,
} from "@/lib/api/orgUploads";
import type { Vertical } from "@/lib/orgContext";
import { useSearchParams } from "next/navigation";

function Dropzone({ onFiles }: { onFiles: (files: File[]) => void }) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const files = Array.from(e.dataTransfer?.files ?? []);
      if (files.length) onFiles(files as File[]);
    };
    const handleOver = (e: DragEvent) => e.preventDefault();
    el.addEventListener("drop", handleDrop as any);
    el.addEventListener("dragover", handleOver as any);
    return () => {
      el.removeEventListener("drop", handleDrop as any);
      el.removeEventListener("dragover", handleOver as any);
    };
  }, [onFiles]);

  return (
    <div
      ref={ref}
      className="border-2 border-dashed rounded-2xl p-8 text-center"
    >
      <div className="text-sm opacity-70">
        Drag &amp; drop files here, or
      </div>
      <label className="inline-block mt-2 px-4 py-2 rounded-xl bg-blue-500 text-white cursor-pointer text-sm">
        Browse
        <input
          type="file"
          multiple
          className="hidden"
          onChange={(e) => {
            const files = Array.from(e.target.files ?? []);
            if (files.length) onFiles(files as File[]);
          }}
        />
      </label>
    </div>
  );
}

type Props = {
  params: Promise<{ orgId: string }>;
};

type Item = { name: string; size: number; status: string };

function OrgUploadContent({ params }: Props) {
  const [orgId, setOrgId] = React.useState<string>("");
  const searchParams = useSearchParams();
  const vertical: Vertical = (searchParams?.get("v") as Vertical) || "accounting";
  const [items, setItems] = React.useState<Item[]>([]);
  const [ocr, setOcr] = React.useState<{ name: string; text: string } | null>(
    null
  );

  React.useEffect(() => {
    params.then((p) => setOrgId(p.orgId));
  }, [params]);

  async function handleUpload(files: File[]) {
    if (!orgId) return;

    for (const f of files) {
      const presign = await presignOrgUpload(orgId, f);

      if (presign.mock) {
        setItems((prev) => [
          { name: f.name, size: f.size, status: "uploaded (mock)" },
          ...prev,
        ]);
        const o = await ocrOrgPreview(orgId, "mock-key", {
          name: f.name,
          vertical,
        });
        setOcr({ name: f.name, text: o.text });
        continue;
      }

      await uploadViaPresign(presign.url, f, presign.headers ?? {});

      setItems((prev) => [
        { name: f.name, size: f.size, status: "uploaded" },
        ...prev,
      ]);

      const o = await ocrOrgPreview(orgId, presign.key, {
        name: f.name,
        type: f.type,
        size: f.size,
        vertical,
      });
      setOcr({ name: f.name, text: o.text });
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <h1 className="text-xl font-semibold">Upload documents</h1>
      <p className="text-sm opacity-80">
        This upload screen is shared across all business verticals. In dev, it
        uses mock uploads by default so you can test freely.
      </p>
      <Dropzone onFiles={handleUpload} />

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
        {items.map((it) => (
          <div
            key={it.name + it.size + it.status}
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

export default function OrgUploadPage({ params }: Props) {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading...</div></div>}>
      <OrgUploadContent params={params} />
    </Suspense>
  );
}
