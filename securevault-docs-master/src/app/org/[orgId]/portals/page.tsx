import Link from 'next/link';
import { seedBusinessDemo } from '@/lib/portal-db';

type Props = {
  params: Promise<{ orgId: string }>;
};

export default async function OrgPortalsList({ params }: Props) {
  const { orgId } = await params;
  seedBusinessDemo();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  let portals: any[] = [];
  
  try {
    const res = await fetch(`${baseUrl}/api/org/${orgId}/portals`, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`);
      portals = [];
    } else {
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        // Handle both array and { items: [...] } formats
        portals = Array.isArray(data) ? data : (data.items || []);
      } else {
        console.error('Response is not JSON, received:', contentType);
        portals = [];
      }
    }
  } catch (error) {
    console.error('Error fetching portals:', error);
    portals = [];
  }

  return (
    <main className="container max-w-5xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Client Portals</h1>
        <Link className="btn btn-primary" href={`/org/${orgId}/portals/new`}>
          New Portal
        </Link>
      </div>
      <ul className="grid md:grid-cols-2 gap-3">
        {portals.map((p: any) => (
          <li key={p.id} className="p-4 rounded-2xl bg-black/5">
            <div className="font-medium">{p.name || p.externalName}</div>
            <div className="text-xs opacity-70">{p.status}</div>
            <Link className="btn mt-2" href={`/org/${orgId}/portals/${p.id}`}>
              Open
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
