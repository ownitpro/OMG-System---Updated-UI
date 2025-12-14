import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function CustomSolutionsPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Custom Solutions" nav={nav}>
      <ComingSoon
        title="Custom Solutions"
        text="Request and track your custom solution development."
      />
    </PortalShell>
  );
}

