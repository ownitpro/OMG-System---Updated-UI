import { RequestEditor } from '@/components/portal/RequestEditor';
import { ShareLink } from '@/components/portal/ShareLink';

type Props = {
  params: Promise<{ portalId: string }>;
};

export default async function PersonalPortalDetail({ params }: Props) {
  const { portalId } = await params;

  return (
    <main className="container max-w-5xl mx-auto p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Personal Portal</h1>
        </div>
      </header>
      
      <section className="space-y-2">
        <h3 className="font-medium">Share Link</h3>
        <ShareLink portalId={portalId} token={'demo-token'} />
      </section>
      
      <section>
        <RequestEditor portalId={portalId} />
      </section>
    </main>
  );
}

