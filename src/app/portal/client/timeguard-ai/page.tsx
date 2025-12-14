import { PortalShell } from "@/components/PortalShell";
import { ComingSoon } from "@/components/ComingSoon";
import { getClientNav } from "@/config/portalNav";

export default function TimeguardAIPage() {
  const nav = getClientNav();
  return (
    <PortalShell role="client" title="Timeguard-AI" nav={nav}>
      <ComingSoon
        title="Timeguard-AI"
        text="AI-powered time tracking and productivity management."
      />
    </PortalShell>
  );
}

