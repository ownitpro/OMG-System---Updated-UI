/**
 * Audit Logging System
 * Aurora PostgreSQL ONLY - No Supabase
 */

const USE_DATABASE = process.env.AUDIT_LOG_TO_DATABASE === 'true'

export type AuditAction =
  | 'portal.created'
  | 'portal.updated'
  | 'portal.deleted'
  | 'portal.viewed'
  | 'portal.pin_changed'
  | 'portal.expiration_set'
  | 'auth.login_success'
  | 'auth.login_failed'
  | 'auth.logout'
  | 'auth.rate_limited'
  | 'document.uploaded'
  | 'document.downloaded'
  | 'document.deleted'
  | 'document.viewed'
  | 'request.created'
  | 'request.updated'
  | 'request.deleted'
  | 'request.completed'
  | 'bulk.portals_created'
  | 'bulk.documents_downloaded'
  | 'settings.updated'
  | 'settings.viewed';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: AuditAction;
  userId?: string;
  userEmail?: string;
  userType: 'admin' | 'client' | 'system';
  resourceType: 'portal' | 'document' | 'request' | 'settings' | 'auth';
  resourceId?: string;
  organizationId?: string;
  portalId?: string;
  clientName?: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  errorMessage?: string;
}

const auditLogs: AuditLogEntry[] = [];

export async function logAudit(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): Promise<void> {
  const logEntry: AuditLogEntry = {
    ...entry,
    id: `audit_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    timestamp: new Date().toISOString(),
  };

  auditLogs.push(logEntry);

  if (process.env.NODE_ENV === 'development') {
    console.log('[AUDIT]', {
      action: logEntry.action,
      user: logEntry.userEmail || logEntry.userType,
      resource: `${logEntry.resourceType}:${logEntry.resourceId || 'N/A'}`,
      success: logEntry.success,
    });
  }

  if (USE_DATABASE) {
    try {
      await persistAuditLog(logEntry)
    } catch (error) {
      console.error('[AUDIT] Failed to persist:', error)
    }
  }
}

async function persistAuditLog(entry: AuditLogEntry): Promise<void> {
  const { query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  await query(
    `INSERT INTO ${getTableName('AuditLog')} (
       id, action, "userId", "userEmail", "userType",
       "resourceType", "resourceId", "organizationId", "portalId",
       "clientName", details, "ipAddress", "userAgent",
       success, "errorMessage", "createdAt"
     )
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
    [
      entry.id, entry.action, entry.userId || null, entry.userEmail || null,
      entry.userType, entry.resourceType, entry.resourceId || null,
      entry.organizationId || null, entry.portalId || null, entry.clientName || null,
      JSON.stringify(entry.details), entry.ipAddress || null, entry.userAgent || null,
      entry.success, entry.errorMessage || null, entry.timestamp,
    ]
  )
}

export function logPortalCreated(data: {
  portalId: string; clientName: string; clientEmail: string;
  organizationId: string; userId?: string; userEmail?: string; ipAddress?: string;
}) {
  logAudit({
    action: 'portal.created', userType: 'admin', userId: data.userId,
    userEmail: data.userEmail, resourceType: 'portal', resourceId: data.portalId,
    organizationId: data.organizationId, portalId: data.portalId, clientName: data.clientName,
    details: { clientName: data.clientName, clientEmail: data.clientEmail },
    ipAddress: data.ipAddress, success: true,
  });
}

export function logPortalUpdated(data: {
  portalId: string; changes: Record<string, { old: any; new: any }>;
  userId?: string; userEmail?: string; ipAddress?: string;
}) {
  logAudit({
    action: 'portal.updated', userType: 'admin', userId: data.userId,
    userEmail: data.userEmail, resourceType: 'portal', resourceId: data.portalId,
    portalId: data.portalId, details: { changes: data.changes, fieldsChanged: Object.keys(data.changes) },
    ipAddress: data.ipAddress, success: true,
  });
}

export function logPortalDeleted(data: {
  portalId: string; clientName: string; userId?: string; userEmail?: string; ipAddress?: string;
}) {
  logAudit({
    action: 'portal.deleted', userType: 'admin', userId: data.userId,
    userEmail: data.userEmail, resourceType: 'portal', resourceId: data.portalId,
    portalId: data.portalId, clientName: data.clientName,
    details: { clientName: data.clientName }, ipAddress: data.ipAddress, success: true,
  });
}

export function logLoginAttempt(data: {
  portalId: string; success: boolean; ipAddress?: string; userAgent?: string; errorMessage?: string;
}) {
  logAudit({
    action: data.success ? 'auth.login_success' : 'auth.login_failed',
    userType: 'client', resourceType: 'auth', resourceId: data.portalId,
    portalId: data.portalId, details: { reason: data.errorMessage },
    ipAddress: data.ipAddress, userAgent: data.userAgent,
    success: data.success, errorMessage: data.errorMessage,
  });
}

export function logRateLimited(data: { portalId: string; ipAddress?: string; lockoutEndsAt: number; }) {
  logAudit({
    action: 'auth.rate_limited', userType: 'client', resourceType: 'auth',
    resourceId: data.portalId, portalId: data.portalId,
    details: { lockoutEndsAt: new Date(data.lockoutEndsAt).toISOString() },
    ipAddress: data.ipAddress, success: false, errorMessage: 'Rate limit exceeded',
  });
}

export function logDocumentUploaded(data: {
  portalId: string; documentId: string; fileName: string;
  fileSize: number; requestId?: string; userId?: string; ipAddress?: string;
}) {
  logAudit({
    action: 'document.uploaded', userType: data.userId ? 'admin' : 'client',
    userId: data.userId, resourceType: 'document', resourceId: data.documentId,
    portalId: data.portalId, details: { fileName: data.fileName, fileSize: data.fileSize },
    ipAddress: data.ipAddress, success: true,
  });
}

export function logDocumentDownloaded(data: {
  portalId: string; documentId?: string; fileName?: string;
  downloadType: 'single' | 'all'; userId?: string; ipAddress?: string;
}) {
  logAudit({
    action: data.downloadType === 'all' ? 'bulk.documents_downloaded' : 'document.downloaded',
    userType: 'admin', userId: data.userId, resourceType: 'document',
    resourceId: data.documentId, portalId: data.portalId,
    details: { fileName: data.fileName, downloadType: data.downloadType },
    ipAddress: data.ipAddress, success: true,
  });
}

export function logRequestCreated(data: {
  requestId: string; portalId: string; templateKey: string; itemCount: number;
  userId?: string; ipAddress?: string;
}) {
  logAudit({
    action: 'request.created', userType: 'admin', userId: data.userId,
    resourceType: 'request', resourceId: data.requestId, portalId: data.portalId,
    details: { templateKey: data.templateKey, itemCount: data.itemCount },
    ipAddress: data.ipAddress, success: true,
  });
}

export function logBulkPortalsCreated(data: {
  count: number; successCount: number; failureCount: number;
  organizationId: string; userId?: string; ipAddress?: string;
}) {
  logAudit({
    action: 'bulk.portals_created', userType: 'admin', userId: data.userId,
    resourceType: 'portal', organizationId: data.organizationId,
    details: { totalCount: data.count, successCount: data.successCount, failureCount: data.failureCount },
    ipAddress: data.ipAddress, success: data.failureCount === 0,
  });
}

export async function getAuditLogs(filters?: {
  portalId?: string; organizationId?: string; action?: AuditAction;
  resourceType?: string; startDate?: Date; endDate?: Date; limit?: number;
}): Promise<AuditLogEntry[]> {
  if (USE_DATABASE) {
    try {
      return await getAuditLogsFromPostgres(filters)
    } catch (error) {
      console.error('[AUDIT] DB fetch failed:', error)
    }
  }
  return getAuditLogsFromMemory(filters);
}

function getAuditLogsFromMemory(filters?: any): AuditLogEntry[] {
  let filtered = [...auditLogs];
  if (filters?.portalId) filtered = filtered.filter(log => log.portalId === filters.portalId);
  if (filters?.organizationId) filtered = filtered.filter(log => log.organizationId === filters.organizationId);
  if (filters?.action) filtered = filtered.filter(log => log.action === filters.action);
  if (filters?.resourceType) filtered = filtered.filter(log => log.resourceType === filters.resourceType);
  filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  if (filters?.limit) filtered = filtered.slice(0, filters.limit);
  return filtered;
}

async function getAuditLogsFromPostgres(filters?: any): Promise<AuditLogEntry[]> {
  const { query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  let sql = `SELECT * FROM ${getTableName('AuditLog')} WHERE 1=1`
  const params: any[] = []
  let paramIndex = 1

  if (filters?.portalId) { sql += ` AND "portalId" = $${paramIndex++}`; params.push(filters.portalId) }
  if (filters?.organizationId) { sql += ` AND "organizationId" = $${paramIndex++}`; params.push(filters.organizationId) }
  if (filters?.action) { sql += ` AND action = $${paramIndex++}`; params.push(filters.action) }
  if (filters?.limit) { sql += ` LIMIT $${paramIndex++}`; params.push(filters.limit) }

  sql += ` ORDER BY "createdAt" DESC`

  const { data } = await query(sql, params)
  return (data || []).map((row: any) => ({
    id: row.id, timestamp: row.createdAt, action: row.action,
    userId: row.userId, userEmail: row.userEmail, userType: row.userType,
    resourceType: row.resourceType, resourceId: row.resourceId,
    organizationId: row.organizationId, portalId: row.portalId,
    clientName: row.clientName, details: typeof row.details === 'string' ? JSON.parse(row.details) : row.details,
    ipAddress: row.ipAddress, userAgent: row.userAgent, success: row.success, errorMessage: row.errorMessage,
  }))
}

export async function getAuditStats(filters?: any) {
  const logs = await getAuditLogs(filters);
  return {
    totalEvents: logs.length,
    successCount: logs.filter(log => log.success).length,
    failureCount: logs.filter(log => !log.success).length,
    recentEvents: logs.slice(0, 10),
  };
}

export async function exportAuditLogsCSV(filters?: any): Promise<string> {
  const logs = await getAuditLogs(filters);
  const headers = ['Timestamp', 'Action', 'User Type', 'User Email', 'Resource Type', 'Success'];
  const rows = logs.map(log => [log.timestamp, log.action, log.userType, log.userEmail || '', log.resourceType, log.success ? 'Yes' : 'No']);
  return [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');
}
