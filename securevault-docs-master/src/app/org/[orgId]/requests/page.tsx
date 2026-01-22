import Page from "@/components/layout/Page";
import Link from "next/link";

type Props = {
  params: Promise<{ orgId: string }>;
};

export default async function OrgRequests({ params }: Props) {
  const { orgId } = await params;

  return (
    <Page
      title="Requests"
      actions={
        <Link
          href={`/org/${orgId}/requests/new`}
          className="btn btn-primary"
        >
          New Request
        </Link>
      }
    >
      <div className="card p-4">
        <p className="text-muted-foreground">
          Requests view coming soon. Use "New Request" to create document requests for client portals.
        </p>
      </div>
    </Page>
  );
}

