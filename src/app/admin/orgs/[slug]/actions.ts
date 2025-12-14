"use server";

import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

async function requireAdmin() {
  // TODO: wire to your real RBAC. Only OWNER/ADMIN should pass.
  return { id: "admin" };
}

export async function markInvoicePaidAction(invoiceId: string) {
  await requireAdmin();

  // 1) Fetch invoice + org
  const invoice = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { organization: true },
  });
  if (!invoice) throw new Error("Invoice not found");
  if (invoice.status === "PAID") return;

  // 2) Create payment record (commented out - Payment model doesn't exist)
  // await prisma.payment.create({
  //   data: {
  //     invoiceId: invoice.id,
  //     amount: invoice.amount,
  //     currency: invoice.currency,
  //     status: "SUCCEEDED",
  //     provider: "manual", // or "stripe" if reconciled
  //     externalId: null,
  //   },
  // });

  // 3) Flip invoice to PAID
  await prisma.invoice.update({
    where: { id: invoice.id },
    data: { status: "PAID" },
  });

  // 4) Audit + notify
  await prisma.auditLog.create({
    data: {
      action: "ORDER_PLACED", // reuse enum; payload clarifies payment
      organizationId: invoice.organizationId,
      userId: "admin", // TODO: get from session
      resourceType: "invoice",
      resourceId: invoice.id,
      metadata: { invoiceId: invoice.id, amount: invoice.amount, currency: invoice.currency, action: "MARK_PAID" },
    },
  });

  const admins = await prisma.userMembership.findMany({
    where: { role: { in: ["ADMIN"] } },
    select: { userId: true },
  });
  // Notification system commented out - Notification model doesn't exist
  // if (admins.length) {
  //   await prisma.notification.createMany({
  //     data: admins.map((a: any) => ({
  //       userId: a.userId,
  //       title: "Invoice marked PAID",
  //       body: `${invoice.number || invoice.id} — ${(invoice.amountDue / 100).toFixed(2)} ${invoice.currency}`,
  //       href: `/admin/orgs/${invoice.organization.slug}?inv=${invoice.id}`,
  //     })),
  //   });
  // }

  redirect(`/admin/orgs/${invoice.organization.slug}?paid=${invoice.id}`);
}

type WelcomePayload = {
  orgId: string;
  toEmail: string;
  toName?: string | null;
  productHint?: "crm" | "securevault-docs" | "leadflow" | "industryiq";
};

export async function sendWelcomeEmailAction(payload: WelcomePayload) {
  await requireAdmin();

  const org = await prisma.organization.findUnique({
    where: { id: payload.orgId },
    include: {
      memberships: { include: { user: true } },
      // subscriptions: { include: { product: true, package: true } }, // Subscription model doesn't exist
    },
  });
  if (!org) throw new Error("Org not found");

  // Choose a simple product hint if not provided
  const prod =
    payload.productHint ||
    // (org.subscriptions[0]?.productId as WelcomePayload["productHint"]) || // Subscription model doesn't exist
    "crm";

  // 1) Queue webhook event for your mailer worker
  // Create (or ensure) a WebhookEndpoint with provider="mailer" in your setup;
  // here we just write a generic event and let the worker pick it up.
  await prisma.webhookEvent.create({
    data: {
      webhookEndpointId: (await ensureMailerEndpointId(org.id)) as string,
      eventType: "SEND_WELCOME",
      payload: {
        to: payload.toEmail,
        name: payload.toName || "",
        subject: welcomeSubject(prod),
        html: welcomeHtml({
          orgName: org.name,
          product: prod,
          portalUrl: `/portal`, // adjust if you have a branded domain
        }),
        text: welcomeText({
          orgName: org.name,
          product: prod,
          portalUrl: `/portal`,
        }),
      } as any,
    },
  });

  // 2) Audit + internal toast
  await prisma.auditLog.create({
    data: {
      action: "LEAD_CREATED", // reuse enum; payload clarifies welcome mail
      organizationId: org.id,
      userId: "admin", // TODO: get from session
      resourceType: "organization",
      resourceId: org.id,
      metadata: { action: "SEND_WELCOME", to: payload.toEmail, product: prod },
    },
  });

  const admins = await prisma.userMembership.findMany({
    where: { role: { in: ["ADMIN"] } },
    select: { userId: true },
  });
  // Notification system commented out - Notification model doesn't exist
  // if (admins.length) {
  //   await prisma.notification.createMany({
  //     data: admins.map((a: any) => ({
  //       userId: a.userId,
  //       title: "Welcome email queued",
  //       body: `${org.name} → ${payload.toEmail}`,
  //       href: `/admin/orgs/${org.slug}`,
  //     })),
  //   });
  // }

  // no redirect needed; caller can refresh
  return { ok: true };
}

// --- RESEND WELCOME TO A SPECIFIC USER ---
export async function resendWelcomeEmailAction(params: {
  orgId: string;
  userId: string;
  productHint?: "crm" | "securevault-docs" | "leadflow" | "industryiq";
}) {
  await requireAdmin();

  const user = await prisma.user.findUnique({ where: { id: params.userId } });
  const org = await prisma.organization.findUnique({ where: { id: params.orgId } });
  if (!user || !org) throw new Error("Org or user not found");

  await prisma.webhookEvent.create({
    data: {
      webhookEndpointId: await ensureMailerEndpointId(org.id),
      eventType: "SEND_WELCOME",
      payload: {
        to: user.email,
        name: user.name || "",
        subject: welcomeSubject(params.productHint),
        html: welcomeHtml({ orgName: org.name, product: params.productHint || "crm", portalUrl: `/portal` }),
        text: welcomeText({ orgName: org.name, product: params.productHint || "crm", portalUrl: `/portal` }),
      } as any,
    },
  });

  await prisma.auditLog.create({
    data: {
      action: "LEAD_CREATED",
      organizationId: org.id,
      userId: "admin", // TODO: get from session
      resourceType: "organization",
      resourceId: org.id,
      metadata: { action: "RESEND_WELCOME", to: user.email, userId: user.id, product: params.productHint || "crm" },
    },
  });

  // optional toast handling by caller
  return { ok: true };
}

// --- GENERATE (OR REGENERATE) PAID INVOICE PDF ---
export async function generateInvoicePdfAction(invoiceId: string) {
  await requireAdmin();

  const inv = await prisma.invoice.findUnique({
    where: { id: invoiceId },
    include: { organization: true }, // payments and subscription models don't exist
  });
  if (!inv) throw new Error("Invoice not found");
  if (inv.status !== "PAID") throw new Error("Only PAID invoices can be rendered to PDF");

  // 1) Build a HTML string (or JSON payload) you'll hand to your PDF renderer.
  //    Replace this with your actual renderer call (queue a job or call a render service).
  const html = `
    <html><head><meta charset="utf-8"><title>${inv.number || inv.id}</title></head>
    <body style="font-family:Inter,Arial,sans-serif;">
      <h1>Invoice ${inv.number || inv.id}</h1>
      <p><strong>Organization:</strong> ${inv.organization.name}</p>
      <p><strong>Status:</strong> ${inv.status}</p>
      <p><strong>Amount:</strong> ${(Number(inv.amount)/100).toFixed(2)} ${inv.currency}</p>
      <p><strong>Issued:</strong> ${new Date(inv.createdAt).toLocaleString()}</p>
      <!-- Subscription and payments data not available -->
    </body></html>
  `;

  // 2) Stub: store HTML somewhere or render -> URL. For now, we'll simulate a stored URL.
  //    Replace this with your real storage/upload and public URL.
  const fakeUrl = `/api/invoices/pdf/${encodeURIComponent(inv.id)}.pdf`; // swap to your storage link

  // Invoice model doesn't have pdfUrl field
  // await prisma.invoice.update({
  //   where: { id: inv.id },
  //   data: { pdfUrl: fakeUrl },
  // });

  await prisma.auditLog.create({
    data: {
      action: "ORDER_PLACED",
      organizationId: inv.organizationId,
      userId: "admin", // TODO: get from session
      resourceType: "invoice",
      resourceId: inv.id,
      metadata: { action: "INVOICE_PDF_GENERATED", invoiceId: inv.id, url: fakeUrl },
    },
  });

  return { ok: true, url: fakeUrl };
}

// --- helpers ---

async function ensureMailerEndpointId(orgId: string) {
  // You can keep one org-wide endpoint for the platform mailer, or a global one.
  // Here: try find one; if not, create a stub pointing at your mail worker URL.
  let ep = await prisma.webhookEndpoint.findFirst({
    where: { organizationId: orgId, url: { contains: "mailer" } }, // provider field doesn't exist
    select: { id: true },
  });
  if (ep) return ep.id;

  ep = await prisma.webhookEndpoint.create({
    data: {
      organizationId: orgId,
      url: "worker://mailer", // your worker transport; could be http(s):// if you poll/push
      eventTypes: ["SEND_WELCOME"], // array of event types
      secret: "mail-local-secret", // store in env in real deployments
    },
    select: { id: true },
  });
  return ep.id;
}

function welcomeSubject(p?: WelcomePayload["productHint"]) {
  switch (p) {
    case "securevault-docs":
      return "Welcome to SecureVault Docs — your vault is ready";
    case "leadflow":
      return "Welcome to LeadFlow Engine — let's build your pipeline";
    case "industryiq":
      return "Welcome to IndustryIQ — daily briefings are on deck";
    default:
      return "Welcome to OMGsystems CRM — your workspace is live";
  }
}

function welcomeHtml({ orgName, product, portalUrl }: { orgName: string; product: string; portalUrl: string }) {
  return `
  <div style="font-family:Inter,Arial,sans-serif;line-height:1.6">
    <h2>Welcome to ${escapeHtml(orgName)} on OMGsystems</h2>
    <p>Your ${escapeHtml(product.toUpperCase())} workspace is ready.</p>
    <ul>
      <li>Sign in to your portal: <a href="${portalUrl}">${portalUrl}</a></li>
      <li>Next steps are in your Onboarding checklist.</li>
      <li>Questions? Reply to this email—our team will help.</li>
    </ul>
    <p>— The OMGsystems Team</p>
  </div>`;
}

function welcomeText({ orgName, product, portalUrl }: { orgName: string; product: string; portalUrl: string }) {
  return [
    `Welcome to ${orgName} on OMGsystems`,
    ``,
    `Your ${product.toUpperCase()} workspace is ready.`,
    `Portal: ${portalUrl}`,
    `Next steps: see your Onboarding checklist.`,
    ``,
    `— The OMGsystems Team`,
  ].join("\n");
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]!));
}
