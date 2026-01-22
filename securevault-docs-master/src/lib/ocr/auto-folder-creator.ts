// Auto-Folder Creator - PostgreSQL ONLY

import type { TargetFolder, VaultContext } from '@/types/ocr';

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  personalVaultId: string | null;
  organizationId: string | null;
  createdAt: string;
}

interface CreateFolderOptions {
  vaultContext: VaultContext;
  personalVaultId?: string;
  organizationId?: string;
}

export interface SmartMatchResult {
  matched: boolean;
  matchType: 'exact' | 'fuzzy' | 'alias' | 'category' | 'none';
  folderId?: string;
  folderPath?: string;
  confidence: number;
  createPath?: string[];
}

export interface FolderMatchInfo {
  id: string;
  name: string;
  path: string;
  parentId: string | null;
}

const FOLDER_ALIASES: Record<string, string[]> = {
  'Driver Licenses': ['Driver License', 'Drivers License', "Driver's License", 'DL'],
  'Passports': ['Passport'],
  'ID Cards': ['ID Card', 'Identification Cards'],
  'Bank Statements': ['Bank Statement', 'Account Statements'],
  'Tax Documents': ['Tax Document', 'Taxes', 'Tax Returns'],
  'Medical Records': ['Medical Record', 'Health Records'],
  'Contracts': ['Contract', 'Agreements'],
  'Receipts': ['Receipt'],
};

export class AutoFolderCreator {
  async getOrCreateFolderPath(pathSegments: string[], options: CreateFolderOptions): Promise<TargetFolder> {
    if (pathSegments.length === 0) throw new Error('Folder path cannot be empty');

    const { vaultContext, personalVaultId, organizationId } = options;
    const existingFolders = await this.fetchAllFolders(vaultContext, personalVaultId, organizationId);
    const foldersByPath = this.buildFolderPathMap(existingFolders);

    let currentParentId: string | null = null;
    let createdAny = false;

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const currentPath = pathSegments.slice(0, i + 1).join('/');
      const existingFolder = foldersByPath.get(currentPath);

      if (existingFolder) {
        currentParentId = existingFolder.id;
      } else {
        const newFolder = await this.createFolder(segment, currentParentId, vaultContext, personalVaultId, organizationId);
        currentParentId = newFolder.id;
        createdAny = true;
        foldersByPath.set(currentPath, newFolder);
      }
    }

    const finalPath = pathSegments.join('/');
    const finalFolder = foldersByPath.get(finalPath)!;

    return { id: finalFolder.id, name: finalFolder.name, path: finalPath, pathSegments, created: createdAny };
  }

  private async fetchAllFolders(vaultContext: VaultContext, personalVaultId?: string, organizationId?: string): Promise<Folder[]> {
    const { query } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');

    let sql = `SELECT * FROM ${getTableName('Folder')} WHERE `;
    const params: any[] = [];

    if (vaultContext === 'personal') {
      sql += `"personalVaultId" = $1`;
      params.push(personalVaultId);
    } else {
      sql += `"organizationId" = $1`;
      params.push(organizationId);
    }

    const folders = await query(sql, params);
    return folders || [];
  }

  private buildFolderPathMap(folders: Folder[]): Map<string, Folder> {
    const map = new Map<string, Folder>();
    const folderById = new Map<string, Folder>();
    for (const folder of folders) folderById.set(folder.id, folder);
    for (const folder of folders) {
      const path = this.buildFolderFullPath(folder, folderById);
      map.set(path, folder);
    }
    return map;
  }

  private buildFolderFullPath(folder: Folder, folderById: Map<string, Folder>): string {
    const pathParts: string[] = [folder.name];
    let current = folder;
    while (current.parentId) {
      const parent = folderById.get(current.parentId);
      if (!parent) break;
      pathParts.unshift(parent.name);
      current = parent;
    }
    return pathParts.join('/');
  }

  private async createFolder(name: string, parentId: string | null, vaultContext: VaultContext, personalVaultId?: string, organizationId?: string): Promise<Folder> {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');
    const { randomUUID } = await import('crypto');

    // Generate UUID in code since the Folder table doesn't have a default
    const folderId = randomUUID();
    const folder = await queryOne(
      `INSERT INTO ${getTableName('Folder')} (id, name, "parentId", "personalVaultId", "organizationId", "createdAt", "updatedAt") VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
      [folderId, name, parentId, vaultContext === 'personal' ? personalVaultId : null, vaultContext === 'organization' ? organizationId : null]
    );

    if (!folder) throw new Error(`Failed to create folder "${name}"`);
    return folder;
  }

  async folderPathExists(pathSegments: string[], options: CreateFolderOptions): Promise<{ exists: boolean; folderId?: string }> {
    const existingFolders = await this.fetchAllFolders(options.vaultContext, options.personalVaultId, options.organizationId);
    const foldersByPath = this.buildFolderPathMap(existingFolders);
    const folder = foldersByPath.get(pathSegments.join('/'));
    return { exists: !!folder, folderId: folder?.id };
  }

  async getFolderById(folderId: string): Promise<Folder | null> {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');
    const folder = await queryOne(`SELECT * FROM ${getTableName('Folder')} WHERE id = $1`, [folderId]);
    return folder || null;
  }

  async getFolderPath(folderId: string): Promise<string[]> {
    const folders = await this.fetchFolderAncestors(folderId);
    return folders.map(f => f.name);
  }

  private async fetchFolderAncestors(folderId: string): Promise<Folder[]> {
    const { queryOne } = await import('@/lib/db');
    const { getTableName } = await import('@/lib/db-utils');
    const ancestors: Folder[] = [];
    let currentId: string | null = folderId;

    while (currentId) {
      const folder = await queryOne(`SELECT * FROM ${getTableName('Folder')} WHERE id = $1`, [currentId]);
      if (!folder) break;
      ancestors.unshift(folder);
      currentId = folder.parentId;
    }
    return ancestors;
  }

  async findBestMatchingFolder(suggestedPath: string[], options: CreateFolderOptions): Promise<SmartMatchResult> {
    const existingFolders = await this.fetchAllFolders(options.vaultContext, options.personalVaultId, options.organizationId);
    if (existingFolders.length === 0) {
      return { matched: false, matchType: 'none', confidence: 0, createPath: suggestedPath };
    }

    const folderInfos = this.buildFolderInfoList(existingFolders);
    const exactMatch = this.findExactPathMatch(suggestedPath, folderInfos);
    if (exactMatch) {
      return { matched: true, matchType: 'exact', folderId: exactMatch.id, folderPath: exactMatch.path, confidence: 1.0 };
    }

    return { matched: false, matchType: 'none', confidence: 0, createPath: suggestedPath };
  }

  private buildFolderInfoList(folders: Folder[]): FolderMatchInfo[] {
    const folderById = new Map<string, Folder>();
    for (const folder of folders) folderById.set(folder.id, folder);
    return folders.map(folder => ({
      id: folder.id, name: folder.name, path: this.buildFolderFullPath(folder, folderById), parentId: folder.parentId,
    }));
  }

  private findExactPathMatch(suggestedPath: string[], folders: FolderMatchInfo[]): FolderMatchInfo | null {
    const targetPath = suggestedPath.join('/').toLowerCase();
    return folders.find(f => f.path.toLowerCase() === targetPath) || null;
  }

  async smartGetOrCreateFolder(suggestedPath: string[], options: CreateFolderOptions): Promise<{ folder: TargetFolder; matchResult: SmartMatchResult }> {
    const matchResult = await this.findBestMatchingFolder(suggestedPath, options);

    if (matchResult.matched && matchResult.folderId) {
      const folder = await this.getFolderById(matchResult.folderId);
      if (folder) {
        return {
          folder: { id: folder.id, name: folder.name, path: matchResult.folderPath || folder.name, pathSegments: matchResult.folderPath?.split('/') || [folder.name], created: false },
          matchResult,
        };
      }
    }

    const folder = await this.getOrCreateFolderPath(matchResult.createPath || suggestedPath, options);
    return { folder, matchResult: { ...matchResult, matched: false, matchType: 'none' } };
  }
}

export const autoFolderCreator = new AutoFolderCreator();

export async function getOrCreateFolderPath(pathSegments: string[], options: CreateFolderOptions): Promise<TargetFolder> {
  return autoFolderCreator.getOrCreateFolderPath(pathSegments, options);
}

export async function folderPathExists(pathSegments: string[], options: CreateFolderOptions): Promise<{ exists: boolean; folderId?: string }> {
  return autoFolderCreator.folderPathExists(pathSegments, options);
}

export async function getFolderPath(folderId: string): Promise<string[]> {
  return autoFolderCreator.getFolderPath(folderId);
}

export async function findBestMatchingFolder(suggestedPath: string[], options: CreateFolderOptions): Promise<SmartMatchResult> {
  return autoFolderCreator.findBestMatchingFolder(suggestedPath, options);
}

export async function smartGetOrCreateFolder(suggestedPath: string[], options: CreateFolderOptions): Promise<{ folder: TargetFolder; matchResult: SmartMatchResult }> {
  return autoFolderCreator.smartGetOrCreateFolder(suggestedPath, options);
}

export { FOLDER_ALIASES };
