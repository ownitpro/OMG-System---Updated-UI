// app/api/mock/portal/[portalId]/upload/route.ts (POST files)

import { NextRequest, NextResponse } from "next/server";
import { addMockDocs } from "@/lib/mockPortalDb";

type Props = {
  params: Promise<{ portalId: string }>;
};

export async function POST(req: NextRequest, { params }: Props) {
  const { portalId } = await params;
  const form = await req.formData();
  const files = form.getAll("files");
  const names = files.map((f: any, i: number) => (f?.name ? f.name : `file_${i + 1}.bin`));
  addMockDocs(portalId, names);
  return NextResponse.json({ ok: true, message: `Uploaded ${names.length} file(s) (mock).` });
}

