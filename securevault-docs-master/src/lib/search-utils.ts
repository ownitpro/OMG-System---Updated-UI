/**
 * Advanced search query parser
 * Supports:
 * - + for AND (all terms must match): mario+taxes+2023
 * - - for NOT (exclude terms): invoice-draft
 * - Space for OR (any term matches): contract proposal
 */

export interface ParsedQuery {
  required: string[];    // Terms with + (must match)
  excluded: string[];    // Terms with - (must not match)
  optional: string[];    // Space-separated (any can match)
}

export function parseSearchQuery(query: string): ParsedQuery {
  const required: string[] = [];
  const excluded: string[] = [];
  const optional: string[] = [];

  if (!query.trim()) return { required, excluded, optional };

  // Split by + to get AND segments
  const segments = query.split('+').map(s => s.trim()).filter(Boolean);

  segments.forEach((segment, index) => {
    if (segment.includes('-')) {
      // Handle exclusions within segment
      const parts = segment.split('-').map(p => p.trim()).filter(Boolean);
      if (parts[0]) {
        if (index === 0 && segments.length === 1) {
          // No + in query, first part is optional
          optional.push(...parts[0].split(/\s+/).filter(Boolean));
        } else {
          required.push(parts[0]);
        }
      }
      // Rest after - are excluded
      parts.slice(1).forEach(p => excluded.push(p));
    } else if (index === 0 && segments.length === 1) {
      // No + operator, treat spaces as OR
      optional.push(...segment.split(/\s+/).filter(Boolean));
    } else {
      // Has + operator, this segment is required
      required.push(segment);
    }
  });

  return { required, excluded, optional };
}

export function matchesSearch(
  name: string,
  labels: string[] | undefined,
  parsed: ParsedQuery
): boolean {
  const combined = `${name.toLowerCase()} ${(labels || []).join(' ').toLowerCase()}`;

  // Exclusions: reject if ANY excluded term found
  for (const term of parsed.excluded) {
    if (combined.includes(term.toLowerCase())) return false;
  }

  // Required: ALL must match
  for (const term of parsed.required) {
    if (!combined.includes(term.toLowerCase())) return false;
  }

  // Optional: at least ONE must match (if any exist)
  if (parsed.optional.length > 0) {
    const hasMatch = parsed.optional.some(t => combined.includes(t.toLowerCase()));
    if (!hasMatch) return false;
  }

  return true;
}
