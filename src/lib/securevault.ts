// SecureVault Docs Integration
// This module handles integration with SecureVault Docs for file storage and management

export interface SecureVaultFile {
  id: string
  name: string
  originalName: string
  mimeType: string
  size: number
  url?: string
  expiresAt?: Date
  createdAt: Date
  updatedAt: Date
}

export interface SecureVaultUploadResponse {
  fileId: string
  url: string
  expiresAt: Date
}

export interface SecureVaultConfig {
  apiKey: string
  baseUrl: string
  organizationId: string
}

class SecureVaultClient {
  private config: SecureVaultConfig

  constructor(config: SecureVaultConfig) {
    this.config = config
  }

  /**
   * Upload a file to SecureVault Docs
   */
  async uploadFile(
    file: File,
    metadata?: {
      description?: string
      tags?: string[]
      isPublic?: boolean
    }
  ): Promise<SecureVaultUploadResponse> {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('organizationId', this.config.organizationId)
    
    if (metadata) {
      if (metadata.description) {
        formData.append('description', metadata.description)
      }
      if (metadata.tags) {
        formData.append('tags', JSON.stringify(metadata.tags))
      }
      if (metadata.isPublic !== undefined) {
        formData.append('isPublic', metadata.isPublic.toString())
      }
    }

    const response = await fetch(`${this.config.baseUrl}/api/v1/files/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`Failed to upload file: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Get a signed URL for file access
   */
  async getSignedUrl(fileId: string, expiresInHours: number = 24): Promise<string> {
    const response = await fetch(`${this.config.baseUrl}/api/v1/files/${fileId}/signed-url`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        expiresInHours,
        organizationId: this.config.organizationId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to get signed URL: ${response.statusText}`)
    }

    const data = await response.json()
    return data.url
  }

  /**
   * List files for an organization
   */
  async listFiles(options?: {
    limit?: number
    offset?: number
    tags?: string[]
    isPublic?: boolean
  }): Promise<{ files: SecureVaultFile[]; total: number }> {
    const params = new URLSearchParams()
    
    if (options?.limit) params.append('limit', options.limit.toString())
    if (options?.offset) params.append('offset', options.offset.toString())
    if (options?.tags) params.append('tags', options.tags.join(','))
    if (options?.isPublic !== undefined) params.append('isPublic', options.isPublic.toString())
    
    params.append('organizationId', this.config.organizationId)

    const response = await fetch(`${this.config.baseUrl}/api/v1/files?${params}`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to list files: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Delete a file from SecureVault Docs
   */
  async deleteFile(fileId: string): Promise<void> {
    const response = await fetch(`${this.config.baseUrl}/api/v1/files/${fileId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        organizationId: this.config.organizationId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to delete file: ${response.statusText}`)
    }
  }

  /**
   * Get file metadata
   */
  async getFileMetadata(fileId: string): Promise<SecureVaultFile> {
    const response = await fetch(`${this.config.baseUrl}/api/v1/files/${fileId}`, {
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to get file metadata: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Update file metadata
   */
  async updateFileMetadata(
    fileId: string,
    updates: {
      name?: string
      description?: string
      tags?: string[]
      isPublic?: boolean
    }
  ): Promise<SecureVaultFile> {
    const response = await fetch(`${this.config.baseUrl}/api/v1/files/${fileId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...updates,
        organizationId: this.config.organizationId,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to update file metadata: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Create a public share link
   */
  async createShareLink(
    fileId: string,
    options?: {
      expiresAt?: Date
      password?: string
      allowDownload?: boolean
      maxDownloads?: number
    }
  ): Promise<{ shareId: string; shareUrl: string; expiresAt?: Date }> {
    const response = await fetch(`${this.config.baseUrl}/api/v1/files/${fileId}/share`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        organizationId: this.config.organizationId,
        ...options,
      }),
    })

    if (!response.ok) {
      throw new Error(`Failed to create share link: ${response.statusText}`)
    }

    return await response.json()
  }

  /**
   * Revoke a share link
   */
  async revokeShareLink(shareId: string): Promise<void> {
    const response = await fetch(`${this.config.baseUrl}/api/v1/shares/${shareId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to revoke share link: ${response.statusText}`)
    }
  }
}

// Factory function to create SecureVault client
export function createSecureVaultClient(organizationId: string): SecureVaultClient {
  const config: SecureVaultConfig = {
    apiKey: process.env.SECUREVAULT_API_KEY || '',
    baseUrl: process.env.SECUREVAULT_BASE_URL || 'https://api.securevault.com',
    organizationId,
  }

  if (!config.apiKey) {
    throw new Error('SECUREVAULT_API_KEY environment variable is required')
  }

  return new SecureVaultClient(config)
}

// Utility functions for file handling
export const fileUtils = {
  /**
   * Validate file type and size
   */
  validateFile: (file: File, options?: {
    maxSize?: number // in bytes
    allowedTypes?: string[]
  }): { valid: boolean; error?: string } => {
    const maxSize = options?.maxSize || 100 * 1024 * 1024 // 100MB default
    const allowedTypes = options?.allowedTypes || [
      'application/pdf',
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain',
      'text/csv',
    ]

    if (file.size > maxSize) {
      return {
        valid: false,
        error: `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`,
      }
    }

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'File type not allowed',
      }
    }

    return { valid: true }
  },

  /**
   * Format file size for display
   */
  formatFileSize: (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  /**
   * Get file icon based on MIME type
   */
  getFileIcon: (mimeType: string): string => {
    if (mimeType.startsWith('image/')) return '🖼️'
    if (mimeType.startsWith('video/')) return '🎥'
    if (mimeType.startsWith('audio/')) return '🎵'
    if (mimeType.includes('pdf')) return '📄'
    if (mimeType.includes('word')) return '📝'
    if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) return '📊'
    if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) return '📈'
    if (mimeType.includes('zip') || mimeType.includes('archive')) return '📦'
    return '📁'
  },
}

export default SecureVaultClient
