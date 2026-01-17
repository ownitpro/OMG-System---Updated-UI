/**
 * Client Portal Data Formatters
 * Utilities to transform API responses to frontend-friendly formats
 */

// ============================================================================
// Currency Formatting
// ============================================================================

export function formatCurrency(amount: number, currency: string = 'CAD'): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatCurrencyCompact(amount: number, currency: string = 'CAD'): string {
  if (amount >= 1000000) {
    return `${currency === 'CAD' ? '$' : ''}${(amount / 1000000).toFixed(1)}M`;
  }
  if (amount >= 1000) {
    return `${currency === 'CAD' ? '$' : ''}${(amount / 1000).toFixed(1)}K`;
  }
  return formatCurrency(amount, currency);
}

// ============================================================================
// Date/Time Formatting
// ============================================================================

export function formatDate(date: string | Date | null): string {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function formatDateTime(date: string | Date | null): string {
  if (!date) return 'N/A';
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleString('en-CA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTimeAgo(date: string | Date | null): string {
  if (!date) return 'Never';

  const d = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const seconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
  if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
  return `${Math.floor(seconds / 31536000)} years ago`;
}

export function formatDateRange(startDate: string | Date | null, endDate: string | Date | null): string {
  const start = startDate ? formatDate(startDate) : 'Not started';
  const end = endDate ? formatDate(endDate) : 'Ongoing';
  return `${start} - ${end}`;
}

// ============================================================================
// Duration Formatting
// ============================================================================

export function formatDuration(minutes: number): string {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

export function formatDurationLong(minutes: number): string {
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''}`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (mins === 0) return `${hours} hour${hours !== 1 ? 's' : ''}`;
  return `${hours} hour${hours !== 1 ? 's' : ''} ${mins} minute${mins !== 1 ? 's' : ''}`;
}

// ============================================================================
// File Size Formatting
// ============================================================================

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 B';

  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${units[i]}`;
}

// ============================================================================
// Percentage Formatting
// ============================================================================

export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function calculatePercentage(part: number, total: number): number {
  if (total === 0) return 0;
  return (part / total) * 100;
}

// ============================================================================
// Status Mapping
// ============================================================================

// Invoice Status Mapping
export const INVOICE_STATUS = {
  PAID: { label: 'Paid', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
  PENDING: { label: 'Pending', color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  FAILED: { label: 'Failed', color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' },
  OVERDUE: { label: 'Overdue', color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' },
} as const;

export function getInvoiceStatus(status: string, dueDate: string | Date | null): keyof typeof INVOICE_STATUS {
  if (status === 'PAID') return 'PAID';
  if (status === 'FAILED') return 'FAILED';

  // Check if overdue
  if (dueDate && status === 'PENDING') {
    const due = typeof dueDate === 'string' ? new Date(dueDate) : dueDate;
    if (due < new Date()) return 'OVERDUE';
  }

  return 'PENDING';
}

// Support Ticket Status Mapping
export const TICKET_STATUS = {
  OPEN: { label: 'Open', color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  IN_PROGRESS: { label: 'In Progress', color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  RESOLVED: { label: 'Resolved', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
  CLOSED: { label: 'Closed', color: 'gray', bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' },
} as const;

export function formatTicketId(uuid: string): string {
  return `TKT-${uuid.slice(-4).toUpperCase()}`;
}

// Automation Run Status Mapping
export const AUTOMATION_RUN_STATUS = {
  SUCCESS: { label: 'Success', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
  FAILED: { label: 'Failed', color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' },
  PARTIAL: { label: 'Partial', color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
} as const;

export function calculateSuccessRate(successful: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((successful / total) * 100);
}

// Campaign Status Mapping
export const CAMPAIGN_STATUS = {
  DRAFT: { label: 'Draft', color: 'gray', bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' },
  ACTIVE: { label: 'Active', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
  PAUSED: { label: 'Paused', color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  COMPLETED: { label: 'Completed', color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
} as const;

// Content Project Status Mapping
export const CONTENT_STATUS = {
  DRAFT: { label: 'Draft', color: 'gray', bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' },
  PLANNING: { label: 'Planning', color: 'gray', bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' },
  IN_PROGRESS: { label: 'In Progress', color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  REVIEW: { label: 'Review', color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  PUBLISHED: { label: 'Published', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
} as const;

// Custom Project Status Mapping
export const PROJECT_STATUS = {
  PLANNING: { label: 'Planning', color: 'gray', bgColor: 'bg-gray-50', textColor: 'text-gray-700', borderColor: 'border-gray-200' },
  IN_PROGRESS: { label: 'In Progress', color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  REVIEW: { label: 'Review', color: 'yellow', bgColor: 'bg-yellow-50', textColor: 'text-yellow-700', borderColor: 'border-yellow-200' },
  COMPLETED: { label: 'Completed', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
  ON_HOLD: { label: 'On Hold', color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' },
} as const;

// Strategy Session Status Mapping
export const SESSION_STATUS = {
  SCHEDULED: { label: 'Scheduled', color: 'blue', bgColor: 'bg-blue-50', textColor: 'text-blue-700', borderColor: 'border-blue-200' },
  COMPLETED: { label: 'Completed', color: 'green', bgColor: 'bg-green-50', textColor: 'text-green-700', borderColor: 'border-green-200' },
  CANCELLED: { label: 'Cancelled', color: 'red', bgColor: 'bg-red-50', textColor: 'text-red-700', borderColor: 'border-red-200' },
} as const;

// ============================================================================
// Number Formatting
// ============================================================================

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-CA').format(num);
}

export function formatCompactNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

// ============================================================================
// Timer Utilities
// ============================================================================

export function calculateRunningDuration(startTime: string | Date): number {
  const start = typeof startTime === 'string' ? new Date(startTime) : startTime;
  const now = new Date();
  return Math.floor((now.getTime() - start.getTime()) / 60000); // minutes
}

export function isEntryRunning(endTime: string | Date | null): boolean {
  return !endTime;
}

// ============================================================================
// JSON Parsing Utilities
// ============================================================================

export function safeJsonParse<T>(jsonString: string | null, defaultValue: T): T {
  if (!jsonString) return defaultValue;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return defaultValue;
  }
}
