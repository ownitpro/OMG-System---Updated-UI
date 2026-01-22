import Link from 'next/link';
import { seedPersonalDemo } from '@/lib/portal-db';

export default async function PersonalPortals() {
  seedPersonalDemo();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/personal/portals`, { cache: 'no-store' });
  const data = await res.json();

  return (
    <main className="container max-w-5xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Personal Portals</h1>
        <Link className="btn btn-primary" href={`/personal/portals/new`}>
          New Portal
        </Link>
      </div>
      <ul className="grid md:grid-cols-2 gap-3">
        {data.items?.map((p: any) => (
          <li key={p.id} className="p-4 rounded-2xl bg-black/5">
            <div className="font-medium">{p.externalName}</div>
            <div className="text-xs opacity-70">{p.status}</div>
            <Link className="btn mt-2" href={`/personal/portals/${p.id}`}>
              Open
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

