import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function BrandingCreativePage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Branding & Creative" nav={nav}>
      <ComingSoon
        title="Branding & Creative"
        text="Access your brand assets and creative resources."
      />
    </PortalShell>
  );
}

