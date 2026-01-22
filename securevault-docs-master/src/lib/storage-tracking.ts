// Storage tracking utilities - PostgreSQL ONLY
// Storage data is stored in UserProfile table, NOT User table

export async function calculatePersonalVaultStorage(userId: string): Promise<number> {
  const { queryOne } = await import('./db')
  const { getTableName } = await import('./db-utils')

  // Get the UserProfile (which acts as personal vault)
  const profile = await queryOne(
    `SELECT id FROM ${getTableName('UserProfile')} WHERE "userId" = $1`,
    [userId]
  )

  if (!profile) return 0

  // Sum all document sizes in this personal vault
  const result = await queryOne(
    `SELECT COALESCE(SUM("sizeBytes"), 0) as total FROM ${getTableName('Document')} WHERE "personalVaultId" = $1`,
    [profile.id]
  )
  return parseInt(result?.total || '0', 10)
}

export async function updateUserStorage(userId: string): Promise<{ storageBytes: number; storageGb: number }> {
  const { query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const storageBytes = await calculatePersonalVaultStorage(userId)
  const storageGb = storageBytes / (1024 * 1024 * 1024)

  // Only update UserProfile - User table doesn't have storageUsedBytes column
  try {
    await query(
      `UPDATE ${getTableName('UserProfile')} SET "storageUsedBytes" = $1, "updatedAt" = NOW() WHERE "userId" = $2`,
      [storageBytes, userId]
    )
  } catch (err) {
    console.log('Could not update UserProfile storage, table may not have this column')
  }

  return { storageBytes, storageGb }
}

export async function getUserStorage(userId: string): Promise<{ storageBytes: number; storageGb: number }> {
  const { queryOne } = await import('./db')
  const { getTableName } = await import('./db-utils')

  // Get storage from UserProfile table (NOT User table)
  const profile = await queryOne(
    `SELECT "storageUsedBytes" FROM ${getTableName('UserProfile')} WHERE "userId" = $1`,
    [userId]
  )

  if (profile?.storageUsedBytes) {
    const storageBytes = parseInt(profile.storageUsedBytes || '0', 10)
    const storageGb = storageBytes / (1024 * 1024 * 1024)
    return { storageBytes, storageGb }
  }

  // If no stored value, calculate from documents
  const storageBytes = await calculatePersonalVaultStorage(userId)
  const storageGb = storageBytes / (1024 * 1024 * 1024)
  return { storageBytes, storageGb }
}

export async function checkStorageLimit(
  userId: string, additionalBytes: number, limitGb: number
): Promise<{ allowed: boolean; currentGb: number; newTotalGb: number }> {
  const { storageBytes: currentBytes } = await getUserStorage(userId)
  const newTotalBytes = currentBytes + additionalBytes
  const newTotalGb = newTotalBytes / (1024 * 1024 * 1024)
  const currentGb = currentBytes / (1024 * 1024 * 1024)
  return { allowed: newTotalGb <= limitGb, currentGb, newTotalGb }
}
