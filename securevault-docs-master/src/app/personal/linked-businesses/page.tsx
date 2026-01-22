// app/personal/linked-businesses/page.tsx (Personal Pro preview)

import React from "react";
import Link from "next/link";

export default function LinkedBusinessesPreview() {
  // Demo: up to 2 linked businesses visible; up to 3 seats total in Personal Pro
  const linked = [
    { id: "biz_1", name: "Akindolire Holdings", role: "Owner", docs: 42 },
    { id: "biz_2", name: "Maple Homes", role: "Admin", docs: 19 },
  ];
  const seats = { used: 3, cap: 3 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Linked Business Spaces</h1>
        <p className="text-sm text-muted-foreground">
          Personal Pro can link up to 2 businesses and 3 seats total.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {linked.map(b => (
          <Link
            key={b.id}
            href={`/portal/${b.id}`}
            className="rounded-2xl border p-4 hover:bg-muted/50"
          >
            <div className="font-medium">{b.name}</div>
            <div className="text-sm text-muted-foreground">
              Role: {b.role} • Docs: {b.docs}
            </div>
          </Link>
        ))}
      </div>
      <div className="rounded-2xl border p-4 text-sm">
        Seats: {seats.used} / {seats.cap}
      </div>
    </div>
  );
}

