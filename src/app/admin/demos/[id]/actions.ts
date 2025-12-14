"use server";

import { prisma } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

// Server action for adding notes
export async function addNoteAction(demoId: string, note: string) {
  if (!note.trim()) return;

  const demo = await prisma.demoRequest.findUnique({ where: { id: demoId } });
  if (!demo) return;

  const answers = (demo.answers as any) || {};
  const notes: Array<{ at: string; by: string; text: string }> = Array.isArray(answers.notes) ? answers.notes : [];
  notes.unshift({ at: new Date().toISOString(), by: "admin", text: note.trim() });

  await prisma.demoRequest.update({
    where: { id: demoId },
    data: { answers: { ...answers, notes } },
  });

  await prisma.auditLog.create({
    data: {
      organizationId: "default", // TODO: Get actual org ID
      userId: "admin", // TODO: Get actual user ID
      action: "DEMO_BOOKED", // reuse allowed enum; storing note content in data
      resourceType: "demo_request",
      resourceId: demoId,
      metadata: { demoRequestId: demoId, note },
    },
  });

  revalidatePath(`/admin/demos/${demoId}`);
}

// ---------------------------
// Utilities (server)
// ---------------------------
function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);
}

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

export async function convertToOrgAction(demoId: string) {
  "use server";
  await requireAdmin();

  const demo = await prisma.demoRequest.findUnique({
    where: { id: demoId },
    include: { lead: true },
  });
  if (!demo) notFound();
  const lead = demo.lead;

  // 1) Create or reuse user by email
  if (!lead?.email) {
    throw new Error("Lead email is required to convert to Organization.");
  }
  const email = lead.email.toLowerCase().trim();
  const name = lead.contact || email.split("@")[0];

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email, name } });
  }

  // 2) Create Organization (unique slug)
  const baseName =
    lead.orgName?.trim() ||
    (demo.appSlug === "securevault-docs" ? `SVD ${demo.industry || "Client"}` : `${demo.industry || "Client"} Org`);
  const baseSlug = slugify(baseName || "client");
  let slug = baseSlug;
  let suffix = 1;
  // ensure uniqueness
  while (await prisma.organization.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix++}`;
  }

  const org = await prisma.organization.create({
    data: {
      name: baseName,
      slug,
    },
  });

  // 3) Membership (CLIENT)
  await prisma.userMembership.create({
    data: { userId: user.id, organizationId: org.id, role: "CLIENT" },
  });

  // 4) Initial Project (Onboarding)
  const project = await prisma.project.create({
    data: {
      organizationId: org.id,
      userId: user.id,
      name: demo.appSlug === "securevault-docs" ? "SVD Onboarding" : "CRM Onboarding",
      status: "IN_PROGRESS",
      tasks: {
        create: [
          { title: "Kickoff call", description: "Schedule 30-minute discovery", userId: user.id },
          { title: "Connect intake forms", description: "Map lead fields and drips", userId: user.id },
          { title: "Document flows", description: "Enable requests, e-sign, retention", userId: user.id },
        ],
      },
    },
  });

  // 5) Audit
  await prisma.auditLog.create({
    data: {
      organizationId: org.id,
      userId: user.id,
      action: "ORDER_PLACED", // allowed enum; using as a generic conversion milestone
      resourceType: "organization",
      resourceId: org.id,
      metadata: { demoRequestId: demo.id, leadId: lead?.id, created: { userId: user.id, projectId: project.id } },
    },
  });

  // 6) Optional: notify admins (TODO: implement notification system)
  // const admins = await prisma.userMembership.findMany({
  //   where: { role: { in: ["ADMIN"] } },
  //   select: { userId: true },
  // });
  // if (admins.length) {
  //   await prisma.notification.createMany({
  //     data: admins.map((admin: { userId: string }) => ({
  //       userId: admin.userId,
  //       title: "Demo converted to Organization",
  //       body: `Org: ${org.name} — Contact: ${user?.email}`,
  //       href: `/admin/orgs/${org.slug}`,
  //     })),
  //   });
  // }

  // Revalidate and redirect to the new org or back to the demo page with a toast param
  redirect(`/admin/orgs/${org.slug}?created=1&from_demo=${demo.id}`);
}
