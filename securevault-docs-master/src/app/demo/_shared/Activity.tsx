'use client';

export function ActivityList({ events }:{ events: any[] }){
  return (
    <div className="rounded-2xl bg-white/5 p-4">
      <div className="text-sm font-medium mb-2">Recent Activity</div>
      <ul className="space-y-2">
        {events.map((e)=> (
          <li key={e.id} className="rounded-xl bg-white/5 p-3">
            <div className="text-sm">{e.summary}</div>
            <div className="text-xs text-white/50">{new Date(e.ts).toLocaleString()}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

