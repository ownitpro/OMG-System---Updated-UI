// Mock storage utility - will be replaced with S3 later
// For now, stores files as base64 in memory (will lose on refresh)
// This allows us to build the full UI without S3

interface StoredFile {
  key: string
  data: string // base64 encoded
  contentType: string
  size: number
  uploadedAt: string
}

interface MockDocument {
  id: string
  name: string
  mimeType: string
  size: number
  storageKey: string
  personalVaultId?: string
  organizationId?: string
  folderId?: string | null
  uploadedById: string
  uploadStatus: string
  createdAt: string
  updatedAt: string
  tags?: string[]
  expiresAt?: string | null
}

// Use global storage to persist across hot reloads in development
declare global {
  var __mockStorage: Map<string, StoredFile> | undefined
  var __mockDocuments: Map<string, MockDocument> | undefined
}

class MockStorage {
  private storage: Map<string, StoredFile>
  private documents: Map<string, MockDocument>

  constructor() {
    // Use globalThis Maps to survive module reloads (works in both Node.js and Edge runtime)
    if (!globalThis.__mockStorage) {
      globalThis.__mockStorage = new Map()
    }
    if (!globalThis.__mockDocuments) {
      globalThis.__mockDocuments = new Map()
    }
    this.storage = globalThis.__mockStorage
    this.documents = globalThis.__mockDocuments
  }

  async uploadFile(
    file: File,
    path: string
  ): Promise<{ key: string; url: string }> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const base64 = reader.result as string
        const key = `${path}/${Date.now()}-${file.name}`

        this.storage.set(key, {
          key,
          data: base64,
          contentType: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
        })

        // Mock URL - in production this will be S3 URL
        const url = `mock://${key}`
        resolve({ key, url })
      }

      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }

      reader.readAsDataURL(file)
    })
  }

  async getFile(key: string): Promise<StoredFile | null> {
    return this.storage.get(key) || null
  }

  async deleteFile(key: string): Promise<boolean> {
    return this.storage.delete(key)
  }

  async getFileUrl(key: string): Promise<string | null> {
    const file = this.storage.get(key)
    if (!file) return null

    // Return the base64 data URL for preview
    return file.data
  }

  // Helper to get file size
  getFileSize(key: string): number | null {
    const file = this.storage.get(key)
    return file ? file.size : null
  }

  // Helper to clear all storage (useful for testing)
  clear(): void {
    this.storage.clear()
  }

  // Document CRUD operations for mock mode
  async createDocument(doc: Omit<MockDocument, 'id' | 'createdAt' | 'updatedAt'>): Promise<MockDocument> {
    const id = `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const now = new Date().toISOString()
    const document: MockDocument = {
      ...doc,
      id,
      createdAt: now,
      updatedAt: now,
    }
    this.documents.set(id, document)
    console.log('[MockStorage] Created document:', document.name, 'ID:', id)
    return document
  }

  async getDocuments(filters: {
    personalVaultId?: string
    organizationId?: string
    folderId?: string | null
    rootOnly?: boolean
  }): Promise<MockDocument[]> {
    const docs = Array.from(this.documents.values())

    console.log('[MockStorage.getDocuments] Total documents in storage:', docs.length)
    console.log('[MockStorage.getDocuments] Filters:', JSON.stringify(filters))

    // Log first document to see structure
    if (docs.length > 0) {
      console.log('[MockStorage.getDocuments] Sample doc:', JSON.stringify({
        name: docs[0].name,
        personalVaultId: docs[0].personalVaultId,
        organizationId: docs[0].organizationId,
        uploadStatus: docs[0].uploadStatus,
        folderId: docs[0].folderId
      }))
    }

    const filtered = docs.filter(doc => {
      // Filter by vault/org
      if (filters.personalVaultId && doc.personalVaultId !== filters.personalVaultId) {
        console.log('[MockStorage.getDocuments] Rejecting doc (personalVaultId mismatch):', doc.name, 'filter:', filters.personalVaultId, 'doc:', doc.personalVaultId)
        return false
      }
      if (filters.organizationId && doc.organizationId !== filters.organizationId) {
        console.log('[MockStorage.getDocuments] Rejecting doc (organizationId mismatch):', doc.name, 'filter:', filters.organizationId, 'doc:', doc.organizationId)
        return false
      }

      // Filter by folder
      if (filters.folderId !== undefined) {
        if (doc.folderId !== filters.folderId) {
          console.log('[MockStorage.getDocuments] Rejecting doc (folderId mismatch):', doc.name, 'filter:', filters.folderId, 'doc:', doc.folderId)
          return false
        }
      }
      if (filters.rootOnly && doc.folderId !== null) {
        console.log('[MockStorage.getDocuments] Rejecting doc (rootOnly):', doc.name, 'folderId:', doc.folderId)
        return false
      }

      // Only confirmed documents
      if (doc.uploadStatus !== 'confirmed') {
        console.log('[MockStorage.getDocuments] Rejecting doc (not confirmed):', doc.name, 'status:', doc.uploadStatus)
        return false
      }

      console.log('[MockStorage.getDocuments] ✓ Accepting doc:', doc.name)
      return true
    }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    console.log('[MockStorage.getDocuments] Returning', filtered.length, 'documents')
    return filtered
  }

  async getDocument(id: string): Promise<MockDocument | null> {
    return this.documents.get(id) || null
  }

  async deleteDocument(id: string): Promise<boolean> {
    const doc = this.documents.get(id)
    if (doc) {
      // Also delete the file from storage
      this.storage.delete(doc.storageKey)
      return this.documents.delete(id)
    }
    return false
  }

  async updateDocument(id: string, updates: Partial<MockDocument>): Promise<MockDocument | null> {
    const doc = this.documents.get(id)
    if (!doc) return null

    const updated = {
      ...doc,
      ...updates,
      updatedAt: new Date().toISOString()
    }
    this.documents.set(id, updated)
    return updated
  }

  // Get storage stats
  getStorageStats(userId: string): { used: number; total: number } {
    const userDocs = Array.from(this.documents.values()).filter(
      doc => doc.uploadedById === userId
    )
    const used = userDocs.reduce((sum, doc) => sum + doc.size, 0)
    return { used, total: 5 * 1024 * 1024 * 1024 } // 5GB limit for mock
  }
}

// Singleton instance
export const mockStorage = new MockStorage()

// Define init function first
function autoInitMockStorage() {
  const DEMO_USER_ID = '70a44906-2efe-4481-b3f7-d2765391c525'
  const DEMO_ORG_ID = '27bf5a34-833b-496b-b81f-f6adba91dc30' // Fixed: matches actual org ID

  console.log('[MockStorage] Auto-initializing with sample documents for org:', DEMO_ORG_ID)
  initializeMockDocuments(DEMO_USER_ID, undefined, DEMO_ORG_ID)
}

// Auto-initialize with sample data if in mock mode (server-side only)
if (typeof window === 'undefined' && process.env.NEXT_PUBLIC_USE_MOCK_STORAGE === 'true') {
  // Check if we need to reinitialize (wrong org ID or empty)
  const DEMO_ORG_ID = '27bf5a34-833b-496b-b81f-f6adba91dc30'
  let needsReinit = false

  if (!globalThis.__mockDocuments || globalThis.__mockDocuments.size === 0) {
    needsReinit = true
    console.log('[MockStorage] Module loaded - no documents, will initialize')
  } else {
    // Check if existing documents have the wrong org ID
    const firstDoc = Array.from(globalThis.__mockDocuments.values())[0]
    if (firstDoc && firstDoc.organizationId && firstDoc.organizationId !== DEMO_ORG_ID) {
      console.log('[MockStorage] Module loaded - wrong org ID, clearing and reinitializing')
      console.log('[MockStorage] Old org ID:', firstDoc.organizationId)
      console.log('[MockStorage] New org ID:', DEMO_ORG_ID)
      globalThis.__mockDocuments.clear()
      globalThis.__mockStorage?.clear()
      needsReinit = true
    } else {
      console.log('[MockStorage] Module loaded - already has', globalThis.__mockDocuments.size, 'documents with correct org ID')
    }
  }

  if (needsReinit) {
    autoInitMockStorage()
  }
}

// Initialize mock storage with sample documents for design testing
export function initializeMockDocuments(userId: string, personalVaultId?: string, organizationId?: string) {
  console.log('[MockStorage] Initializing sample documents for design testing')

  // Sample file data (1x1 transparent PNG as base64)
  const sampleImageData = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
  const samplePdfData = 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKNCAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDQ4Pj5zdHJlYW0KeJwr5HIK4TI2UzA0VLA0MFEwNDRVMDWztFQwMjBWMDYwUjAzAACHXAfYCmVuZHN0cmVhbQplbmRvYmoKMSAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDMgMCBSL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjMgMCBvYmoKPDwvVHlwZS9QYWdlcy9LaWRzWzEgMCBSXS9Db3VudCAxPj4KZW5kb2JqCjUgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDMgMCBSPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDE0MiAwMDAwMCBuIAowMDAwMDAwMDAwIDAwMDAwIG4gCjAwMDAwMDAxOTMgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMjQ0IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2L1Jvb3QgNSAwIFI+PgpzdGFydHhyZWYKMjkzCiUlRU9G'

  const now = new Date()
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  const lastWeek = new Date(now)
  lastWeek.setDate(lastWeek.getDate() - 7)
  const lastMonth = new Date(now)
  lastMonth.setMonth(lastMonth.getMonth() - 1)

  // Sample documents with various types
  const sampleDocs = [
    {
      name: 'Company Logo.png',
      mimeType: 'image/png',
      size: 245680,
      data: sampleImageData,
      createdAt: now.toISOString(),
    },
    {
      name: 'Invoice-2024-001.pdf',
      mimeType: 'application/pdf',
      size: 1024567,
      data: samplePdfData,
      createdAt: yesterday.toISOString(),
    },
    {
      name: 'Contract_Template.docx',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      size: 456789,
      data: sampleImageData, // Using image as placeholder
      createdAt: lastWeek.toISOString(),
    },
    {
      name: 'Financial_Report_Q4.xlsx',
      mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      size: 789012,
      data: sampleImageData,
      createdAt: lastWeek.toISOString(),
    },
    {
      name: 'Presentation_Slides.pptx',
      mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      size: 2345678,
      data: sampleImageData,
      createdAt: lastMonth.toISOString(),
    },
    {
      name: 'Product_Photo_1.jpg',
      mimeType: 'image/jpeg',
      size: 567890,
      data: sampleImageData,
      createdAt: lastMonth.toISOString(),
    },
    {
      name: 'Meeting_Notes.txt',
      mimeType: 'text/plain',
      size: 12345,
      data: 'data:text/plain;base64,VGhpcyBpcyBhIHNhbXBsZSB0ZXh0IGZpbGU=',
      createdAt: now.toISOString(),
    },
    {
      name: 'Tax_Documents_2024.pdf',
      mimeType: 'application/pdf',
      size: 3456789,
      data: samplePdfData,
      createdAt: yesterday.toISOString(),
    },
  ]

  // Create storage entries and document records
  sampleDocs.forEach((doc, index) => {
    const storageKey = `${personalVaultId ? `personal/${userId}` : `org/${organizationId}`}/${Date.now() + index}-${doc.name}`

    // Store file data
    mockStorage['storage'].set(storageKey, {
      key: storageKey,
      data: doc.data,
      contentType: doc.mimeType,
      size: doc.size,
      uploadedAt: doc.createdAt,
    })

    // Create document record with 'confirmed' status so it shows up
    const docId = `doc_sample_${Date.now() + index}_${Math.random().toString(36).substr(2, 9)}`
    mockStorage['documents'].set(docId, {
      id: docId,
      name: doc.name,
      mimeType: doc.mimeType,
      size: doc.size,
      storageKey,
      personalVaultId,
      organizationId,
      folderId: null,
      uploadedById: userId,
      uploadStatus: 'confirmed', // Important: set to confirmed so it shows in the list
      createdAt: doc.createdAt,
      updatedAt: doc.createdAt,
      tags: [],
      expiresAt: null,
    })

    console.log(`[MockStorage] Created sample document: ${doc.name}`)
  })

  console.log(`[MockStorage] Initialized ${sampleDocs.length} sample documents`)
}

// Helper function to format file size
// Note: PostgreSQL returns BIGINT as string, so we handle both number and string inputs
export function formatFileSize(bytes: number | string): string {
  const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes
  if (!numBytes || numBytes === 0 || isNaN(numBytes)) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.min(Math.floor(Math.log(numBytes) / Math.log(k)), sizes.length - 1)

  return Math.round((numBytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

// Helper to get file icon based on type
export function getFileIcon(mimeType: string): string {
  if (mimeType.startsWith('image/')) return '🖼️'
  if (mimeType.startsWith('video/')) return '🎥'
  if (mimeType.startsWith('audio/')) return '🎵'
  if (mimeType.includes('pdf')) return '📄'
  if (mimeType.includes('word') || mimeType.includes('document')) return '📝'
  if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊'
  if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📽️'
  if (mimeType.includes('zip') || mimeType.includes('compressed')) return '🗜️'
  if (mimeType.includes('text/')) return '📃'
  return '📎'
}

// Helper to get file extension
export function getFileExtension(filename: string): string {
  const parts = filename.split('.')
  return parts.length > 1 ? parts[parts.length - 1].toUpperCase() : 'FILE'
}

// MIME type mapping for common file types
// Browsers don't always provide MIME types for all files, so we fallback to extension-based detection
const MIME_TYPE_MAP: Record<string, string> = {
  // Images
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'png': 'image/png',
  'gif': 'image/gif',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  'bmp': 'image/bmp',
  'ico': 'image/x-icon',
  'tiff': 'image/tiff',
  'tif': 'image/tiff',
  'heic': 'image/heic',
  'heif': 'image/heif',
  'avif': 'image/avif',

  // Videos
  'mp4': 'video/mp4',
  'webm': 'video/webm',
  'ogg': 'video/ogg',
  'ogv': 'video/ogg',
  'mov': 'video/quicktime',
  'avi': 'video/x-msvideo',
  'wmv': 'video/x-ms-wmv',
  'mkv': 'video/x-matroska',
  'flv': 'video/x-flv',
  'm4v': 'video/x-m4v',
  '3gp': 'video/3gpp',
  '3g2': 'video/3gpp2',

  // Audio
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'ogg': 'audio/ogg',
  'oga': 'audio/ogg',
  'aac': 'audio/aac',
  'm4a': 'audio/mp4',
  'flac': 'audio/flac',
  'wma': 'audio/x-ms-wma',
  'opus': 'audio/opus',

  // Documents
  'pdf': 'application/pdf',
  'doc': 'application/msword',
  'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'xls': 'application/vnd.ms-excel',
  'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'ppt': 'application/vnd.ms-powerpoint',
  'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'odt': 'application/vnd.oasis.opendocument.text',
  'ods': 'application/vnd.oasis.opendocument.spreadsheet',
  'odp': 'application/vnd.oasis.opendocument.presentation',
  'rtf': 'application/rtf',

  // Text files
  'txt': 'text/plain',
  'csv': 'text/csv',
  'md': 'text/markdown',
  'html': 'text/html',
  'htm': 'text/html',
  'css': 'text/css',
  'js': 'text/javascript',
  'ts': 'text/typescript',
  'tsx': 'text/typescript-jsx',
  'jsx': 'text/jsx',
  'json': 'application/json',
  'xml': 'application/xml',
  'yaml': 'text/yaml',
  'yml': 'text/yaml',
  'log': 'text/plain',

  // Archives
  'zip': 'application/zip',
  'rar': 'application/vnd.rar',
  '7z': 'application/x-7z-compressed',
  'tar': 'application/x-tar',
  'gz': 'application/gzip',
  'bz2': 'application/x-bzip2',

  // Other
  'exe': 'application/x-msdownload',
  'dmg': 'application/x-apple-diskimage',
  'iso': 'application/x-iso9660-image',
  'apk': 'application/vnd.android.package-archive',
  'ipa': 'application/octet-stream',
}

// Get MIME type from file extension
export function getMimeTypeFromExtension(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() || ''
  return MIME_TYPE_MAP[ext] || 'application/octet-stream'
}

// Get MIME type for a file, with fallback to extension-based detection
export function getFileMimeType(file: File): string {
  // Use browser-provided type if available and not empty
  if (file.type && file.type.length > 0) {
    return file.type
  }
  // Fallback to extension-based detection
  return getMimeTypeFromExtension(file.name)
}
