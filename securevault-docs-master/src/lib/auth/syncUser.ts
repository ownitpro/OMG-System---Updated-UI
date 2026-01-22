// src/lib/auth/syncUser.ts
// User synchronization functions for Cognito → Aurora PostgreSQL
// Ensures users are synced to core.User table and app-specific profiles are created

import { query, queryOne } from '@/lib/db';
import { getTableName, SECUREVAULT_APP_ID } from '@/lib/db-utils';

export interface UserData {
  id: string;
  email?: string | null;
  name?: string | null;
  image?: string | null;
  accountType?: 'personal' | 'business';
}

export interface CoreUser {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  id: string;
  userId: string;
  storageUsedBytes: number;
  ocrPagesUsed: number;
  egressBytesUsed: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Sync user from Cognito to core.User table
 * Uses UPSERT to create or update the user record
 */
export async function syncUserToDatabase(user: UserData): Promise<{ data: CoreUser | null; error: Error | null }> {
  // Email is required - if not provided, skip sync
  if (!user.email) {
    console.warn('[syncUserToDatabase] Skipping sync - no email provided for user:', user.id);
    return { data: null, error: null };
  }

  try {
    const sql = `
      INSERT INTO ${getTableName('User')} (id, email, name, image, "accountType", "createdAt", "updatedAt")
      VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
      ON CONFLICT (id) DO UPDATE SET
        email = COALESCE(EXCLUDED.email, ${getTableName('User')}.email),
        name = COALESCE(EXCLUDED.name, ${getTableName('User')}.name),
        image = COALESCE(EXCLUDED.image, ${getTableName('User')}.image),
        "accountType" = COALESCE(EXCLUDED."accountType", ${getTableName('User')}."accountType"),
        "updatedAt" = NOW()
      RETURNING *
    `;

    const result = await queryOne<CoreUser>(sql, [
      user.id,
      user.email,
      user.name || null,
      user.image || null,
      user.accountType || 'personal',
    ]);
    return { data: result, error: null };
  } catch (err) {
    console.error('[syncUserToDatabase] Error:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Ensure a SecureVault UserProfile exists for the user
 * This is the app-specific profile (replaces PersonalVault in the old schema)
 */
export async function ensureUserProfile(userId: string): Promise<{ data: UserProfile | null; error: Error | null }> {
  try {
    const sql = `
      INSERT INTO ${getTableName('UserProfile')} (id, "userId", "storageUsedBytes", "ocrPagesUsed", "egressBytesUsed", "createdAt", "updatedAt")
      VALUES (gen_random_uuid()::text, $1, 0, 0, 0, NOW(), NOW())
      ON CONFLICT ("userId") DO NOTHING
      RETURNING *
    `;

    const result = await queryOne<UserProfile>(sql, [userId]);

    // If no row returned (already exists), fetch the existing one
    if (!result) {
      return getUserProfile(userId);
    }

    return { data: result, error: null };
  } catch (err) {
    console.error('[ensureUserProfile] Error:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Get user's SecureVault profile
 */
export async function getUserProfile(userId: string): Promise<{ data: UserProfile | null; error: Error | null }> {
  try {
    const sql = `
      SELECT * FROM ${getTableName('UserProfile')}
      WHERE "userId" = $1
    `;

    const result = await queryOne<UserProfile>(sql, [userId]);
    return { data: result, error: null };
  } catch (err) {
    console.error('[getUserProfile] Error:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Get user from core.User table by ID
 */
export async function getUserById(userId: string): Promise<{ data: CoreUser | null; error: Error | null }> {
  try {
    const sql = `
      SELECT * FROM ${getTableName('User')}
      WHERE id = $1
    `;

    const result = await queryOne<CoreUser>(sql, [userId]);
    return { data: result, error: null };
  } catch (err) {
    console.error('[getUserById] Error:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Get user from core.User table by email
 */
export async function getUserByEmail(email: string): Promise<{ data: CoreUser | null; error: Error | null }> {
  try {
    const sql = `
      SELECT * FROM ${getTableName('User')}
      WHERE email = $1
    `;

    const result = await queryOne<CoreUser>(sql, [email]);
    return { data: result, error: null };
  } catch (err) {
    console.error('[getUserByEmail] Error:', err);
    return { data: null, error: err as Error };
  }
}

/**
 * Update user's profile data
 */
export async function updateUser(
  userId: string,
  data: Partial<Pick<CoreUser, 'name' | 'image'>>
): Promise<{ data: CoreUser | null; error: Error | null }> {
  const updates: string[] = [];
  const values: any[] = [];
  let paramIndex = 1;

  if (data.name !== undefined) {
    updates.push(`name = $${paramIndex++}`);
    values.push(data.name);
  }

  if (data.image !== undefined) {
    updates.push(`image = $${paramIndex++}`);
    values.push(data.image);
  }

  if (updates.length === 0) {
    return getUserById(userId);
  }

  updates.push(`"updatedAt" = NOW()`);
  values.push(userId);

  const sql = `
    UPDATE ${getTableName('User')}
    SET ${updates.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

  return queryOne<CoreUser>(sql, values);
}

/**
 * Get user's subscription for SecureVault app
 */
export async function getUserSubscription(userId: string): Promise<{
  data: {
    id: string;
    userId: string;
    appId: string;
    organizationId: string | null;
    plan: string;
    status: string;
    stripeSubscriptionId: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  error: Error | null;
}> {
  const sql = `
    SELECT * FROM ${getTableName('Subscription')}
    WHERE "userId" = $1 AND "appId" = $2
  `;

  return queryOne(sql, [userId, SECUREVAULT_APP_ID]);
}

/**
 * Create or update user's subscription
 */
export async function upsertSubscription(data: {
  userId: string;
  organizationId?: string | null;
  plan: string;
  status?: string;
  stripeSubscriptionId?: string | null;
}): Promise<{ data: any; error: Error | null }> {
  const sql = `
    INSERT INTO ${getTableName('Subscription')} (
      id, "userId", "organizationId", "appId", plan, status,
      "stripeSubscriptionId", "createdAt", "updatedAt"
    )
    VALUES (
      gen_random_uuid()::text, $1, $2, $3, $4, $5,
      $6, NOW(), NOW()
    )
    ON CONFLICT ("userId", "appId")
    WHERE "organizationId" IS NOT DISTINCT FROM $2
    DO UPDATE SET
      plan = EXCLUDED.plan,
      status = EXCLUDED.status,
      "stripeSubscriptionId" = COALESCE(EXCLUDED."stripeSubscriptionId", ${getTableName('Subscription')}."stripeSubscriptionId"),
      "updatedAt" = NOW()
    RETURNING *
  `;

  return queryOne(sql, [
    data.userId,
    data.organizationId || null,
    SECUREVAULT_APP_ID,
    data.plan,
    data.status || 'active',
    data.stripeSubscriptionId || null,
  ]);
}

/**
 * Delete user account and all associated data
 * WARNING: This is destructive and should be used carefully
 */
export async function deleteUserAccount(userId: string): Promise<{ error: Error | null }> {
  // This should be done in a transaction with proper cascade deletes
  // For now, just delete from core.User (cascades should handle the rest)
  const sql = `DELETE FROM ${getTableName('User')} WHERE id = $1`;

  const result = await query(sql, [userId]);
  return { error: result.error };
}
