import { StatusStrip } from '@/components/portal/StatusStrip';

export default function PortalStatus({ params }: { params: { portalId: string } }) {
  return (
    <main className="container max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Status</h1>
      <StatusStrip portalId={params.portalId} />
    </main>
  );
}

