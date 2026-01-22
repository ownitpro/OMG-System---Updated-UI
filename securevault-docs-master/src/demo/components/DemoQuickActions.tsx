// src/demo/components/DemoQuickActions.tsx
// Quick actions component for demo business

"use client";

export function DemoQuickActions({ items }: { items: any[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {items.map((it) => (
        <button
          key={it.id}
          className="justify-start gap-2 w-full rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-left hover:bg-[#3b82f6]/10 hover:border-[#3b82f6]/30 transition text-white"
          onClick={() => alert(it.action || it.hint || "Action (mock)")}
        >
          <div className="text-sm font-medium">{it.title}</div>
          <div className="text-xs text-white/60">{it.hint}</div>
        </button>
      ))}
    </div>
  );
}

