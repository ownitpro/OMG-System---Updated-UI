import { RequestEditor } from '@/components/portal/RequestEditor';
import { ShareLink } from '@/components/portal/ShareLink';
import { RevokeButton } from '@/components/portal/RevokeButton';

type Props = {
  params: Promise<{ orgId: string; portalId: string }>;
};

async function getPortal(orgId: string, portalId: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  try {
    const res = await fetch(`${baseUrl}/api/org/${orgId}/portals`, { cache: 'no-store' });
    
    if (!res.ok) {
      console.error(`API error: ${res.status} ${res.statusText}`);
      return null;
    }
    
    const contentType = res.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Response is not JSON, received:', contentType);
      return null;
    }
    
    const data = await res.json();
    // Handle both array and { items: [...] } formats
    const portals = Array.isArray(data) ? data : (data.items || []);
    return portals.find((p: any) => p.id === portalId);
  } catch (error) {
    console.error('Error fetching portal:', error);
    return null;
  }
}

export default async function PortalDetail({ params }: Props) {
  const { orgId, portalId } = await params;
  const portal = await getPortal(orgId, portalId);
  const token = 'demo-token'; // mock display; real token returned at creation

  return (
    <main className="container max-w-5xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{portal?.externalName || 'Portal'}</h1>
          <p className="text-sm opacity-70">Status: {portal?.status}</p>
        </div>
        <RevokeButton portalId={portalId} />
      </header>
      
      <section className="space-y-2">
        <h3 className="font-medium">Share Link</h3>
        <ShareLink portalId={portalId} token={token} />
      </section>
      
      <section>
        <RequestEditor portalId={portalId} />
      </section>
    </main>
  );
}

