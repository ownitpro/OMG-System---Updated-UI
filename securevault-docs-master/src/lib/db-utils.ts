// src/lib/db-utils.ts
// Schema mapping utilities for multi-schema PostgreSQL (Aurora)
// Maps table names to their respective schemas: core, hub, securevault

/**
 * Schema mapping for all tables
 * - core: Shared user/organization data across all apps
 * - hub: Central billing and subscription management
 * - securevault: App-specific tables
 */
export const SCHEMA_MAP: Record<string, string> = {
  // ===== core schema (shared across all apps) =====
  'User': 'core',
  'Organization': 'core',
  'OrganizationMember': 'core',
  'OrganizationInvite': 'core',
  'Account': 'core',
  'Session': 'core',
  'VerificationToken': 'core',
  'PasswordResetToken': 'core',

  // ===== hub schema (central management/billing) =====
  'App': 'hub',
  'Subscription': 'hub',
  'UserAppAccess': 'hub',
  'BillingEvent': 'hub',

  // ===== securevault schema (app-specific) =====
  'UserProfile': 'securevault',
  'OrganizationProfile': 'securevault',
  'PersonalVault': 'securevault',
  'Folder': 'securevault',
  'Document': 'securevault',
  'DocumentVersion': 'securevault',
  'Portal': 'securevault',
  'GuestToken': 'securevault',
  'PortalRequest': 'securevault',
  'PortalSubmission': 'securevault',
  'RequestTemplate': 'securevault',
  'RequestTemplateItem': 'securevault',
  'ShareLink': 'securevault',
  'ShareLinkAccess': 'securevault',
  'Connector': 'securevault',
  'ExpirationNotification': 'securevault',
  'UserNotification': 'securevault',
  'UsageRecord': 'securevault',
  'UsageAlert': 'securevault',
  'AuditLog': 'securevault',
  'EmailTemplate': 'securevault',
  'GoldSetExample': 'securevault', // AI learning gold set for classification

  // Legacy table names (for backwards compatibility)
  'ClientPortal': 'securevault',
};

/**
 * Get the fully qualified table name with schema prefix
 * @param table - Table name without schema
 * @returns Schema-qualified table name (e.g., 'securevault."Document"')
 */
export function getTableName(table: string): string {
  const schema = SCHEMA_MAP[table] || 'securevault';
  return `${schema}."${table}"`;
}

/**
 * Get just the schema for a table
 * @param table - Table name
 * @returns Schema name
 */
export function getSchema(table: string): string {
  return SCHEMA_MAP[table] || 'securevault';
}

/**
 * Build a SELECT query with proper schema prefix
 */
export function buildSelect(
  table: string,
  columns: string | string[] = '*',
  where?: Record<string, any>,
  options?: {
    orderBy?: string;
    orderDir?: 'ASC' | 'DESC';
    limit?: number;
    offset?: number;
  }
): { sql: string; params: any[] } {
  const tableName = getTableName(table);
  const cols = Array.isArray(columns) ? columns.map(c => `"${c}"`).join(', ') : columns;

  let sql = `SELECT ${cols} FROM ${tableName}`;
  const params: any[] = [];

  if (where && Object.keys(where).length > 0) {
    const conditions = Object.entries(where).map(([key, value], i) => {
      params.push(value);
      return `"${key}" = $${i + 1}`;
    });
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  if (options?.orderBy) {
    sql += ` ORDER BY "${options.orderBy}" ${options.orderDir || 'ASC'}`;
  }

  if (options?.limit) {
    sql += ` LIMIT ${options.limit}`;
  }

  if (options?.offset) {
    sql += ` OFFSET ${options.offset}`;
  }

  return { sql, params };
}

/**
 * Build an INSERT query with proper schema prefix
 */
export function buildInsert(
  table: string,
  data: Record<string, any>
): { sql: string; params: any[] } {
  const tableName = getTableName(table);
  const keys = Object.keys(data);
  const values = Object.values(data);
  const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
  const columns = keys.map(k => `"${k}"`).join(', ');

  const sql = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;

  return { sql, params: values };
}

/**
 * Build an UPDATE query with proper schema prefix
 */
export function buildUpdate(
  table: string,
  data: Record<string, any>,
  where: Record<string, any>
): { sql: string; params: any[] } {
  const tableName = getTableName(table);
  const dataKeys = Object.keys(data);
  const whereKeys = Object.keys(where);

  let paramIndex = 1;
  const setClause = dataKeys.map(k => `"${k}" = $${paramIndex++}`).join(', ');
  const whereClause = whereKeys.map(k => `"${k}" = $${paramIndex++}`).join(' AND ');

  const sql = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause} RETURNING *`;
  const params = [...Object.values(data), ...Object.values(where)];

  return { sql, params };
}

/**
 * Build a DELETE query with proper schema prefix
 */
export function buildDelete(
  table: string,
  where: Record<string, any>
): { sql: string; params: any[] } {
  const tableName = getTableName(table);
  const whereKeys = Object.keys(where);
  const whereClause = whereKeys.map((k, i) => `"${k}" = $${i + 1}`).join(' AND ');

  const sql = `DELETE FROM ${tableName} WHERE ${whereClause}`;
  const params = Object.values(where);

  return { sql, params };
}

/**
 * Build a COUNT query with proper schema prefix
 */
export function buildCount(
  table: string,
  where?: Record<string, any>
): { sql: string; params: any[] } {
  const tableName = getTableName(table);

  let sql = `SELECT COUNT(*) as count FROM ${tableName}`;
  const params: any[] = [];

  if (where && Object.keys(where).length > 0) {
    const conditions = Object.entries(where).map(([key, value], i) => {
      params.push(value);
      return `"${key}" = $${i + 1}`;
    });
    sql += ` WHERE ${conditions.join(' AND ')}`;
  }

  return { sql, params };
}

/**
 * Type definitions for common database operations
 */
export interface DbResult<T> {
  data: T | null;
  error: Error | null;
  count?: number;
}

/**
 * Mapping from old Supabase table names to new schema-prefixed names
 * Used during migration to help identify which queries need updating
 */
export const MIGRATION_TABLE_MAP: Record<string, string> = {
  // Old (flat Supabase) -> New (schema-prefixed Aurora)
  'User': 'core."User"',
  'Organization': 'core."Organization"',
  'OrganizationMember': 'core."OrganizationMember"',
  'OrganizationInvite': 'core."OrganizationInvite"',
  'PersonalVault': 'securevault."UserProfile"', // Name change!
  'Document': 'securevault."Document"',
  'DocumentVersion': 'securevault."DocumentVersion"',
  'Folder': 'securevault."Folder"',
  'Portal': 'securevault."Portal"',
  'PortalRequest': 'securevault."PortalRequest"',
  'PortalSubmission': 'securevault."PortalSubmission"',
  'ShareLink': 'securevault."ShareLink"',
  'AuditLog': 'securevault."AuditLog"',
  'ExpirationNotification': 'securevault."ExpirationNotification"',
  'UserNotification': 'securevault."UserNotification"',
};

/**
 * App ID for SecureVault in the hub.App table
 */
export const SECUREVAULT_APP_ID = 'app_securevault';
