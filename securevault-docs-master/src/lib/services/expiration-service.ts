// Expiration Service - PostgreSQL ONLY (Server-side only - do NOT import in client components)
// For client-side use, import from '@/lib/expiration-utils' instead

import type { ExtractedMetadata } from '@/types/ocr';
import { parseExpirationDate, getDaysUntilExpiration, getExpirationStatus } from '@/lib/expiration-utils';

// Notification thresholds - days before expiration/due date
export const EXPIRATION_THRESHOLDS = [90, 60, 30, 15, 7, 2, 1]; // days before expiration
export const DUE_DATE_THRESHOLDS = [7, 3, 1]; // days before due date

export interface ExpiringDocument {
  id: string;
  name: string;
  expirationDate: Date;
  daysUntilExpiration: number;
  status: 'expired' | 'expiring_today' | 'expiring_soon' | 'upcoming';
  trackingEnabled: boolean;
  category?: string;
  subtype?: string;
  metadata?: ExtractedMetadata;
}

export interface UserNotification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  documentId?: string;
  readAt?: Date | null;
  createdAt: Date;
}

export interface ScheduleNotificationsResult {
  success: boolean;
  scheduledCount?: number;
  error?: string;
}

export interface ProcessNotificationsResult {
  processed: number;
  created: number;
  emailsSent: number;
  errors: number;
}

export class ExpirationService {
  /**
   * Schedule expiration notifications at 90, 60, 30, 15, 7, 2, 1 days before + day of expiration
   */
  async scheduleNotifications(documentId: string, expirationDate: Date, userId: string): Promise<ScheduleNotificationsResult> {
    try {
      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      const now = new Date();
      const expDate = new Date(expirationDate);

      const notifications: { type: string; scheduledFor: Date; daysBefore: number }[] = [];

      // Schedule notifications for each threshold (90, 60, 30, 15, 7, 2, 1 days before)
      for (const daysBefore of EXPIRATION_THRESHOLDS) {
        const notifyDate = new Date(expDate);
        notifyDate.setDate(notifyDate.getDate() - daysBefore);
        notifyDate.setHours(9, 0, 0, 0); // Schedule for 9 AM

        if (notifyDate > now) {
          notifications.push({
            type: `expiration_${daysBefore}d`,
            scheduledFor: notifyDate,
            daysBefore,
          });
        }
      }

      // Schedule day-of notification
      const dayOf = new Date(expDate);
      dayOf.setHours(9, 0, 0, 0);
      if (dayOf > now) {
        notifications.push({ type: 'expiration_today', scheduledFor: dayOf, daysBefore: 0 });
      }

      if (notifications.length === 0) {
        return { success: true, scheduledCount: 0 };
      }

      // Clear existing notifications for this document
      await query(`DELETE FROM ${getTableName('ExpirationNotification')} WHERE "documentId" = $1`, [documentId]);

      // Insert all scheduled notifications
      for (const n of notifications) {
        await query(
          `INSERT INTO ${getTableName('ExpirationNotification')} ("documentId", "userId", "notificationType", "scheduledFor", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
          [documentId, userId, n.type, n.scheduledFor.toISOString()]
        );
      }

      console.log(`[ExpirationService] Scheduled ${notifications.length} notifications for document ${documentId}`);

      return {
        success: true,
        scheduledCount: notifications.length,
      };
    } catch (error: any) {
      console.error('[ExpirationService] Error scheduling notifications:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Schedule due date notifications at 7, 3, 1 days before + day of due date
   */
  async scheduleDueDateNotifications(documentId: string, dueDate: Date, userId: string): Promise<ScheduleNotificationsResult> {
    try {
      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      const now = new Date();
      const dueDateObj = new Date(dueDate);

      const notifications: { type: string; scheduledFor: Date; daysBefore: number }[] = [];

      // Schedule notifications for each threshold (7, 3, 1 days before)
      for (const daysBefore of DUE_DATE_THRESHOLDS) {
        const notifyDate = new Date(dueDateObj);
        notifyDate.setDate(notifyDate.getDate() - daysBefore);
        notifyDate.setHours(9, 0, 0, 0);

        if (notifyDate > now) {
          notifications.push({
            type: `due_date_${daysBefore}d`,
            scheduledFor: notifyDate,
            daysBefore,
          });
        }
      }

      // Schedule day-of notification
      const dayOf = new Date(dueDateObj);
      dayOf.setHours(9, 0, 0, 0);
      if (dayOf > now) {
        notifications.push({ type: 'due_date_today', scheduledFor: dayOf, daysBefore: 0 });
      }

      if (notifications.length === 0) {
        return { success: true, scheduledCount: 0 };
      }

      // Clear existing due date notifications for this document
      await query(
        `DELETE FROM ${getTableName('ExpirationNotification')} WHERE "documentId" = $1 AND "notificationType" LIKE 'due_date%'`,
        [documentId]
      );

      // Insert all scheduled notifications
      for (const n of notifications) {
        await query(
          `INSERT INTO ${getTableName('ExpirationNotification')} ("documentId", "userId", "notificationType", "scheduledFor", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, NOW(), NOW())`,
          [documentId, userId, n.type, n.scheduledFor.toISOString()]
        );
      }

      console.log(`[ExpirationService] Scheduled ${notifications.length} due date notifications for document ${documentId}`);

      return {
        success: true,
        scheduledCount: notifications.length,
      };
    } catch (error: any) {
      console.error('[ExpirationService] Error scheduling due date notifications:', error);
      return { success: false, error: error.message };
    }
  }

  async cancelNotifications(documentId: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');
      await query(`DELETE FROM ${getTableName('ExpirationNotification')} WHERE "documentId" = $1`, [documentId]);
      return { success: true };
    } catch {
      return { success: true };
    }
  }

  async toggleTracking(documentId: string, enabled: boolean, userId?: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { queryOne } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      const document = await queryOne(
        `UPDATE ${getTableName('Document')} SET "expirationTrackingEnabled" = $1, "updatedAt" = NOW() WHERE id = $2 RETURNING id, "expirationDate", "uploadedById"`,
        [enabled, documentId]
      );

      if (enabled && document?.expirationDate) {
        await this.scheduleNotifications(documentId, new Date(document.expirationDate), userId || document.uploadedById);
      } else if (!enabled) {
        await this.cancelNotifications(documentId);
      }

      return { success: true };
    } catch {
      return { success: true };
    }
  }

  async getUpcomingExpirations(userId: string, options: { days?: number; limit?: number; includeExpired?: boolean; personalVaultId?: string; organizationId?: string; } = {}): Promise<ExpiringDocument[]> {
    const { days = 90, limit = 50, includeExpired = true, personalVaultId, organizationId } = options;

    try {
      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + days);

      let sql = `SELECT id, name, "expirationDate", "expirationTrackingEnabled", "documentCategory", "documentSubtype", "extractedMetadata" FROM ${getTableName('Document')} WHERE "expirationTrackingEnabled" = true AND "expirationDate" IS NOT NULL`;
      const params: any[] = [];
      let paramIndex = 1;

      if (personalVaultId) { sql += ` AND "personalVaultId" = $${paramIndex++}`; params.push(personalVaultId); }
      else if (organizationId) { sql += ` AND "organizationId" = $${paramIndex++}`; params.push(organizationId); }

      sql += ` AND "expirationDate" <= $${paramIndex++}`;
      params.push(futureDate.toISOString());
      sql += ` ORDER BY "expirationDate" ASC LIMIT $${paramIndex++}`;
      params.push(limit);

      const documents = await query(sql, params);

      return (documents || []).map((doc: any) => {
        const expDate = new Date(doc.expirationDate);
        const daysUntil = getDaysUntilExpiration(expDate);
        return {
          id: doc.id, name: doc.name, expirationDate: expDate,
          daysUntilExpiration: daysUntil, status: getExpirationStatus(daysUntil),
          trackingEnabled: doc.expirationTrackingEnabled, category: doc.documentCategory,
          subtype: doc.documentSubtype, metadata: doc.extractedMetadata,
        };
      });
    } catch {
      return [];
    }
  }

  /**
   * Process scheduled notifications - creates UserNotifications for due items
   * Called by cron job or real-time check
   */
  async processScheduledNotifications(): Promise<ProcessNotificationsResult> {
    const result: ProcessNotificationsResult = { processed: 0, created: 0, emailsSent: 0, errors: 0 };

    try {
      const { query, queryOne } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      // Get all scheduled notifications that are due and haven't been sent
      const dueNotifications = await query<{
        id: string;
        documentId: string;
        userId: string;
        notificationType: string;
        scheduledFor: string;
      }>(
        `SELECT en.id, en."documentId", en."userId", en."notificationType", en."scheduledFor"
         FROM ${getTableName('ExpirationNotification')} en
         WHERE en."scheduledFor" <= NOW() AND en."sentAt" IS NULL
         ORDER BY en."scheduledFor" ASC
         LIMIT 100`,
        []
      );

      if (!dueNotifications || dueNotifications.length === 0) {
        return result;
      }

      console.log(`[ExpirationService] Processing ${dueNotifications.length} due notifications`);

      for (const notification of dueNotifications) {
        try {
          result.processed++;

          // Get document details for the notification message
          const document = await queryOne<{
            id: string;
            name: string;
            documentCategory: string | null;
            documentSubtype: string | null;
            expirationDate: string | null;
            dueDate: string | null;
          }>(
            `SELECT id, name, "documentCategory", "documentSubtype", "expirationDate", "dueDate" FROM ${getTableName('Document')} WHERE id = $1`,
            [notification.documentId]
          );

          if (!document) {
            console.warn(`[ExpirationService] Document ${notification.documentId} not found, skipping notification`);
            await query(`UPDATE ${getTableName('ExpirationNotification')} SET "sentAt" = NOW() WHERE id = $1`, [notification.id]);
            continue;
          }

          // Get user details for email
          const user = await queryOne<{
            id: string;
            email: string;
            name: string | null;
            emailNotificationsEnabled: boolean | null;
          }>(
            `SELECT id, email, name, "emailNotificationsEnabled" FROM ${getTableName('User')} WHERE id = $1`,
            [notification.userId]
          );

          if (!user) {
            console.warn(`[ExpirationService] User ${notification.userId} not found, skipping notification`);
            await query(`UPDATE ${getTableName('ExpirationNotification')} SET "sentAt" = NOW() WHERE id = $1`, [notification.id]);
            continue;
          }

          // Generate notification title and message
          const { title, message } = this.generateNotificationContent(
            notification.notificationType,
            document.name,
            document.documentCategory,
            document.documentSubtype,
            document.expirationDate || document.dueDate
          );

          // Check if notification already exists to prevent duplicates
          const existingNotification = await queryOne<{ id: string }>(
            `SELECT id FROM ${getTableName('UserNotification')}
             WHERE "userId" = $1 AND "documentId" = $2 AND "type" = $3 AND DATE("createdAt") = CURRENT_DATE`,
            [notification.userId, notification.documentId, notification.notificationType]
          );

          if (!existingNotification) {
            // Create UserNotification (bell notification - always created)
            await query(
              `INSERT INTO ${getTableName('UserNotification')} ("userId", "type", "title", "message", "documentId", "createdAt")
               VALUES ($1, $2, $3, $4, $5, NOW())`,
              [notification.userId, notification.notificationType, title, message, notification.documentId]
            );
            result.created++;
            console.log(`[ExpirationService] Created notification for user ${notification.userId}: ${title}`);
          }

          // Send email if user has email notifications enabled (default: true)
          const emailEnabled = user.emailNotificationsEnabled !== false;
          if (emailEnabled && user.email) {
            try {
              const { sendNotificationEmail } = await import('@/lib/services/email-notification-service');
              await sendNotificationEmail({
                userEmail: user.email,
                userName: user.name || 'User',
                documentName: document.name,
                notificationType: notification.notificationType,
                title,
                message,
                date: document.expirationDate || document.dueDate || '',
              });
              result.emailsSent++;
            } catch (emailError) {
              console.error(`[ExpirationService] Failed to send email to ${user.email}:`, emailError);
              // Continue processing - email failure shouldn't stop notification creation
            }
          }

          // Mark the scheduled notification as sent
          await query(`UPDATE ${getTableName('ExpirationNotification')} SET "sentAt" = NOW() WHERE id = $1`, [notification.id]);

        } catch (error) {
          console.error(`[ExpirationService] Error processing notification ${notification.id}:`, error);
          result.errors++;
        }
      }

      console.log(`[ExpirationService] Processing complete: ${result.created} created, ${result.emailsSent} emails sent, ${result.errors} errors`);
      return result;

    } catch (error: any) {
      console.error('[ExpirationService] Error in processScheduledNotifications:', error);
      return result;
    }
  }

  /**
   * Generate notification title and message based on type and document info
   */
  private generateNotificationContent(
    type: string,
    documentName: string,
    category: string | null,
    subtype: string | null,
    dateStr: string | null
  ): { title: string; message: string } {
    const docType = subtype || category || 'Document';
    const dateFormatted = dateStr ? new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

    // Expiration notifications
    if (type === 'expiration_90d') {
      return {
        title: `${documentName} (${docType}) - Expires in 90 Days`,
        message: `Your ${docType.toLowerCase()} "${documentName}" will expire on ${dateFormatted}. Consider renewing soon.`,
      };
    }
    if (type === 'expiration_60d') {
      return {
        title: `${documentName} (${docType}) - Expires in 60 Days`,
        message: `Your ${docType.toLowerCase()} "${documentName}" will expire on ${dateFormatted}.`,
      };
    }
    if (type === 'expiration_30d') {
      return {
        title: `${documentName} (${docType}) - Expires in 30 Days`,
        message: `Your ${docType.toLowerCase()} "${documentName}" will expire on ${dateFormatted}. Start the renewal process now.`,
      };
    }
    if (type === 'expiration_15d') {
      return {
        title: `${documentName} (${docType}) - Expires in 15 Days`,
        message: `Your ${docType.toLowerCase()} "${documentName}" will expire on ${dateFormatted}. Renewal recommended.`,
      };
    }
    if (type === 'expiration_7d') {
      return {
        title: `${documentName} (${docType}) - Expires in 7 Days`,
        message: `Your ${docType.toLowerCase()} "${documentName}" will expire on ${dateFormatted}. Take action now!`,
      };
    }
    if (type === 'expiration_2d') {
      return {
        title: `${documentName} (${docType}) - Expires in 2 Days!`,
        message: `URGENT: Your ${docType.toLowerCase()} "${documentName}" will expire on ${dateFormatted}.`,
      };
    }
    if (type === 'expiration_1d') {
      return {
        title: `${documentName} (${docType}) - Expires Tomorrow!`,
        message: `URGENT: Your ${docType.toLowerCase()} "${documentName}" expires tomorrow (${dateFormatted}).`,
      };
    }
    if (type === 'expiration_today') {
      return {
        title: `${documentName} (${docType}) - Expires Today!`,
        message: `CRITICAL: Your ${docType.toLowerCase()} "${documentName}" expires today!`,
      };
    }
    if (type === 'document_expired') {
      return {
        title: `${documentName} (${docType}) - Has Expired`,
        message: `Your ${docType.toLowerCase()} "${documentName}" has expired. Please renew immediately.`,
      };
    }

    // Due date notifications
    if (type === 'due_date_7d') {
      return {
        title: `${documentName} (${docType}) - Due in 7 Days`,
        message: `"${documentName}" is due on ${dateFormatted}. Plan ahead to meet the deadline.`,
      };
    }
    if (type === 'due_date_3d') {
      return {
        title: `${documentName} (${docType}) - Due in 3 Days`,
        message: `"${documentName}" is due on ${dateFormatted}. Don't forget!`,
      };
    }
    if (type === 'due_date_1d') {
      return {
        title: `${documentName} (${docType}) - Due Tomorrow!`,
        message: `REMINDER: "${documentName}" is due tomorrow (${dateFormatted}).`,
      };
    }
    if (type === 'due_date_today') {
      return {
        title: `${documentName} (${docType}) - Due Today!`,
        message: `URGENT: "${documentName}" is due today!`,
      };
    }
    if (type === 'past_due') {
      return {
        title: `${documentName} (${docType}) - Past Due!`,
        message: `"${documentName}" was due on ${dateFormatted} and is now past due.`,
      };
    }

    // Default
    return {
      title: `Notification: ${documentName}`,
      message: `You have a notification about "${documentName}".`,
    };
  }

  /**
   * Check and create urgent notifications for documents expiring/due today or past
   * Called on dashboard load for real-time visibility
   */
  async checkAndCreateUrgentNotifications(userId: string): Promise<{ created: number }> {
    let created = 0;

    try {
      const { query, queryOne } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      // Get documents with expiration dates that are today or past without recent notification
      const urgentDocs = await query<{
        id: string;
        name: string;
        documentCategory: string | null;
        documentSubtype: string | null;
        expirationDate: string | null;
        dueDate: string | null;
        type: 'expiration' | 'due_date';
      }>(
        `SELECT d.id, d.name, d."documentCategory", d."documentSubtype", d."expirationDate", d."dueDate",
         CASE
           WHEN d."expirationDate" IS NOT NULL AND d."expirationDate"::date <= CURRENT_DATE THEN 'expiration'
           WHEN d."dueDate" IS NOT NULL AND d."dueDate"::date <= CURRENT_DATE THEN 'due_date'
         END as type
         FROM ${getTableName('Document')} d
         WHERE d."uploadedById" = $1
         AND (
           (d."expirationDate" IS NOT NULL AND d."expirationDate"::date <= CURRENT_DATE AND d."expirationTrackingEnabled" = true)
           OR (d."dueDate" IS NOT NULL AND d."dueDate"::date <= CURRENT_DATE AND d."dueDateTrackingEnabled" = true)
         )`,
        [userId]
      );

      if (!urgentDocs || urgentDocs.length === 0) {
        return { created: 0 };
      }

      for (const doc of urgentDocs) {
        const dateToCheck = doc.type === 'expiration' ? doc.expirationDate : doc.dueDate;
        if (!dateToCheck) continue;

        const dateObj = new Date(dateToCheck);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        dateObj.setHours(0, 0, 0, 0);

        const isToday = dateObj.getTime() === today.getTime();
        const isPast = dateObj.getTime() < today.getTime();

        let notificationType: string;
        if (doc.type === 'expiration') {
          notificationType = isToday ? 'expiration_today' : 'document_expired';
        } else {
          notificationType = isToday ? 'due_date_today' : 'past_due';
        }

        // Check if notification already exists for today
        const existing = await queryOne<{ id: string }>(
          `SELECT id FROM ${getTableName('UserNotification')}
           WHERE "userId" = $1 AND "documentId" = $2 AND "type" = $3 AND DATE("createdAt") = CURRENT_DATE`,
          [userId, doc.id, notificationType]
        );

        if (!existing) {
          const { title, message } = this.generateNotificationContent(
            notificationType,
            doc.name,
            doc.documentCategory,
            doc.documentSubtype,
            dateToCheck
          );

          await query(
            `INSERT INTO ${getTableName('UserNotification')} ("userId", "type", "title", "message", "documentId", "createdAt")
             VALUES ($1, $2, $3, $4, $5, NOW())`,
            [userId, notificationType, title, message, doc.id]
          );
          created++;
        }
      }

      if (created > 0) {
        console.log(`[ExpirationService] Created ${created} urgent notifications for user ${userId}`);
      }

      return { created };
    } catch (error) {
      console.error('[ExpirationService] Error in checkAndCreateUrgentNotifications:', error);
      return { created: 0 };
    }
  }

  async getUnreadCount(userId: string): Promise<number> {
    try {
      const { queryOne } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');
      const result = await queryOne(`SELECT COUNT(*) as count FROM ${getTableName('UserNotification')} WHERE "userId" = $1 AND "readAt" IS NULL`, [userId]);
      return parseInt(result?.count || '0', 10);
    } catch {
      return 0;
    }
  }

  async getNotifications(userId: string, options: { limit?: number; offset?: number; unreadOnly?: boolean; } = {}): Promise<UserNotification[]> {
    const { limit = 20, offset = 0, unreadOnly = false } = options;
    try {
      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      let sql = `SELECT * FROM ${getTableName('UserNotification')} WHERE "userId" = $1`;
      if (unreadOnly) sql += ` AND "readAt" IS NULL`;
      sql += ` ORDER BY "createdAt" DESC LIMIT $2 OFFSET $3`;

      const data = await query(sql, [userId, limit, offset]);
      return (data || []).map((n: any) => ({
        id: n.id, userId: n.userId, type: n.type, title: n.title,
        message: n.message, documentId: n.documentId,
        readAt: n.readAt ? new Date(n.readAt) : null, createdAt: new Date(n.createdAt),
      }));
    } catch {
      return [];
    }
  }

  async markAsRead(notificationId: string, userId: string): Promise<{ success: boolean }> {
    try {
      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');
      await query(`UPDATE ${getTableName('UserNotification')} SET "readAt" = NOW() WHERE id = $1 AND "userId" = $2`, [notificationId, userId]);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async markAllAsRead(userId: string): Promise<{ success: boolean }> {
    try {
      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');
      await query(`UPDATE ${getTableName('UserNotification')} SET "readAt" = NOW() WHERE "userId" = $1 AND "readAt" IS NULL`, [userId]);
      return { success: true };
    } catch {
      return { success: false };
    }
  }

  async saveExpirationData(documentId: string, expirationDate: Date | string | null, userId: string, autoEnableTracking: boolean = true): Promise<{ success: boolean; error?: string }> {
    try {
      if (!expirationDate) return { success: true };

      const expDate = typeof expirationDate === 'string' ? parseExpirationDate(expirationDate) : expirationDate;
      if (!expDate) return { success: true };

      const { query } = await import('@/lib/db');
      const { getTableName } = await import('@/lib/db-utils');

      await query(
        `UPDATE ${getTableName('Document')} SET "expirationDate" = $1, "expirationTrackingEnabled" = $2, "updatedAt" = NOW() WHERE id = $3`,
        [expDate.toISOString(), autoEnableTracking, documentId]
      );

      if (autoEnableTracking) {
        await this.scheduleNotifications(documentId, expDate, userId);
      }

      return { success: true };
    } catch (error: any) {
      return { success: true };
    }
  }
}

export const expirationService = new ExpirationService();
