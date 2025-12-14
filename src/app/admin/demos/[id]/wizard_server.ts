"use server";

import { prisma } from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { z } from "zod";

// NOTE: protect this route with your auth+RBAC (OWNER/ADMIN). Add your checks here.
async function requireAdmin() {
  // const session = await auth();
  // const user = session?.user;
  // if (!user) redirect("/login");
  // const membership = await prisma.membership.findFirst({ where: { userId: user.id, role: { in: ["OWNER","ADMIN"] } } });
  // if (!membership) redirect("/");
  // return user;
  return { id: "admin" }; // placeholder; wire your auth as above.
}

// Utility functions
function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

async function uniqueSlug(baseSlug: string) {
  let slug = baseSlug;
  let suffix = 1;
  while (await prisma.organization.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }
  return slug;
}

const Payload = z.object({
  demoId: z.string(),
  leadEmail: z.string().email(),
  leadName: z.string().optional(),
  leadCompany: z.string().optional(),
  product: z.string(),
  package: z.string(),
  interval: z.enum(["month", "year"]),
  seats: z.number().int().min(1),
  seed_flags: z.boolean().optional(),
  seed_leadflow: z.boolean().optional(),
  seed_industryiq: z.boolean().optional(),
});

export async function convertToOrgWithPlanAction(data: FormData) {
  "use server";
  await requireAdmin();
  
  const p = Payload.parse({
    demoId: data.get("demoId"),
    leadEmail: data.get("leadEmail"),
    leadName: data.get("leadName"),
    leadCompany: data.get("company"), // form uses "company" not "leadCompany"
    product: data.get("product"),
    package: data.get("package"),
    interval: data.get("interval"),
    seats: parseInt(data.get("seats") as string, 10),
    seed_flags: data.get("seed_flags") === "on",
    seed_leadflow: data.get("seed_leadflow") === "on",
    seed_industryiq: data.get("seed_industryiq") === "on",
  });

  // 1) Create or reuse user by email
  const email = p.leadEmail.toLowerCase().trim();
  const name = p.leadName || email.split("@")[0];

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email, name } });
  }

  // 2) Create Organization (unique slug)
  const orgName = p.leadCompany || `${p.product} Client`;
  const org = await prisma.organization.create({
    data: { name: orgName, slug: await uniqueSlug(slugify(orgName || "client")) },
  });

  // 3) Membership (CLIENT)
  await prisma.userMembership.create({ 
    data: { userId: user.id, organizationId: org.id, role: "CLIENT" } 
  });

  // TODO: Implement proper product catalog, subscriptions, and feature flags
  // For now, just redirect to the organization page
  redirect(`/admin/orgs/${org.slug}?created=1&from_demo=${p.demoId}`);
}