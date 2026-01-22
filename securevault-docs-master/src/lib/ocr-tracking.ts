// OCR tracking utilities - PostgreSQL ONLY

export async function getUserOCRUsage(userId: string): Promise<number> {
  await checkAndResetOCRMonth(userId)
  const { queryOne } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne(
    `SELECT "ocrPagesUsedThisMonth" FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )
  return parseInt(user?.ocrPagesUsedThisMonth || '0', 10)
}

export async function incrementOCRUsage(userId: string, pageCount: number): Promise<number> {
  await checkAndResetOCRMonth(userId)
  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne(
    `SELECT "ocrPagesUsedThisMonth" FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )
  const newCount = parseInt(user?.ocrPagesUsedThisMonth || '0', 10) + pageCount

  await query(
    `UPDATE ${getTableName('User')} SET "ocrPagesUsedThisMonth" = $1, "updatedAt" = NOW() WHERE id = $2`,
    [newCount, userId]
  )
  return newCount
}

export async function checkOCRLimit(
  userId: string, pageCount: number, limitPages: number
): Promise<{ allowed: boolean; currentUsage: number; newTotal: number }> {
  const currentUsage = await getUserOCRUsage(userId)
  const newTotal = currentUsage + pageCount
  return { allowed: newTotal <= limitPages, currentUsage, newTotal }
}

async function checkAndResetOCRMonth(userId: string): Promise<void> {
  const { queryOne, query } = await import('./db')
  const { getTableName } = await import('./db-utils')

  const user = await queryOne(
    `SELECT "ocrMonthResetDate" FROM ${getTableName('User')} WHERE id = $1`,
    [userId]
  )

  if (!user?.ocrMonthResetDate) {
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0, 0, 0, 0)

    await query(
      `UPDATE ${getTableName('User')} SET "ocrMonthResetDate" = $1, "ocrPagesUsedThisMonth" = 0, "updatedAt" = NOW() WHERE id = $2`,
      [monthStart.toISOString(), userId]
    )
    return
  }

  const resetDate = new Date(user.ocrMonthResetDate)
  const now = new Date()

  if (resetDate.getMonth() !== now.getMonth() || resetDate.getFullYear() !== now.getFullYear()) {
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    await query(
      `UPDATE ${getTableName('User')} SET "ocrMonthResetDate" = $1, "ocrPagesUsedThisMonth" = 0, "updatedAt" = NOW() WHERE id = $2`,
      [monthStart.toISOString(), userId]
    )
  }
}
