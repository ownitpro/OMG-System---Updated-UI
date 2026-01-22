// Offline Storage Utilities
// Uses IndexedDB via idb-keyval for document caching and offline functionality

import { get, set, del, keys, createStore } from 'idb-keyval'

// Create custom stores for different data types
const documentsStore = createStore('securevault-documents', 'documents')
const metadataStore = createStore('securevault-metadata', 'metadata')
const pendingUploadsStore = createStore('securevault-pending', 'uploads')
const pendingChangesStore = createStore('securevault-changes', 'changes')
const settingsStore = createStore('securevault-settings', 'settings')

// Document cache entry
export interface CachedDocument {
  id: string
  name: string
  mimeType: string
  size: number
  blob: Blob
  thumbnailBlob?: Blob
  cachedAt: string
  expiresAt?: string
  folderId?: string
  folderPath?: string
}

// Pending upload entry
export interface PendingUpload {
  id: string
  fileName: string
  contentType: string
  fileSize: number
  fileData: ArrayBuffer
  personalVaultId?: string
  organizationId?: string
  folderId?: string
  createdAt: string
  retryCount: number
}

// Pending change entry (for offline edits)
export interface PendingChange {
  id: string
  type: 'rename' | 'move' | 'delete' | 'update-expiration'
  documentId: string
  url: string
  method: string
  headers: Record<string, string>
  body: string
  createdAt: string
  retryCount: number
}

// ===================
// Document Caching
// ===================

export async function cacheDocument(doc: CachedDocument): Promise<void> {
  try {
    await set(doc.id, doc, documentsStore)
    console.log('[OFFLINE] Cached document:', doc.name)
  } catch (error) {
    console.error('[OFFLINE] Failed to cache document:', error)
    throw error
  }
}

export async function getCachedDocument(id: string): Promise<CachedDocument | undefined> {
  try {
    return await get(id, documentsStore)
  } catch (error) {
    console.error('[OFFLINE] Failed to get cached document:', error)
    return undefined
  }
}

export async function removeCachedDocument(id: string): Promise<void> {
  try {
    await del(id, documentsStore)
    console.log('[OFFLINE] Removed cached document:', id)
  } catch (error) {
    console.error('[OFFLINE] Failed to remove cached document:', error)
  }
}

export async function getAllCachedDocuments(): Promise<CachedDocument[]> {
  try {
    const allKeys = await keys(documentsStore)
    const documents: CachedDocument[] = []

    for (const key of allKeys) {
      const doc = await get(key, documentsStore)
      if (doc) documents.push(doc)
    }

    return documents
  } catch (error) {
    console.error('[OFFLINE] Failed to get all cached documents:', error)
    return []
  }
}

export async function getCacheSize(): Promise<number> {
  try {
    const documents = await getAllCachedDocuments()
    return documents.reduce((total, doc) => total + doc.size, 0)
  } catch (error) {
    console.error('[OFFLINE] Failed to calculate cache size:', error)
    return 0
  }
}

export async function clearDocumentCache(): Promise<void> {
  try {
    const allKeys = await keys(documentsStore)
    for (const key of allKeys) {
      await del(key, documentsStore)
    }
    console.log('[OFFLINE] Cleared document cache')
  } catch (error) {
    console.error('[OFFLINE] Failed to clear document cache:', error)
  }
}

// Cache a document from URL
export async function cacheDocumentFromUrl(
  documentId: string,
  documentUrl: string,
  metadata: {
    name: string
    mimeType: string
    size: number
    folderId?: string
    folderPath?: string
    expiresAt?: string
  }
): Promise<void> {
  try {
    const response = await fetch(documentUrl)
    if (!response.ok) throw new Error('Failed to fetch document')

    const blob = await response.blob()

    const cachedDoc: CachedDocument = {
      id: documentId,
      name: metadata.name,
      mimeType: metadata.mimeType,
      size: metadata.size,
      blob,
      cachedAt: new Date().toISOString(),
      expiresAt: metadata.expiresAt,
      folderId: metadata.folderId,
      folderPath: metadata.folderPath,
    }

    await cacheDocument(cachedDoc)
  } catch (error) {
    console.error('[OFFLINE] Failed to cache document from URL:', error)
    throw error
  }
}

// ===================
// Pending Uploads
// ===================

export async function addPendingUpload(upload: Omit<PendingUpload, 'id' | 'createdAt' | 'retryCount'>): Promise<string> {
  const id = `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const pendingUpload: PendingUpload = {
    ...upload,
    id,
    createdAt: new Date().toISOString(),
    retryCount: 0,
  }

  try {
    await set(id, pendingUpload, pendingUploadsStore)
    console.log('[OFFLINE] Added pending upload:', upload.fileName)

    // Request background sync if available
    if ('serviceWorker' in navigator && 'sync' in (await navigator.serviceWorker.ready)) {
      const registration = await navigator.serviceWorker.ready
      await (registration as any).sync.register('upload-documents')
    }

    return id
  } catch (error) {
    console.error('[OFFLINE] Failed to add pending upload:', error)
    throw error
  }
}

export async function getPendingUploads(): Promise<PendingUpload[]> {
  try {
    const allKeys = await keys(pendingUploadsStore)
    const uploads: PendingUpload[] = []

    for (const key of allKeys) {
      const upload = await get(key, pendingUploadsStore)
      if (upload) uploads.push(upload)
    }

    return uploads.sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  } catch (error) {
    console.error('[OFFLINE] Failed to get pending uploads:', error)
    return []
  }
}

export async function removePendingUpload(id: string): Promise<void> {
  try {
    await del(id, pendingUploadsStore)
    console.log('[OFFLINE] Removed pending upload:', id)
  } catch (error) {
    console.error('[OFFLINE] Failed to remove pending upload:', error)
  }
}

export async function updatePendingUploadRetry(id: string): Promise<void> {
  try {
    const upload = await get<PendingUpload>(id, pendingUploadsStore)
    if (upload) {
      upload.retryCount++
      await set(id, upload, pendingUploadsStore)
    }
  } catch (error) {
    console.error('[OFFLINE] Failed to update pending upload retry:', error)
  }
}

// ===================
// Pending Changes
// ===================

export async function addPendingChange(change: Omit<PendingChange, 'id' | 'createdAt' | 'retryCount'>): Promise<string> {
  const id = `change-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const pendingChange: PendingChange = {
    ...change,
    id,
    createdAt: new Date().toISOString(),
    retryCount: 0,
  }

  try {
    await set(id, pendingChange, pendingChangesStore)
    console.log('[OFFLINE] Added pending change:', change.type, change.documentId)

    // Request background sync if available
    if ('serviceWorker' in navigator && 'sync' in (await navigator.serviceWorker.ready)) {
      const registration = await navigator.serviceWorker.ready
      await (registration as any).sync.register('sync-pending-changes')
    }

    return id
  } catch (error) {
    console.error('[OFFLINE] Failed to add pending change:', error)
    throw error
  }
}

export async function getPendingChanges(): Promise<PendingChange[]> {
  try {
    const allKeys = await keys(pendingChangesStore)
    const changes: PendingChange[] = []

    for (const key of allKeys) {
      const change = await get(key, pendingChangesStore)
      if (change) changes.push(change)
    }

    return changes.sort((a, b) =>
      new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    )
  } catch (error) {
    console.error('[OFFLINE] Failed to get pending changes:', error)
    return []
  }
}

export async function removePendingChange(id: string): Promise<void> {
  try {
    await del(id, pendingChangesStore)
    console.log('[OFFLINE] Removed pending change:', id)
  } catch (error) {
    console.error('[OFFLINE] Failed to remove pending change:', error)
  }
}

// ===================
// Settings
// ===================

export interface OfflineSettings {
  autoCache: boolean // Auto-cache recently viewed documents
  maxCacheSize: number // Max cache size in bytes
  notificationsEnabled: boolean
  pushSubscription?: PushSubscriptionJSON
}

const DEFAULT_SETTINGS: OfflineSettings = {
  autoCache: true,
  maxCacheSize: 500 * 1024 * 1024, // 500MB default
  notificationsEnabled: false,
}

export async function getOfflineSettings(): Promise<OfflineSettings> {
  try {
    const settings = await get<OfflineSettings>('settings', settingsStore)
    return settings || DEFAULT_SETTINGS
  } catch (error) {
    console.error('[OFFLINE] Failed to get settings:', error)
    return DEFAULT_SETTINGS
  }
}

export async function updateOfflineSettings(updates: Partial<OfflineSettings>): Promise<void> {
  try {
    const current = await getOfflineSettings()
    const updated = { ...current, ...updates }
    await set('settings', updated, settingsStore)
    console.log('[OFFLINE] Updated settings:', updates)
  } catch (error) {
    console.error('[OFFLINE] Failed to update settings:', error)
    throw error
  }
}

// ===================
// Metadata Cache
// ===================

export interface CachedMetadata {
  documents?: any[]
  folders?: any[]
  expirations?: any[]
  cachedAt: string
}

export async function cacheMetadata(key: string, data: any): Promise<void> {
  try {
    await set(key, { data, cachedAt: new Date().toISOString() }, metadataStore)
  } catch (error) {
    console.error('[OFFLINE] Failed to cache metadata:', error)
  }
}

export async function getCachedMetadata(key: string): Promise<{ data: any; cachedAt: string } | undefined> {
  try {
    return await get(key, metadataStore)
  } catch (error) {
    console.error('[OFFLINE] Failed to get cached metadata:', error)
    return undefined
  }
}

export async function clearMetadataCache(): Promise<void> {
  try {
    const allKeys = await keys(metadataStore)
    for (const key of allKeys) {
      await del(key, metadataStore)
    }
  } catch (error) {
    console.error('[OFFLINE] Failed to clear metadata cache:', error)
  }
}

// ===================
// Sync Status
// ===================

export interface SyncStatus {
  lastSync: string | null
  pendingUploads: number
  pendingChanges: number
  isOnline: boolean
}

export async function getSyncStatus(): Promise<SyncStatus> {
  const pendingUploads = await getPendingUploads()
  const pendingChanges = await getPendingChanges()
  const lastSyncData = await get<string>('lastSync', settingsStore)

  return {
    lastSync: lastSyncData || null,
    pendingUploads: pendingUploads.length,
    pendingChanges: pendingChanges.length,
    isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  }
}

export async function updateLastSync(): Promise<void> {
  await set('lastSync', new Date().toISOString(), settingsStore)
}

// ===================
// Service Worker Communication
// ===================

export function notifyServiceWorker(message: { type: string; [key: string]: any }): void {
  if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(message)
  }
}

export function cacheDocumentInSW(documentUrl: string, documentId: string): void {
  notifyServiceWorker({
    type: 'CACHE_DOCUMENT',
    url: documentUrl,
    documentId,
  })
}

export function clearDocumentFromSW(documentId: string): void {
  notifyServiceWorker({
    type: 'CLEAR_DOCUMENT_CACHE',
    documentId,
  })
}
