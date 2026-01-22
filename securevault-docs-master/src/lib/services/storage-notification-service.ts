// Storage Notification Service
// Handles checking and notifying users about storage usage thresholds

export interface StorageCheckResult {
  notificationCreated: boolean;
  threshold?: 75 | 90 | 100;
  percentUsed: number;
}

/**
 * Check storage usage and create notification if threshold crossed
 * Only notifies once per threshold to prevent spam
 */
export async function checkStorageAndNotify(
  userId: string,
  usedBytes: number,
  totalBytes: number,
  vaultType: 'personal' | 'organization',
  vaultId: string,
  vaultName: string
): Promise<StorageCheckResult> {
  const percentUsed = (usedBytes / totalBytes) * 100;

  const result: StorageCheckResult = {
    notificationCreated: false,
    percentUsed,
  };

  // Only check thresholds if we're at least at 75%
  if (percentUsed < 75) {
    return result;
  }

  try {
    const { query, queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    // Determine current threshold
    let currentThreshold: 75 | 90 | 100;
    if (percentUsed >= 100) {
      currentThreshold = 100;
    } else if (percentUsed >= 90) {
      currentThreshold = 90;
    } else {
      currentThreshold = 75;
    }

    const notificationType = currentThreshold === 100 ? 'storage_full' : `storage_warning_${currentThreshold}`;

    // Check if user has already been notified for this threshold recently (last 7 days)
    const recentNotification = await queryOne<{ id: string }>(
      `SELECT id FROM ${getTableName('UserNotification')}
       WHERE "userId" = $1 AND "type" = $2 AND "createdAt" > NOW() - INTERVAL '7 days'`,
      [userId, notificationType]
    );

    if (recentNotification) {
      // Already notified for this threshold
      return result;
    }

    // Generate notification content
    const { title, message } = generateStorageNotificationContent(
      currentThreshold,
      usedBytes,
      totalBytes,
      vaultName
    );

    // Create notification
    await query(
      `INSERT INTO ${getTableName('UserNotification')} ("userId", "type", "title", "message", "createdAt")
       VALUES ($1, $2, $3, $4, NOW())`,
      [userId, notificationType, title, message]
    );

    console.log(`[StorageNotification] Created ${notificationType} notification for user ${userId}`);

    result.notificationCreated = true;
    result.threshold = currentThreshold;

    // Send email if user has email notifications enabled
    try {
      const user = await queryOne<{
        email: string;
        name: string | null;
        emailNotificationsEnabled: boolean | null;
      }>(
        `SELECT email, name, "emailNotificationsEnabled" FROM ${getTableName('User')} WHERE id = $1`,
        [userId]
      );

      if (user && user.emailNotificationsEnabled !== false && user.email) {
        const { sendStorageAlertEmail } = await import('@/lib/services/email-notification-service');
        await sendStorageAlertEmail({
          userEmail: user.email,
          userName: user.name || 'User',
          usedBytes,
          totalBytes,
          percentUsed,
          vaultName,
        });
      }
    } catch (emailError) {
      console.error('[StorageNotification] Failed to send email:', emailError);
    }

    return result;

  } catch (error) {
    console.error('[StorageNotification] Error:', error);
    return result;
  }
}

/**
 * Generate storage notification content based on threshold
 */
function generateStorageNotificationContent(
  threshold: 75 | 90 | 100,
  usedBytes: number,
  totalBytes: number,
  vaultName: string
): { title: string; message: string } {
  const formatBytes = (bytes: number): string => {
    if (bytes >= 1024 * 1024 * 1024) {
      return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
    }
    if (bytes >= 1024 * 1024) {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  const used = formatBytes(usedBytes);
  const total = formatBytes(totalBytes);

  if (threshold === 100) {
    return {
      title: `Storage Full - ${vaultName}`,
      message: `Your ${vaultName} storage is full (${used} of ${total}). Delete files or upgrade your plan to continue uploading.`,
    };
  }

  if (threshold === 90) {
    return {
      title: `Storage Critical (90%) - ${vaultName}`,
      message: `Your ${vaultName} storage is almost full at 90% (${used} of ${total}). Consider freeing up space soon.`,
    };
  }

  return {
    title: `Storage Warning (75%) - ${vaultName}`,
    message: `Your ${vaultName} storage is filling up at 75% (${used} of ${total}). Keep an eye on your usage.`,
  };
}

/**
 * Reset storage notification flags when user clears storage or upgrades
 * Call this when user's storage usage drops below a threshold
 */
export async function resetStorageNotificationFlags(
  userId: string,
  currentPercentUsed: number
): Promise<void> {
  try {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    // If usage dropped below 75%, they can be notified again if it goes back up
    // No need to do anything specific as we check by date anyway

    // But if usage is now below 50%, delete old storage warnings so they can be notified again
    if (currentPercentUsed < 50) {
      await query(
        `DELETE FROM ${getTableName('UserNotification')}
         WHERE "userId" = $1 AND "type" LIKE 'storage_%' AND "createdAt" < NOW() - INTERVAL '30 days'`,
        [userId]
      );
    }
  } catch (error) {
    console.error('[StorageNotification] Error resetting flags:', error);
  }
}
