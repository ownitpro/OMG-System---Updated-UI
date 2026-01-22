// Notification Service
// Handles creating in-app (bell) notifications for various events

export interface CreateNotificationParams {
  userId: string
  type: string
  title: string
  message: string
  documentId?: string
}

export interface NotifyOrgOwnersParams {
  organizationId: string
  type: string
  title: string
  message: string
  documentId?: string
  excludeUserId?: string // Don't notify this user (e.g., the uploader if they're also an owner)
}

export interface ClientUploadNotificationParams {
  organizationId: string
  organizationName: string
  clientName: string
  clientEmail?: string
  fileName: string
  folderPath: string
  documentId: string
}

/**
 * Create a notification for a specific user
 */
export async function createNotification(params: CreateNotificationParams): Promise<{ success: boolean; notificationId?: string; error?: string }> {
  try {
    const { query, queryOne } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    const result = await queryOne<{ id: string }>(
      `INSERT INTO ${getTableName('UserNotification')} ("userId", "type", "title", "message", "documentId", "createdAt")
       VALUES ($1, $2, $3, $4, $5, NOW())
       RETURNING id`,
      [params.userId, params.type, params.title, params.message, params.documentId || null]
    )

    return { success: true, notificationId: result?.id }
  } catch (error: any) {
    console.error('[NotificationService] Error creating notification:', error)
    return { success: false, error: error.message }
  }
}

/**
 * Notify all owners/admins of an organization
 */
export async function notifyOrgOwners(params: NotifyOrgOwnersParams): Promise<{ success: boolean; notifiedCount: number }> {
  try {
    const { query } = await import('@/lib/db')
    const { getTableName } = await import('@/lib/db-utils')

    // Get organization owners and admins
    const owners = await query<{
      userId: string
      email: string
      name: string | null
    }>(
      `SELECT m."userId", u.email, u.name
       FROM ${getTableName('OrganizationMember')} m
       JOIN ${getTableName('User')} u ON u.id = m."userId"
       WHERE m."organizationId" = $1 AND m.role IN ('owner', 'admin')`,
      [params.organizationId]
    )

    if (!owners || owners.length === 0) {
      return { success: true, notifiedCount: 0 }
    }

    let notifiedCount = 0

    for (const owner of owners) {
      // Skip excluded user
      if (params.excludeUserId && owner.userId === params.excludeUserId) {
        continue
      }

      // Create notification
      await query(
        `INSERT INTO ${getTableName('UserNotification')} ("userId", "type", "title", "message", "documentId", "createdAt")
         VALUES ($1, $2, $3, $4, $5, NOW())`,
        [owner.userId, params.type, params.title, params.message, params.documentId || null]
      )
      notifiedCount++
    }

    console.log(`[NotificationService] Notified ${notifiedCount} org owners for ${params.type}`)
    return { success: true, notifiedCount }

  } catch (error: any) {
    console.error('[NotificationService] Error notifying org owners:', error)
    return { success: false, notifiedCount: 0 }
  }
}

/**
 * Create client upload notification for organization owners
 * Called when a client uploads a file through a portal
 */
export async function notifyClientUpload(params: ClientUploadNotificationParams): Promise<{ success: boolean; notifiedCount: number }> {
  const {
    organizationId,
    organizationName,
    clientName,
    fileName,
    folderPath,
    documentId,
  } = params

  const title = `${clientName} uploaded "${fileName}"`
  const message = `${clientName} uploaded "${fileName}" to ${folderPath || 'root folder'} in ${organizationName}`

  // Create bell notifications for org owners
  const result = await notifyOrgOwners({
    organizationId,
    type: 'client_upload',
    title,
    message,
    documentId,
  })

  // Also send email notifications to owners
  if (result.success && result.notifiedCount > 0) {
    try {
      const { query } = await import('@/lib/db')
      const { getTableName } = await import('@/lib/db-utils')

      const owners = await query<{
        userId: string
        email: string
        name: string | null
        emailNotificationsEnabled: boolean | null
      }>(
        `SELECT m."userId", u.email, u.name, u."emailNotificationsEnabled"
         FROM ${getTableName('OrganizationMember')} m
         JOIN ${getTableName('User')} u ON u.id = m."userId"
         WHERE m."organizationId" = $1 AND m.role IN ('owner', 'admin')`,
        [organizationId]
      )

      const { sendClientUploadNotification } = await import('@/lib/services/email-notification-service')

      for (const owner of owners || []) {
        // Only send email if enabled (default is true)
        if (owner.emailNotificationsEnabled !== false && owner.email) {
          try {
            await sendClientUploadNotification({
              ownerEmail: owner.email,
              ownerName: owner.name || 'Admin',
              clientName,
              fileName,
              folderPath: folderPath || 'Root',
              organizationName,
              uploadDate: new Date(),
            })
          } catch (emailError) {
            console.error(`[NotificationService] Failed to send email to ${owner.email}:`, emailError)
          }
        }
      }
    } catch (error) {
      console.error('[NotificationService] Error sending client upload emails:', error)
    }
  }

  return result
}

/**
 * Create a batch of notifications (e.g., for multiple users)
 */
export async function createBatchNotifications(
  notifications: CreateNotificationParams[]
): Promise<{ success: boolean; createdCount: number }> {
  let createdCount = 0

  for (const notification of notifications) {
    const result = await createNotification(notification)
    if (result.success) {
      createdCount++
    }
  }

  return { success: createdCount > 0, createdCount }
}
