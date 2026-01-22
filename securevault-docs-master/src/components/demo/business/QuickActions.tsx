// src/components/demo/business/QuickActions.tsx
// Quick actions component for business demo

"use client";

import * as React from "react";
import Link from "next/link";

const actions = [
  { id: "upload", title: "Upload", href: "/demo/business/documents?upload=1" },
  { id: "new_share", title: "New share link", href: "/demo/business/shares?new=1" },
  { id: "request_files", title: "Request files", href: "/demo/business/requests?new=1" },
  { id: "install_app", title: "Install App", href: "/demo/business/settings?tab=install" },
  { id: "try_ocr", title: "Try OCR Review", href: "/demo/business/documents?ocr=1" },
  {
    id: "create_portal",
    title: "Create Client Portal",
    href: "/demo/business/portals?new=1",
  },
  {
    id: "connect_qbo",
    title: "Connect QBO",
    href: "/demo/business/settings?tab=integrations",
  },
];

export function QuickActions() {
  return (
    <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {actions.map((a) => (
          <Link
            key={a.id}
            href={a.href}
            className="w-full rounded-2xl bg-zinc-950/60 border border-zinc-800 px-3 py-2 text-sm text-zinc-100 hover:border-blue-500 hover:bg-zinc-900 transition"
          >
            {a.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

