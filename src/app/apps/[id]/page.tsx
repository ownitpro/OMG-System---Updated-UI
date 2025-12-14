// app/apps/[id]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  appsConfig,
  getAppBySlug,
  type AppConfig,
  type AppId,
} from "@/config/apps_config";

import { SecureVaultAppPage } from "@/components/apps/SecureVaultAppPage";
import { CRMAppPage } from "@/components/apps/CRMAppPage";
import { LeadsAppPage } from "@/components/apps/LeadsAppPage";
import { DefaultAppPage } from "@/components/apps/DefaultAppPage";
import { AppAppearsInStrip } from "@/components/apps/AppAppearsInStrip";

// Map app.id -> layout component
const APP_LAYOUTS: Partial<
  Record<AppId, React.ComponentType<{ app: AppConfig }>>
> = {
  svd: SecureVaultAppPage,
  crm: CRMAppPage,
  leads: LeadsAppPage,
  // iq: IQAppPage, // when you build it
  // ai_mastery: uses DefaultAppPage (has dedicated page at /apps/omg-ai-mastery)
};

type AppPageProps = {
  params: Promise<{ id: string }>;
};

// ✅ Pre-generate paths for all apps based on slug
export function generateStaticParams() {
  return appsConfig.map((app) => ({
    id: app.slug, // e.g. "securevault-docs", "crm", "omg-leads", "omg-iq", "omg-ai-mastery"
  }));
}

// ✅ SEO metadata per app from config
export async function generateMetadata({
  params,
}: AppPageProps): Promise<Metadata> {
  const { id } = await params;
  const app = getAppBySlug(id);
  
  if (!app) {
    return {
      title: "App not found | OMGsystems",
    };
  }

  return {
    title: `${app.label} | OMGsystems`,
    description: app.summary,
    openGraph: {
      title: `${app.label} | OMGsystems`,
      description: app.summary,
      url: `https://www.omgsystems.com/apps/${app.slug}`,
      type: "website",
    },
  };
}

// ✅ Main dynamic app page
export default async function AppPage({ params }: AppPageProps) {
  const { id } = await params;
  const app = getAppBySlug(id);

  if (!app) {
    return notFound();
  }

  const Layout = APP_LAYOUTS[app.id] ?? DefaultAppPage;

  return (
    <>
      <Layout app={app} />
      {/* Appears in industries & solutions strip */}
      <AppAppearsInStrip app={app} />
    </>
  );
}
