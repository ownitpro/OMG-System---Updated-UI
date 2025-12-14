// lib/relationsHelpers.ts

export type RelationRole = "primary" | "secondary";

/**
 * Get the emoji icon for a relation role
 */
export function getRoleIcon(role: RelationRole): string {
  switch (role) {
    case "primary":
      return "🟢";
    case "secondary":
    default:
      return "⚪";
  }
}

/**
 * Get the display label for a relation role
 */
export function getRoleLabel(role: RelationRole): string {
  switch (role) {
    case "primary":
      return "Primary";
    case "secondary":
    default:
      return "Secondary";
  }
}

/**
 * Get the description for a relation role
 */
export function getRoleDescription(role: RelationRole): string {
  switch (role) {
    case "primary":
      return "core part of your stack";
    case "secondary":
    default:
      return "recommended add-on";
  }
}

/**
 * Default scoring rule for relation roles:
 * - primary   → 100
 * - secondary → 60
 */
export function getRoleWeight(role: RelationRole): number {
  switch (role) {
    case "primary":
      return 100;
    case "secondary":
    default:
      return 60;
  }
}

/**
 * Get the effective weight for a relation, using weight if provided,
 * otherwise falling back to role-based default
 */
export function getEffectiveRelationWeight(
  relation: { role?: RelationRole; weight?: number; priority?: number }
): number {
  // Check for explicit weight/priority first
  if (typeof relation.weight === "number") return relation.weight;
  if (typeof relation.priority === "number") return relation.priority;

  // Fall back to role-based default
  const role: RelationRole = relation.role ?? "secondary";
  return getRoleWeight(role);
}

