// app/admin/demos.csv/route.ts
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

function parse(params: URLSearchParams) {
  const get = (k: string) => params.get(k) || "";
  const take = Math.min(Math.max(parseInt(get("take") || "2000", 10), 100), 10000); // cap CSV
  return {
    app: get("app"),
    industry: get("industry"),
    mode: get("mode"),
    date_from: get("date_from"),
    date_to: get("date_to"),
    q: get("q"),
    take,
  };
}

function whereClause({ app, industry, mode, date_from, date_to, q }: ReturnType<typeof parse>) {
  const where: any = {};
  if (app) where.appSlug = app;
  if (industry) where.industry = { contains: industry, mode: "insensitive" };
  if (mode) {
    where.AND ??= [];
    where.AND.push({ answers: { path: ["mode"], equals: mode } });
  }
  if (q) {
    where.OR = [
      { answers: { path: ["message"], string_contains: q } },
      { answers: { path: ["budget"], string_contains: q } },
      { answers: { path: ["timeline"], string_contains: q } },
      { answers: { path: ["source"], string_contains: q } },
    ];
  }
  if (date_from || date_to) {
    const from = date_from ? new Date(date_from + "T00:00:00Z") : undefined;
    const to = date_to ? new Date(date_to + "T23:59:59Z") : undefined;
    where.bookedAt = {
      ...(from ? { gte: from } : {}),
      ...(to ? { lte: to } : {}),
    };
  }
  return where;
}

export async function GET(req: Request) {
  // TODO: protect route with admin guard
  const { searchParams } = new URL(req.url);
  const f = parse(searchParams);
  const where = whereClause(f);

  const rows = await prisma.demoRequest.findMany({
    where,
    include: { lead: { select: { contact: true, email: true, source: true } } },
    orderBy: { bookedAt: "desc" },
    take: f.take,
  });

  const header = [
    "id",
    "bookedAt",
    "app",
    "industry",
    "mode",
    "lead_contact",
    "lead_email",
    "source",
    "budget",
    "timeline",
    "message",
  ];

  const csvLines = [header.join(",")];

  for (const r of rows) {
    const a = (r.answers as any) || {};
    const mode = a.mode || (r.industry?.toLowerCase() === "personal" ? "personal" : r.industry?.toLowerCase() === "business" ? "business" : "");
    const line = [
      r.id,
      (r.bookedAt ?? r.createdAt).toISOString(),
      r.appSlug,
      r.industry || "",
      mode || "",
      r.lead?.contact || "",
      r.lead?.email || "",
      a.source || r.lead?.source || "",
      a.budget || "",
      a.timeline || "",
      (a.message || "").replace(/\r?\n/g, " ").replace(/"/g, '""'),
    ]
      .map((v) => `"${String(v ?? "").trim()}"`)
      .join(",");
    csvLines.push(line);
  }

  const body = csvLines.join("\n");
  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="demos_${Date.now()}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
