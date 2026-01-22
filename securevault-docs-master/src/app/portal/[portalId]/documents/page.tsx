// app/portal/[portalId]/documents/page.tsx

import React from "react";
import { listMockDocs } from "@/lib/mockPortalDb";

type Props = {
  params: Promise<{ portalId: string }>;
};

export default async function PortalDocs({ params }: Props) {
  const { portalId } = await params;
  const docs = listMockDocs(portalId);

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Documents</h1>
      <div className="rounded-2xl border divide-y">
        {docs.length === 0 && (
          <div className="p-4 text-sm text-muted-foreground">No documents yet.</div>
        )}
        {docs.map(d => (
          <div key={d.id} className="p-4 flex items-center justify-between">
            <div className="truncate">
              <div className="font-medium truncate">{d.name}</div>
              <div className="text-xs text-muted-foreground">{new Date(d.ts).toLocaleString()}</div>
            </div>
            <a className="text-sm underline underline-offset-4" href="#">
              Download (mock)
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

