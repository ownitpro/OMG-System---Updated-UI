// src/demo/components/DemoRecent.tsx
// Recent activity component for demo business

"use client";

export function DemoRecent({ events }: { events: any[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <div className="text-sm font-medium mb-2 text-white">Recent Activity</div>
      <ul className="space-y-2">
        {events.map((e) => (
          <li key={e.id} className="rounded-xl bg-black/20 border border-white/10 p-3">
            <div className="text-sm text-white">{e.summary}</div>
            <div className="text-xs text-white/60 mt-1">
              {e.actor} • {new Date(e.ts).toLocaleString()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

