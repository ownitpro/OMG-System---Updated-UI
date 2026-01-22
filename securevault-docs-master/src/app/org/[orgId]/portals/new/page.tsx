import { CreatePortalModal } from '@/components/portal/CreateModal';

type Props = {
  params: Promise<{ orgId: string }>;
};

export default async function NewPortal({ params }: Props) {
  const { orgId } = await params;

  return (
    <main className="container max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create Portal</h1>
      <CreatePortalModal orgId={orgId} />
    </main>
  );
}
