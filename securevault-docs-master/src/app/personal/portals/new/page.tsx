import { CreatePortalModal } from '@/components/portal/CreateModal';

export default function PersonalNewPortal() {
  return (
    <main className="container max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create Personal Portal</h1>
      <CreatePortalModal personalId="personal_demo" />
    </main>
  );
}

