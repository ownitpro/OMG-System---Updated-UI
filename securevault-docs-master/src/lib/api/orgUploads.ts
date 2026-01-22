// src/lib/api/orgUploads.ts

export async function presignOrgUpload(orgId: string, file: File) {
  const res = await fetch(`/api/org/${orgId}/upload/presign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: file.name,
      type: file.type,
      size: file.size,
    }),
  });
  return res.json();
}

export async function uploadViaPresign(
  url: string,
  file: File,
  headers: Record<string, string> = {}
) {
  return fetch(url, { method: "PUT", body: file, headers });
}

export async function ocrOrgPreview(
  orgId: string,
  key: string,
  meta: Record<string, unknown> = {}
) {
  const res = await fetch(`/api/org/${orgId}/ocr/preview`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, ...meta }),
  });
  return res.json();
}

