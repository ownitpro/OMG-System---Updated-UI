// Redirect to admin page (settings is alias for admin)
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ orgId: string }>;
};

export default async function OrgSettings({ params }: Props) {
  const { orgId } = await params;
  redirect(`/org/${orgId}/admin`);
}

