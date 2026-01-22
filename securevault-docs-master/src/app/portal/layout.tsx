// app/portal/layout.tsx
// Portal layout - no header navigation (clean client experience)

import React from "react";

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main>{children}</main>
    </div>
  );
}

