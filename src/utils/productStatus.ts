import type { Entitlements, ProductKey } from "@/mock/entitlements";

export type CardStatus = "active" | "locked" | "coming_soon";

export function getCardStatus(
  key: ProductKey,
  entitlements: Entitlements,
  comingSoon?: boolean
): CardStatus {
  if (comingSoon) return "coming_soon";
  const status = entitlements[key];
  if (status === "active" || status === "trial") return "active";
  return "locked";
}

