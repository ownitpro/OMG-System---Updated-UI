// Background Sync Manager
// Handles offline uploads and syncing when connection is restored

import {
  addPendingUpload,
  addPendingChange,
  getPendingUploads,
  getPendingChanges,
  removePendingUpload,
  removePendingChange,
  updatePendingUploadRetry,
  updateLastSync,
  type PendingUpload,
  type PendingChange,
} from './offline-storage'
import { sendAppNotification } from './push-notifications'

const MAX_RETRIES = 3

// Check if background sync is supported
export function isBackgroundSyncSupported(): boolean {
  return (
    typeof window !== 'undefined' &&
    'serviceWorker' in navigator &&
    'SyncManager' in window
  )
}

// Queue a file for upload when offline
export async function queueOfflineUpload(
  file: File,
  options: {
    personalVaultId?: string
    organizationId?: string
    folderId?: string
  }
): Promise<string> {
  console.log('[SYNC] Queueing offline upload:', file.name)

  const fileData = await file.arrayBuffer()

  const uploadId = await addPendingUpload({
    fileName: file.name,
    contentType: file.type,
    fileSize: file.size,
    fileData,
    personalVaultId: options.personalVaultId,
    organizationId: options.organizationId,
    folderId: options.folderId,
  })

  // Try to register background sync
  await registerBackgroundSync('upload-documents')

  return uploadId
}

// Queue a document change for later sync
export async function queueDocumentChange(
  type: PendingChange['type'],
  documentId: string,
  request: {
    url: string
    method: string
    headers?: Record<string, string>
    body?: any
  }
): Promise<string> {
  console.log('[SYNC] Queueing document change:', type, documentId)

  const changeId = await addPendingChange({
    type,
    documentId,
    url: request.url,
    method: request.method,
    headers: request.headers || { 'Content-Type': 'application/json' },
    body: typeof request.body === 'string' ? request.body : JSON.stringify(request.body),
  })

  // Try to register background sync
  await registerBackgroundSync('sync-pending-changes')

  return changeId
}

// Register background sync
async function registerBackgroundSync(tag: string): Promise<void> {
  if (!isBackgroundSyncSupported()) {
    console.log('[SYNC] Background sync not supported')
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready
    await (registration as any).sync.register(tag)
    console.log('[SYNC] Registered background sync:', tag)
  } catch (error) {
    console.error('[SYNC] Failed to register background sync:', error)
  }
}

// Process pending uploads (called by SW or when online)
export async function processPendingUploads(): Promise<{
  processed: number
  failed: number
}> {
  console.log('[SYNC] Processing pending uploads...')

  const pendingUploads = await getPendingUploads()
  let processed = 0
  let failed = 0

  for (const upload of pendingUploads) {
    try {
      const success = await processUpload(upload)
      if (success) {
        await removePendingUpload(upload.id)
        processed++

        // Notify user
        await sendAppNotification({
          type: 'upload_complete',
          documentId: '', // Will be set by server
          documentName: upload.fileName,
        })
      } else {
        failed++
      }
    } catch (error) {
      console.error('[SYNC] Failed to process upload:', upload.fileName, error)
      failed++

      // Increment retry count
      await updatePendingUploadRetry(upload.id)

      // Remove if max retries exceeded
      if (upload.retryCount >= MAX_RETRIES) {
        await removePendingUpload(upload.id)
        console.log('[SYNC] Removed upload after max retries:', upload.fileName)
      }
    }
  }

  if (processed > 0) {
    await updateLastSync()
  }

  console.log('[SYNC] Uploads processed:', processed, 'failed:', failed)
  return { processed, failed }
}

// Process a single upload
async function processUpload(upload: PendingUpload): Promise<boolean> {
  console.log('[SYNC] Processing upload:', upload.fileName)

  try {
    // Get presigned URL
    const presignResponse = await fetch('/api/personal/upload/presign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName: upload.fileName,
        contentType: upload.contentType,
        fileSize: upload.fileSize,
        personalVaultId: upload.personalVaultId,
      }),
    })

    if (!presignResponse.ok) {
      throw new Error('Failed to get presigned URL')
    }

    const { uploadUrl, key } = await presignResponse.json()

    // Upload to S3
    const uploadResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': upload.contentType },
      body: upload.fileData,
    })

    if (!uploadResponse.ok) {
      throw new Error('Failed to upload to S3')
    }

    // Create document record
    const createResponse = await fetch('/api/documents', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: upload.fileName,
        s3Key: key,
        mimeType: upload.contentType,
        size: upload.fileSize,
        personalVaultId: upload.personalVaultId,
        organizationId: upload.organizationId,
        folderId: upload.folderId,
      }),
    })

    if (!createResponse.ok) {
      throw new Error('Failed to create document record')
    }

    console.log('[SYNC] Upload completed:', upload.fileName)
    return true
  } catch (error) {
    console.error('[SYNC] Upload failed:', error)
    return false
  }
}

// Process pending changes
export async function processPendingChanges(): Promise<{
  processed: number
  failed: number
}> {
  console.log('[SYNC] Processing pending changes...')

  const pendingChanges = await getPendingChanges()
  let processed = 0
  let failed = 0

  for (const change of pendingChanges) {
    try {
      const response = await fetch(change.url, {
        method: change.method,
        headers: change.headers,
        body: change.body,
      })

      if (response.ok) {
        await removePendingChange(change.id)
        processed++
      } else {
        failed++

        // Remove if 4xx error (client error, won't succeed on retry)
        if (response.status >= 400 && response.status < 500) {
          await removePendingChange(change.id)
          console.log('[SYNC] Removed change due to client error:', change.id)
        }
      }
    } catch (error) {
      console.error('[SYNC] Failed to process change:', change.id, error)
      failed++
    }
  }

  if (processed > 0) {
    await updateLastSync()
  }

  console.log('[SYNC] Changes processed:', processed, 'failed:', failed)
  return { processed, failed }
}

// Sync all pending items
export async function syncAll(): Promise<{
  uploads: { processed: number; failed: number }
  changes: { processed: number; failed: number }
}> {
  const uploads = await processPendingUploads()
  const changes = await processPendingChanges()

  return { uploads, changes }
}

// Listen for online event and sync
export function setupOnlineSync(): () => void {
  const handleOnline = async () => {
    console.log('[SYNC] Online - syncing pending items...')
    await syncAll()
  }

  window.addEventListener('online', handleOnline)

  // Also sync on page load if online
  if (navigator.onLine) {
    syncAll()
  }

  return () => {
    window.removeEventListener('online', handleOnline)
  }
}
