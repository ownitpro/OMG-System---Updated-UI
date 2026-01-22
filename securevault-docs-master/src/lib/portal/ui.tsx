// lib/portal/ui.tsx — shared UI components

import * as React from "react";

export function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
      <div className="bg-muted/40 rounded-2xl p-4 border border-border/40">{children}</div>
    </section>
  );
}

export function Footer() {
  return (
    <div className="text-xs text-muted-foreground mt-8 text-center py-6">
      Powered by OMGsystems • 2025
    </div>
  );
}

