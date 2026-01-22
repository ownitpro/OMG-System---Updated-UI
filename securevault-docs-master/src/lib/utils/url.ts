/**
 * Get the base URL for the application
 * Used for constructing absolute URLs in server-side code
 */
export function getBaseUrl(): string {
  // In production, use VERCEL_URL if available
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  
  // Use NEXT_PUBLIC_APP_URL if set
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  
  // Default to localhost for development
  return process.env.NODE_ENV === 'production' 
    ? 'https://securevaultdocs.com' // Update with your production domain
    : 'http://localhost:3000';
}

/**
 * Construct an absolute URL from a relative path
 */
export function getAbsoluteUrl(path: string): string {
  const base = getBaseUrl();
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

