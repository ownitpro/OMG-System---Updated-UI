import { redirect } from "next/navigation";

export default function LegacyClientDashboardRedirect() {
  redirect("/portal/client");
}
