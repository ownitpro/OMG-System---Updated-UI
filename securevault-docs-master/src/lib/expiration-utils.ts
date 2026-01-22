// Client-safe expiration utility functions
// These can be safely imported in client components (no database dependencies)

export type ExpirationStatus = 'expired' | 'expiring_today' | 'expiring_soon' | 'upcoming';

export function parseExpirationDate(dateStr: string | undefined): Date | null {
  if (!dateStr) return null;
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) return parsed;
  return null;
}

export function getDaysUntilExpiration(expirationDate: Date): number {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const expDate = new Date(expirationDate);
  expDate.setHours(0, 0, 0, 0);
  return Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function getExpirationStatus(daysUntilExpiration: number): ExpirationStatus {
  if (daysUntilExpiration < 0) return 'expired';
  if (daysUntilExpiration === 0) return 'expiring_today';
  if (daysUntilExpiration <= 7) return 'expiring_soon';
  return 'upcoming';
}
