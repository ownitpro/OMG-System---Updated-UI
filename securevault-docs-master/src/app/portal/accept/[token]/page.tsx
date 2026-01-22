// app/portal/accept/[token]/page.tsx

import { redirect } from "next/navigation";

async function verifyToken(token: string) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/mock/portal/verify-token?token=${encodeURIComponent(token)}`, {
    cache: "no-store",
  });
  return res.json();
}

type Props = {
  params: Promise<{ token: string }>;
};

export default async function AcceptInvite({ params }: Props) {
  const { token } = await params;
  const data = await verifyToken(token);
  if (!data?.ok) {
    redirect("/portal/login?err=invalid_token");
  }
  redirect(`/portal/${data.portalId}`);
}

