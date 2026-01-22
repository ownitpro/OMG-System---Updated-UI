'use client';

import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { DocumentsTabs } from '@/components/documents/DocumentsTabs';
import { useOrganization } from '@/contexts/OrganizationContext';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { usePlanEnforcement } from '@/hooks/usePlanEnforcement';
import { Link2, Copy, Trash2, Plus, Clock, Shield, FileText, FolderPlus, Upload, Search, X, HardDrive, TrendingUp, Camera, CheckSquare, Square, Star, FolderInput, Tags, HelpCircle, Cpu, Download } from 'lucide-react';
import FolderTree from '@/components/folders/FolderTree';
import FolderBreadcrumb from '@/components/folders/FolderBreadcrumb';
import CreateFolderModal from '@/components/folders/CreateFolderModal';
import RenameFolderModal from '@/components/folders/RenameFolderModal';
import DocumentList from '@/components/documents/DocumentList';
import FolderSection from '@/components/documents/FolderSection';
import SearchResults from '@/components/documents/SearchResults';
import UploadDocumentModal from '@/components/documents/UploadDocumentModal';
import DocumentPreviewModal from '@/components/documents/DocumentPreviewModal';
import RenameDocumentModal from '@/components/documents/RenameDocumentModal';
import MoveDocumentModal from '@/components/documents/MoveDocumentModal';
import BulkMoveDocumentModal from '@/components/documents/BulkMoveDocumentModal';
import BulkTagModal from '@/components/documents/BulkTagModal';
import ManageTagsModal from '@/components/documents/ManageTagsModal';
import ConfirmModal from '@/components/shared/ConfirmModal';
import { useToast } from '@/components/shared/ToastContainer';
import CreateShareLinkModal from '@/components/shares/CreateShareLinkModal';
import { DocumentScanner } from '@/components/scan';
import DocumentVersionHistoryModal from '@/components/modals/DocumentVersionHistoryModal';
import UploadNewVersionModal from '@/components/modals/UploadNewVersionModal';
import MoveFolderModal from '@/components/folders/MoveFolderModal';
import { parseSearchQuery, matchesSearch } from '@/lib/search-utils';

type Tab = 'documents' | 'shares';

interface FolderData {
  id: string;
  name: string;
  parentId: string | null;
  personalVaultId: string | null;
  organizationId: string | null;
  createdAt: string;
}

interface DocumentData {
  id: string;
  name: string;
  type: string;
  sizeBytes: number | string;
  s3Key: string;
  s3Bucket: string;
  createdAt: string;
  labels: string[];
  folderId?: string | null;
  expirationDate?: string | null;
  expirationTrackingEnabled?: boolean;
  isFavorite?: boolean;
}

// Helper to validate org ID format
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DEMO_ORG_REGEX = /^org_demo(_\w+)?$/;
const isValidOrgId = (id: string | undefined): boolean => {
  if (!id) return false;
  return UUID_REGEX.test(id) || DEMO_ORG_REGEX.test(id);
};

function DocumentsView() {
  const { activeOrg, isPersonalVault, isBusinessFallbackMode } = useOrganization();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const { showToast } = useToast();

  // Validate activeOrg ID - if corrupted, treat as null
  const validatedOrgId = isValidOrgId(activeOrg?.id) ? activeOrg?.id : undefined;

  // CRITICAL: Clean up corrupted localStorage data on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let needsReload = false;

    // Clean up old "personal" string
    const STORAGE_KEY = 'selectedOrgId';
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.id === 'personal') {
          console.log('[DOCUMENTS] Removing old "personal" value from localStorage');
          localStorage.removeItem(STORAGE_KEY);
          needsReload = true;
        }
      } catch (e) {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    // Clean up corrupted org IDs from svd_active_org
    const activeOrgKey = 'svd_active_org';
    const activeOrgStored = localStorage.getItem(activeOrgKey);
    if (activeOrgStored) {
      try {
        const parsed = JSON.parse(activeOrgStored);
        if (parsed.id && !isValidOrgId(parsed.id)) {
          console.log('[DOCUMENTS] Removing corrupted org ID from localStorage:', parsed.id.slice(0, 30));
          localStorage.removeItem(activeOrgKey);
          needsReload = true;
        }
      } catch (e) {
        localStorage.removeItem(activeOrgKey);
        needsReload = true;
      }
    }

    if (needsReload) {
      window.location.reload();
    }
  }, []);

  const [folders, setFolders] = useState<FolderData[]>([]);
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [allDocuments, setAllDocuments] = useState<DocumentData[]>([]); // Store unfiltered docs
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [fileTypeFilter, setFileTypeFilter] = useState<string>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [dateRangeFilter, setDateRangeFilter] = useState<string>('all');
  const [customDateFrom, setCustomDateFrom] = useState<string>('');
  const [customDateTo, setCustomDateTo] = useState<string>('');
  const [sizeFilter, setSizeFilter] = useState<string>('all');
  const [favoritesFilter, setFavoritesFilter] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'size'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modal states
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [showRenameFolder, setShowRenameFolder] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Drag-and-drop file upload state
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<File[]>([]);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showRenameDocument, setShowRenameDocument] = useState(false);
  const [showMoveDocument, setShowMoveDocument] = useState(false);
  const [showManageTags, setShowManageTags] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);
  const [showMobileFolders, setShowMobileFolders] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ type: 'folder' | 'document' | 'bulk', item: any } | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<{ id: string; name: string } | null>(null);
  const [selectedDocument, setSelectedDocument] = useState<DocumentData | null>(null);

  // Selection mode state
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);

  // Version history modal state
  const [versionHistoryDocument, setVersionHistoryDocument] = useState<DocumentData | null>(null);
  const [uploadVersionDocument, setUploadVersionDocument] = useState<DocumentData | null>(null);

  // Move folder modal state
  const [moveFolderTarget, setMoveFolderTarget] = useState<FolderData | null>(null);

  // Bulk move modal state
  const [showBulkMoveModal, setShowBulkMoveModal] = useState(false);

  // Bulk tag modal state
  const [showBulkTagModal, setShowBulkTagModal] = useState(false);

  // Search mode state (for recursive search across all folders)
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [allVaultDocuments, setAllVaultDocuments] = useState<DocumentData[]>([]); // All docs in vault for search
  const [childFolders, setChildFolders] = useState<FolderData[]>([]); // Child folders of current folder
  const [searchResults, setSearchResults] = useState<{
    documents: DocumentData[];
    folders: FolderData[];
    groupedByFolder: Map<string, { path: string; documents: DocumentData[] }>;
  } | null>(null);
  const [expandedSearchFolders, setExpandedSearchFolders] = useState<Set<string>>(new Set());

  // Global usage state for widgets (account-wide metrics)
  const [globalUsage, setGlobalUsage] = useState<{
    totalDocuments: number;
    storageUsed: number;
    storageLimit: number;
    storagePercentage: number;
    puUsed: number;
    puLimit: number;
    puPercentage: number;
    billingCycleEnd: string | null;
  } | null>(null);

  // Track if initial data has been loaded to prevent re-fetching on tab visibility change
  const hasLoadedRef = React.useRef(false);
  const lastOrgIdRef = React.useRef<string | null>(null);
  const lastFolderIdRef = React.useRef<string | null>(null);

  // Note: OrganizationContext handles clearing old "personal" localStorage value

  // Load folders and documents - only when org/folder actually changes
  useEffect(() => {
    // Skip if this is just a tab visibility change (same org and folder)
    const orgChanged = validatedOrgId !== lastOrgIdRef.current;
    const folderChanged = currentFolderId !== lastFolderIdRef.current;

    if (!orgChanged && !folderChanged && hasLoadedRef.current) {
      console.log('[DOCUMENTS] Skipping reload - no actual change (tab visibility?)');
      return;
    }

    console.log('[DOCUMENTS] activeOrg changed:', activeOrg);
    console.log('[DOCUMENTS] isPersonalVault:', isPersonalVault);
    console.log('[DOCUMENTS] validatedOrgId:', validatedOrgId);
    if (validatedOrgId) {
      console.log('[DOCUMENTS] Loading data with validatedOrgId:', validatedOrgId);
      lastOrgIdRef.current = validatedOrgId;
      lastFolderIdRef.current = currentFolderId;
      loadData();
      hasLoadedRef.current = true;
    } else {
      console.log('[DOCUMENTS] activeOrg is null, stopping loading state');
      setLoading(false);
      // Clear data when no org is selected
      setFolders([]);
      setDocuments([]);
      hasLoadedRef.current = false;
      lastOrgIdRef.current = null;
    }
  }, [activeOrg, currentFolderId]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Build query params based on vault type - use validated ID to prevent corrupted IDs
      const vaultParam = isPersonalVault
        ? `personalVaultId=${validatedOrgId}`
        : `organizationId=${validatedOrgId}`;

      // Load all folders for tree building
      const foldersRes = await fetch(`/api/folders?${vaultParam}&includeAll=true`);
      const foldersData = await foldersRes.json();
      const loadedFolders = foldersData.folders || [];
      setFolders(loadedFolders);

      // Compute child folders of current folder (for inline folder display)
      const children = loadedFolders.filter(
        (f: FolderData) => f.parentId === currentFolderId
      );
      setChildFolders(children);

      // Load ALL documents in vault (for search functionality)
      const allDocsRes = await fetch(`/api/documents?${vaultParam}&recursive=true`);
      const allDocsData = await allDocsRes.json();
      setAllVaultDocuments(allDocsData.documents || []);

      // Filter to current folder for display (when not searching)
      const currentFolderDocs = (allDocsData.documents || []).filter(
        (doc: DocumentData) => currentFolderId
          ? doc.folderId === currentFolderId
          : doc.folderId === null
      );

      // Log document IDs for debugging
      console.log('[loadData] Total vault documents:', allDocsData.documents?.length);
      console.log('[loadData] Current folder documents:', currentFolderDocs.length);

      setAllDocuments(currentFolderDocs); // Store current folder's documents
      setDocuments(currentFolderDocs); // Initial display

      // Fetch usage metrics for widgets
      // Total Documents comes from per-org/vault data
      // Storage and PU come from account-wide endpoint (doesn't change when switching orgs)
      try {
        // For Storage and PU - use account-wide endpoint that aggregates across all orgs
        const accountUsageEndpoint = '/api/user/account-usage';
        console.log('[loadData] Fetching account-wide usage from:', accountUsageEndpoint);

        const accountUsageRes = await fetch(accountUsageEndpoint);
        if (accountUsageRes.ok) {
          const accountUsageData = await accountUsageRes.json();
          console.log('[loadData] Account-wide usage received:', {
            storage: accountUsageData.storage,
            processing: accountUsageData.processing,
          });
          setGlobalUsage({
            // Total documents is per-vault (current org's documents)
            totalDocuments: allDocsData.documents?.length || 0,
            // Storage and PU are account-wide (aggregated across all orgs)
            storageUsed: accountUsageData.storage?.used || 0,
            storageLimit: accountUsageData.storage?.limit || 0,
            storagePercentage: accountUsageData.storage?.percentage || 0,
            puUsed: accountUsageData.processing?.used || 0,
            puLimit: accountUsageData.processing?.limit || 0,
            puPercentage: accountUsageData.processing?.percentage || 0,
            billingCycleEnd: accountUsageData.billingCycleEnd || null,
          });
        } else {
          console.error('[loadData] Account usage fetch failed:', accountUsageRes.status);
        }
      } catch (usageError) {
        console.error('Error fetching usage data:', usageError);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort documents
  useEffect(() => {
    let filtered = [...allDocuments];

    // Apply search filter (supports +/- operators)
    if (searchQuery) {
      const parsed = parseSearchQuery(searchQuery);
      filtered = filtered.filter(doc => matchesSearch(doc.name, doc.labels, parsed));
    }

    // Apply file type filter
    if (fileTypeFilter !== 'all') {
      filtered = filtered.filter(doc => doc.type === fileTypeFilter);
    }

    // Apply tag filter
    if (tagFilter !== 'all') {
      filtered = filtered.filter(doc => doc.labels?.includes(tagFilter));
    }

    // Apply date range filter
    if (dateRangeFilter !== 'all') {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      filtered = filtered.filter(doc => {
        const docDate = new Date(doc.createdAt);

        switch (dateRangeFilter) {
          case 'today':
            return docDate >= today;
          case 'week':
            const weekAgo = new Date(today);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return docDate >= weekAgo;
          case 'month':
            const monthAgo = new Date(today);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return docDate >= monthAgo;
          case 'year':
            const yearAgo = new Date(today);
            yearAgo.setFullYear(yearAgo.getFullYear() - 1);
            return docDate >= yearAgo;
          case 'custom':
            if (customDateFrom && customDateTo) {
              const from = new Date(customDateFrom);
              const to = new Date(customDateTo);
              to.setHours(23, 59, 59, 999); // Include the entire end date
              return docDate >= from && docDate <= to;
            } else if (customDateFrom) {
              const from = new Date(customDateFrom);
              return docDate >= from;
            } else if (customDateTo) {
              const to = new Date(customDateTo);
              to.setHours(23, 59, 59, 999);
              return docDate <= to;
            }
            return true;
          default:
            return true;
        }
      });
    }

    // Apply size filter
    if (sizeFilter !== 'all') {
      filtered = filtered.filter(doc => {
        const sizeMB = doc.sizeBytes / (1024 * 1024);

        switch (sizeFilter) {
          case 'small': // < 1 MB
            return sizeMB < 1;
          case 'medium': // 1-10 MB
            return sizeMB >= 1 && sizeMB <= 10;
          case 'large': // > 10 MB
            return sizeMB > 10;
          default:
            return true;
        }
      });
    }

    // Apply favorites filter
    if (favoritesFilter) {
      filtered = filtered.filter(doc => doc.isFavorite === true);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      switch (sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'date':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
        case 'size':
          comparison = a.sizeBytes - b.sizeBytes;
          break;
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setDocuments(filtered);
  }, [allDocuments, searchQuery, fileTypeFilter, tagFilter, dateRangeFilter, customDateFrom, customDateTo, sizeFilter, favoritesFilter, sortBy, sortOrder]);

  // Helper function to build folder path from folderId
  const buildFolderPath = useCallback((folderId: string | null): string => {
    if (!folderId) return isPersonalVault ? 'My Vault' : 'Business Vault';
    const path: string[] = [];
    let current = folders.find(f => f.id === folderId);
    while (current) {
      path.unshift(current.name);
      current = folders.find(f => f.id === current!.parentId);
    }
    return path.join(' / ');
  }, [folders, isPersonalVault]);

  // Search effect - handles recursive search across all folders
  useEffect(() => {
    if (!searchQuery.trim()) {
      setIsSearchMode(false);
      setSearchResults(null);
      return;
    }

    setIsSearchMode(true);
    const parsed = parseSearchQuery(searchQuery);

    // Search ALL vault documents (not just current folder) - supports +/- operators
    const matchedDocs = allVaultDocuments.filter(doc =>
      matchesSearch(doc.name, doc.labels, parsed)
    );

    // Search folders by name
    const matchedFolders = folders.filter(folder =>
      matchesSearch(folder.name, undefined, parsed)
    );

    // Group documents by folder path
    const grouped = new Map<string, { path: string; documents: DocumentData[] }>();
    matchedDocs.forEach(doc => {
      const folderId = doc.folderId || 'root';
      const folderPath = buildFolderPath(doc.folderId || null);
      if (!grouped.has(folderId)) {
        grouped.set(folderId, { path: folderPath, documents: [] });
      }
      grouped.get(folderId)!.documents.push(doc);
    });

    setSearchResults({
      documents: matchedDocs,
      folders: matchedFolders,
      groupedByFolder: grouped
    });
    // Expand all groups by default
    setExpandedSearchFolders(new Set(grouped.keys()));
  }, [searchQuery, allVaultDocuments, folders, buildFolderPath]);

  // Toggle search folder expansion
  const handleToggleSearchFolder = useCallback((folderId: string) => {
    setExpandedSearchFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  }, []);

  // Navigate to folder from search results (clears search)
  const handleSearchFolderClick = useCallback((folderId: string | null) => {
    setCurrentFolderId(folderId);
    setSearchQuery('');
    setIsSearchMode(false);
    setSearchResults(null);
  }, []);

  const handleCreateFolder = async (name: string) => {
    try {
      const vaultId = validatedOrgId;

      // CRITICAL: NEVER send "personal" string - it must be a valid UUID
      if (!vaultId || vaultId === 'personal') {
        showToast('Invalid vault ID - please refresh the page to reload your vault data', 'error');
        throw new Error('Invalid vault ID - cannot be "personal" string');
      }

      const bodyData: any = {
        name,
        parentId: currentFolderId,
      };

      // Add either personalVaultId or organizationId based on vault type
      if (isPersonalVault) {
        bodyData.personalVaultId = vaultId;
      } else {
        bodyData.organizationId = vaultId;
      }

      console.log('[CREATE FOLDER] Request body:', bodyData);

      const response = await fetch('/api/folders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData),
      });

      if (!response.ok) {
        throw new Error('Failed to create folder');
      }

      await loadData();
    } catch (error) {
      console.error('Error creating folder:', error);
      throw error;
    }
  };

  const handleRenameFolder = async (folderId: string, newName: string) => {
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        throw new Error('Failed to rename folder');
      }

      await loadData();
    } catch (error) {
      console.error('Error renaming folder:', error);
      throw error;
    }
  };

  const handleDeleteFolder = (folder: FolderData) => {
    setDeleteTarget({ type: 'folder', item: folder });
    setShowDeleteConfirm(true);
  };

  const handleMoveFolder = async (folderId: string, newParentId: string | null) => {
    try {
      const response = await fetch(`/api/folders/${folderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ parentId: newParentId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to move folder');
      }

      showToast('Folder moved successfully', 'success');
      loadData(); // Refresh folders and documents
    } catch (error: any) {
      console.error('Error moving folder:', error);
      showToast(error.message || 'Failed to move folder', 'error');
      throw error;
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    setDeleteLoading(true);
    try {
      if (deleteTarget.type === 'folder') {
        const response = await fetch(`/api/folders/${deleteTarget.item.id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const error = await response.json();
          showToast(error.error || 'Failed to delete folder', 'error');
          return;
        }

        showToast('Folder deleted successfully', 'success');
      } else if (deleteTarget.type === 'bulk') {
        // Bulk delete - run in PARALLEL for speed
        const documentIds = deleteTarget.item as string[];
        console.log('[BULK DELETE] Deleting documents in parallel:', documentIds.length, 'files');

        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        // Filter valid UUIDs first
        const validIds = documentIds.filter(id => {
          if (!uuidRegex.test(id)) {
            console.error('[BULK DELETE] Invalid document ID format:', id);
            return false;
          }
          return true;
        });

        const invalidCount = documentIds.length - validIds.length;

        // Execute all deletes in parallel using Promise.allSettled
        const deletePromises = validIds.map(documentId =>
          fetch(`/api/documents/${encodeURIComponent(documentId)}`, {
            method: 'DELETE',
          }).then(response => ({ documentId, success: response.ok }))
            .catch(() => ({ documentId, success: false }))
        );

        const results = await Promise.allSettled(deletePromises);

        let successCount = 0;
        let failCount = invalidCount; // Start with invalid IDs as failures

        results.forEach(result => {
          if (result.status === 'fulfilled' && result.value.success) {
            successCount++;
          } else {
            failCount++;
          }
        });

        if (successCount > 0) {
          showToast(`Deleted ${successCount} document${successCount > 1 ? 's' : ''} successfully`, 'success');
        }
        if (failCount > 0) {
          showToast(`Failed to delete ${failCount} document${failCount > 1 ? 's' : ''}`, 'error');
        }

        // Clear selection after bulk delete
        setSelectedDocuments([]);
        setSelectionMode(false);
      } else {
        // Single document delete
        console.log('[DELETE] deleteTarget.item:', deleteTarget.item);
        console.log('[DELETE] deleteTarget.item.id:', deleteTarget.item.id);

        // Validate document ID before making request
        const documentId = deleteTarget.item.id;
        const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
        if (!uuidRegex.test(documentId)) {
          console.error('[DELETE] Invalid document ID format:', documentId);
          showToast(`Invalid document ID format: ${documentId}. Please refresh the page and try again.`, 'error');
          return;
        }

        // Use encodeURIComponent to ensure proper URL encoding
        const encodedId = encodeURIComponent(documentId);
        const deleteUrl = `/api/documents/${encodedId}`;
        console.log('[DELETE] Making fetch request to URL:', deleteUrl);

        const response = await fetch(deleteUrl, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          showToast(errorData.error || 'Failed to delete document', 'error');
          return;
        }

        showToast('Document deleted successfully', 'success');
      }

      await loadData();
      setShowDeleteConfirm(false);
      setDeleteTarget(null);
    } catch (error) {
      console.error('Error deleting:', error);
      showToast(`Failed to delete ${deleteTarget.type}`, 'error');
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleUploadDocuments = async (uploads: any[]): Promise<{ documentId: string; s3Key: string }[]> => {
    try {
      const vaultId = validatedOrgId;

      // CRITICAL: NEVER send "personal" string - it must be a valid UUID
      if (!vaultId || vaultId === 'personal') {
        showToast('Invalid vault ID - please refresh the page to reload your vault data', 'error');
        throw new Error('Invalid vault ID - cannot be "personal" string');
      }

      const savedDocs: { documentId: string; s3Key: string }[] = [];

      for (const upload of uploads) {
        // Fallback mimeType for files without one (e.g., .md, .txt)
        let mimeType = upload.file.type;
        if (!mimeType) {
          const ext = upload.file.name.split('.').pop()?.toLowerCase();
          const mimeMap: Record<string, string> = {
            'md': 'text/markdown',
            'txt': 'text/plain',
            'json': 'application/json',
            'csv': 'text/csv',
            'xml': 'application/xml',
            'html': 'text/html',
            'css': 'text/css',
            'js': 'application/javascript',
            'ts': 'application/typescript',
          };
          mimeType = mimeMap[ext || ''] || 'application/octet-stream';
        }

        const bodyData: any = {
          name: upload.file.name,
          mimeType,
          size: upload.file.size,
          storageKey: upload.storageKey,
          storageUrl: upload.storageUrl,
          folderId: currentFolderId,
          uploadedById: user?.id,
        };

        // Add either personalVaultId or organizationId based on vault type
        if (isPersonalVault) {
          bodyData.personalVaultId = vaultId;
        } else {
          bodyData.organizationId = vaultId;
        }

        console.log('[UPLOAD DOCUMENT] Request body:', bodyData);

        const response = await fetch('/api/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData),
        });

        if (!response.ok) {
          let errorMessage = 'Failed to save document metadata';
          try {
            const errorData = await response.json();
            errorMessage = errorData.error || errorMessage;
          } catch {
            // Response wasn't JSON
          }
          console.error('[UPLOAD DOCUMENT] API error:', response.status, errorMessage);
          throw new Error(errorMessage);
        }

        const data = await response.json();
        savedDocs.push({
          documentId: data.document?.id || data.id,
          s3Key: upload.storageKey,
        });
      }

      await loadData();
      return savedDocs;
    } catch (error) {
      console.error('Error uploading documents:', error);
      throw error;
    }
  };

  const handleRenameDocument = async (documentId: string, newName: string) => {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) {
        throw new Error('Failed to rename document');
      }

      await loadData();
    } catch (error) {
      console.error('Error renaming document:', error);
      throw error;
    }
  };

  const handleMoveDocument = async (documentId: string, folderId: string | null) => {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to move document');
      }

      await loadData();
    } catch (error) {
      console.error('Error moving document:', error);
      throw error;
    }
  };

  const handleDeleteDocument = (document: DocumentData) => {
    console.log('[handleDeleteDocument] Document to delete:', document);
    console.log('[handleDeleteDocument] Document ID:', document.id);
    setDeleteTarget({ type: 'document', item: document });
    setShowDeleteConfirm(true);
  };

  // Selection handlers
  const handleToggleSelect = (document: DocumentData) => {
    setSelectedDocuments(prev => {
      if (prev.includes(document.id)) {
        return prev.filter(id => id !== document.id);
      } else {
        return [...prev, document.id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectedDocuments.length === documents.length) {
      // Deselect all
      setSelectedDocuments([]);
    } else {
      // Select all
      setSelectedDocuments(documents.map(doc => doc.id));
    }
  };

  const handleBulkDelete = () => {
    if (selectedDocuments.length === 0) return;
    setDeleteTarget({ type: 'bulk', item: selectedDocuments });
    setShowDeleteConfirm(true);
  };

  const handleBulkMove = async (documentIds: string[], folderId: string | null) => {
    console.log('[BULK MOVE] Moving documents in parallel:', documentIds.length, 'files to folder:', folderId);

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    // Filter valid UUIDs first
    const validIds = documentIds.filter(id => {
      if (!uuidRegex.test(id)) {
        console.error('[BULK MOVE] Invalid document ID format:', id);
        return false;
      }
      return true;
    });

    const invalidCount = documentIds.length - validIds.length;

    // Execute all moves in parallel using Promise.allSettled
    const movePromises = validIds.map(documentId =>
      fetch(`/api/documents/${encodeURIComponent(documentId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId }),
      }).then(response => ({ documentId, success: response.ok }))
        .catch(() => ({ documentId, success: false }))
    );

    const results = await Promise.allSettled(movePromises);

    let successCount = 0;
    let failCount = invalidCount;

    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value.success) {
        successCount++;
      } else {
        failCount++;
      }
    });

    if (successCount > 0) {
      const folderName = folderId
        ? folders.find(f => f.id === folderId)?.name || 'selected folder'
        : (isPersonalVault ? 'My Vault' : 'Business Vault');
      showToast(`Moved ${successCount} document${successCount > 1 ? 's' : ''} to ${folderName}`, 'success');
    }
    if (failCount > 0) {
      showToast(`Failed to move ${failCount} document${failCount > 1 ? 's' : ''}`, 'error');
    }

    // Clear selection and exit selection mode
    setSelectedDocuments([]);
    setSelectionMode(false);
    setShowBulkMoveModal(false);

    // Refresh the document list
    await loadData();
  };

  // Handle bulk tag operations
  const handleBulkApplyTags = async (documentIds: string[], tagsToAdd: string[], tagsToRemove: string[]) => {
    console.log('[BULK TAG] Applying tags to documents:', documentIds.length, 'add:', tagsToAdd, 'remove:', tagsToRemove);

    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

    // Filter valid UUIDs first
    const validIds = documentIds.filter(id => {
      if (!uuidRegex.test(id)) {
        console.error('[BULK TAG] Invalid document ID format:', id);
        return false;
      }
      return true;
    });

    const invalidCount = documentIds.length - validIds.length;

    // For each document, compute the new tags list
    const tagPromises = validIds.map(async (documentId) => {
      // Find the current document to get existing labels
      const doc = documents.find(d => d.id === documentId);
      const currentLabels = doc?.labels || [];

      // Compute new labels: add new tags, remove specified tags
      let newLabels = [...currentLabels];

      // Remove tags
      newLabels = newLabels.filter(label => !tagsToRemove.includes(label));

      // Add new tags (avoid duplicates)
      for (const tag of tagsToAdd) {
        if (!newLabels.includes(tag)) {
          newLabels.push(tag);
        }
      }

      try {
        const response = await fetch(`/api/documents/${encodeURIComponent(documentId)}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tags: newLabels }),
        });
        return { documentId, success: response.ok };
      } catch {
        return { documentId, success: false };
      }
    });

    const results = await Promise.allSettled(tagPromises);

    let successCount = 0;
    let failCount = invalidCount;

    results.forEach(result => {
      if (result.status === 'fulfilled' && result.value.success) {
        successCount++;
      } else {
        failCount++;
      }
    });

    if (successCount > 0) {
      const actionDesc = tagsToAdd.length > 0 && tagsToRemove.length > 0
        ? 'Updated tags on'
        : tagsToAdd.length > 0
          ? 'Added tags to'
          : 'Removed tags from';
      showToast(`${actionDesc} ${successCount} document${successCount > 1 ? 's' : ''}`, 'success');
    }
    if (failCount > 0) {
      showToast(`Failed to update tags on ${failCount} document${failCount > 1 ? 's' : ''}`, 'error');
    }

    // Clear selection and exit selection mode
    setSelectedDocuments([]);
    setSelectionMode(false);
    setShowBulkTagModal(false);

    // Refresh the document list
    await loadData();
  };

  // Handle drag-and-drop document move to folder
  const handleDocumentDrop = async (documentId: string, targetFolderId: string | null) => {
    console.log('[DRAG-DROP] Moving document:', documentId, 'to folder:', targetFolderId);

    try {
      const response = await fetch(`/api/documents/${encodeURIComponent(documentId)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folderId: targetFolderId }),
      });

      if (response.ok) {
        const doc = documents.find(d => d.id === documentId);
        const folderName = targetFolderId
          ? folders.find(f => f.id === targetFolderId)?.name || 'folder'
          : (isPersonalVault ? 'My Vault' : 'Business Vault');
        showToast(`Moved "${doc?.name || 'document'}" to ${folderName}`, 'success');
        await loadData();
      } else {
        showToast('Failed to move document', 'error');
      }
    } catch (error) {
      console.error('[DRAG-DROP] Error:', error);
      showToast('Failed to move document', 'error');
    }
  };

  // Handle file drag-and-drop from desktop
  const handleFileDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Check if dragging files (not internal document drag)
    if (e.dataTransfer.types.includes('Files')) {
      setIsDraggingFiles(true);
    }
  }, []);

  const handleFileDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Only set to false if we're leaving the container (not entering a child)
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDraggingFiles(false);
    }
  }, []);

  const handleFileDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingFiles(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      console.log('[FILE DROP] Dropped files:', files.map(f => f.name));
      setDroppedFiles(files);
      setShowUploadModal(true);
    }
  }, []);

  // Clear dropped files when modal closes
  const handleUploadModalClose = useCallback(() => {
    setShowUploadModal(false);
    setDroppedFiles([]);
  }, []);

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode);
    if (selectionMode) {
      // Clear selections when exiting selection mode
      setSelectedDocuments([]);
    }
  };

  // Handle favorite toggle - update local state when favorite status changes
  const handleToggleFavorite = (updatedDocument: DocumentData) => {
    // Update allDocuments state to reflect the new favorite status
    setAllDocuments(prev => prev.map(doc =>
      doc.id === updatedDocument.id
        ? { ...doc, isFavorite: updatedDocument.isFavorite }
        : doc
    ));
  };

  const handleDownloadDocument = async (doc: DocumentData) => {
    try {
      // Use the download API endpoint which returns file with Content-Disposition header
      // This forces the browser to download instead of opening in a new tab
      const downloadUrl = `/api/documents/${doc.id}/download`

      // Create a temporary link and click it
      const link = document.createElement('a')
      link.href = downloadUrl
      link.download = doc.name
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error downloading document:', error)
      showToast('Failed to download document', 'error')
    }
  };

  const handleManageTags = async (documentId: string, tags: string[]) => {
    try {
      const response = await fetch(`/api/documents/${documentId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tags }),
      });

      if (!response.ok) {
        throw new Error('Failed to update tags');
      }

      await loadData();
    } catch (error) {
      console.error('Error updating tags:', error);
      throw error;
    }
  };

  // Handle scanned document uploads (with AI analysis results)
  const handleScanUpload = async (files: { file: File; name: string; analysisResult?: any }[]) => {
    try {
      const vaultId = validatedOrgId;

      if (!vaultId || vaultId === 'personal') {
        showToast('Invalid vault ID - please refresh the page to reload your vault data', 'error');
        throw new Error('Invalid vault ID - cannot be "personal" string');
      }

      // Track the folder where documents end up so we can navigate there
      let targetFolderId: string | null = null;
      let targetFolderPath: string | null = null;

      // Upload each scanned file
      for (const { file, name: proposedName, analysisResult } of files) {
        // First, upload to S3
        const formData = new FormData();
        formData.append('file', file);
        formData.append('userId', user?.id || '');

        // Use correct upload endpoint based on vault type
        const uploadUrl = isPersonalVault
          ? `/api/personal/upload`
          : `/api/org/${vaultId}/upload`;

        const uploadRes = await fetch(uploadUrl, {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error('Failed to upload scanned file');
        }

        const uploadData = await uploadRes.json();

        // Step 1: Create document WITHOUT folder first (same pattern as bulk upload)
        // We'll use smart-move to place it in the correct folder after creation
        const bodyData: any = {
          name: proposedName,
          mimeType: file.type,
          size: file.size,
          storageKey: uploadData.key,
          storageUrl: uploadData.url,
          folderId: null, // Don't set folder here - use smart-move after
          uploadedById: user?.id,
          expiresAt: analysisResult?.expirationDate || null,
        };

        if (isPersonalVault) {
          bodyData.personalVaultId = vaultId;
        } else {
          bodyData.organizationId = vaultId;
        }

        const docRes = await fetch('/api/documents', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(bodyData),
        });

        if (!docRes.ok) {
          throw new Error('Failed to save document metadata');
        }

        const docData = await docRes.json();
        const documentId = docData.document?.id;
        console.log('[SCAN UPLOAD] === Document Creation Result ===');
        console.log('[SCAN UPLOAD] documentId:', documentId);
        console.log('[SCAN UPLOAD] document data:', JSON.stringify(docData.document, null, 2));
        console.log('[SCAN UPLOAD] vaultId used:', vaultId);
        console.log('[SCAN UPLOAD] isPersonalVault:', isPersonalVault);

        // Step 2: Move document to correct folder using smart-move (proven to work in bulk upload)
        if (documentId) {
          const folderSuggestion = analysisResult?.folderSuggestion;

          // DEBUG: Log what we received from the analysis
          console.log('[SCAN UPLOAD] Document created:', documentId);
          console.log('[SCAN UPLOAD] analysisResult:', JSON.stringify({
            hasAnalysisResult: !!analysisResult,
            classification: analysisResult?.classification,
            folderSuggestion: {
              hasIt: !!folderSuggestion,
              matchedExistingFolder: folderSuggestion?.matchedExistingFolder,
              pathSegments: folderSuggestion?.pathSegments,
              pathSegmentsLength: folderSuggestion?.pathSegments?.length,
            }
          }, null, 2));

          // Case 1: AI matched an existing folder - use PATCH to set folderId directly
          if (folderSuggestion?.matchedExistingFolder?.id) {
            console.log('[SCAN UPLOAD] Moving to matched folder:', folderSuggestion.matchedExistingFolder.path);
            console.log('[SCAN UPLOAD] Target folderId:', folderSuggestion.matchedExistingFolder.id);
            const patchRes = await fetch(`/api/documents/${documentId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                folderId: folderSuggestion.matchedExistingFolder.id,
              }),
            });
            if (patchRes.ok) {
              const patchData = await patchRes.json();
              console.log('[SCAN UPLOAD] PATCH succeeded:', patchData);
              // Track the folder for navigation
              if (!targetFolderId) {
                targetFolderId = folderSuggestion.matchedExistingFolder.id;
                targetFolderPath = folderSuggestion.matchedExistingFolder.path;
              }
            } else {
              const errData = await patchRes.json().catch(() => ({}));
              console.error('[SCAN UPLOAD] PATCH FAILED:', patchRes.status, errData);
            }
          }
          // Case 2: AI suggested a folder path - use smart-move to create/find and move
          else if (folderSuggestion?.pathSegments?.length > 0) {
            console.log('[SCAN UPLOAD] Smart-moving to:', folderSuggestion.pathSegments.join('/'));
            const smartMoveRes = await fetch(`/api/documents/${documentId}/smart-move`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                suggestedPath: folderSuggestion.pathSegments,
                vaultContext: isPersonalVault ? 'personal' : 'organization',
                personalVaultId: isPersonalVault ? vaultId : undefined,
                organizationId: isPersonalVault ? undefined : vaultId,
              }),
            });
            if (smartMoveRes.ok) {
              const smartMoveData = await smartMoveRes.json();
              console.log('[SCAN UPLOAD] Smart-move succeeded:', smartMoveData.folder?.path);
              // Track the folder for navigation
              if (!targetFolderId && smartMoveData.folder?.id) {
                targetFolderId = smartMoveData.folder.id;
                targetFolderPath = smartMoveData.folder.path;
              }
            } else {
              const errData = await smartMoveRes.json().catch(() => ({}));
              console.error('[SCAN UPLOAD] Smart-move FAILED:', smartMoveRes.status, errData);
            }
          }
          // Case 3: No folder suggestion but we have a category - generate fallback path
          else if (analysisResult?.classification?.category && analysisResult.classification.category !== 'other') {
            const category = analysisResult.classification.category;
            const subtype = analysisResult.classification.subtype || 'general';
            const year = new Date().getFullYear().toString();
            const categoryFolder = category.charAt(0).toUpperCase() + category.slice(1);
            const subtypeFolder = subtype.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

            const fallbackPath = isPersonalVault
              ? ['Personal Documents', categoryFolder, year, subtypeFolder]
              : [categoryFolder, year, subtypeFolder];

            console.log('[SCAN UPLOAD] Using category fallback:', fallbackPath.join('/'));
            const fallbackRes = await fetch(`/api/documents/${documentId}/smart-move`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                suggestedPath: fallbackPath,
                vaultContext: isPersonalVault ? 'personal' : 'organization',
                personalVaultId: isPersonalVault ? vaultId : undefined,
                organizationId: isPersonalVault ? undefined : vaultId,
              }),
            });
            if (fallbackRes.ok) {
              const fallbackData = await fallbackRes.json();
              console.log('[SCAN UPLOAD] Category fallback succeeded:', fallbackData.folder?.path);
              // Track the folder for navigation
              if (!targetFolderId && fallbackData.folder?.id) {
                targetFolderId = fallbackData.folder.id;
                targetFolderPath = fallbackData.folder.path;
              }
            } else {
              const errData = await fallbackRes.json().catch(() => ({}));
              console.error('[SCAN UPLOAD] Category fallback FAILED:', fallbackRes.status, errData);
            }
          } else {
            console.log('[SCAN UPLOAD] No folder suggestion or category, document stays in root');
          }

          // Step 3: Confirm the document (changes status from 'pending' to 'confirmed')
          // Pass wasAnalyzed: true to track Processing Units usage
          console.log('[SCAN UPLOAD] Confirming document:', documentId);
          const confirmRes = await fetch(`/api/documents/${documentId}/confirm`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ wasAnalyzed: true }),
          });
          if (confirmRes.ok) {
            const confirmData = await confirmRes.json();
            console.log('[SCAN UPLOAD] === Confirm Result ===');
            console.log('[SCAN UPLOAD] Confirm succeeded:', JSON.stringify(confirmData, null, 2));
          } else {
            const errData = await confirmRes.json().catch(() => ({}));
            console.error('[SCAN UPLOAD] Confirm FAILED:', confirmRes.status, errData);
          }
        } else {
          console.error('[SCAN UPLOAD] === ERROR: No documentId returned ===');
          console.error('[SCAN UPLOAD] docData was:', JSON.stringify(docData, null, 2));
        }

        // OCR processing is now handled by the analyze endpoint, so we skip it here
        // The analysis already ran Textract and extracted text
        console.log('[SCAN UPLOAD] Document saved with AI analysis:', {
          documentId,
          name: proposedName,
          category: analysisResult?.classification?.category,
          expirationDate: analysisResult?.expirationDate,
          folderPath: analysisResult?.folderSuggestion?.pathSegments?.join('/'),
        });
      }

      console.log('[SCAN UPLOAD] === All documents processed ===');
      console.log('[SCAN UPLOAD] Target folder for navigation:', { targetFolderId, targetFolderPath });
      console.log('[SCAN UPLOAD] Current folder before navigation:', currentFolderId);

      // Navigate to the folder where the document(s) were placed
      if (targetFolderId) {
        console.log('[SCAN UPLOAD] Navigating to target folder:', targetFolderId);
        setCurrentFolderId(targetFolderId);
        // loadData will be triggered by the useEffect watching currentFolderId
      } else {
        // Document stayed in root, just reload
        console.log('[SCAN UPLOAD] No target folder - reloading current folder (root)');
        await loadData();
      }

      console.log('[SCAN UPLOAD] Complete');
      const folderMessage = targetFolderPath ? ` to "${targetFolderPath}"` : '';
      showToast(`Successfully uploaded ${files.length} scanned document${files.length > 1 ? 's' : ''}${folderMessage}`, 'success');
      setShowScanModal(false);
    } catch (error) {
      console.error('Error uploading scanned documents:', error);
      showToast('Failed to upload scanned documents', 'error');
      throw error;
    }
  };

  const currentFolderName = currentFolderId
    ? folders.find(f => f.id === currentFolderId)?.name || 'Unknown'
    : 'My Vault';

  // Calculate storage stats
  // Note: PostgreSQL returns BIGINT as string, so we need to parse it
  const totalSize = useMemo(() => {
    return allDocuments.reduce((sum, doc) => {
      const size = typeof doc.sizeBytes === 'string' ? parseInt(doc.sizeBytes, 10) : (doc.sizeBytes || 0);
      return sum + (isNaN(size) ? 0 : size);
    }, 0);
  }, [allDocuments]);

  // Get unique tags from all documents for filter dropdown
  const uniqueTags = useMemo(() => {
    const tags = new Set<string>();
    allDocuments.forEach(doc => {
      doc.labels?.forEach(label => tags.add(label));
    });
    return Array.from(tags).sort();
  }, [allDocuments]);

  const formatBytes = (bytes: number) => {
    if (!bytes || bytes === 0 || isNaN(bytes)) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Documents */}
        {/* Total Documents */}
        <div className="glass-card relative overflow-hidden p-3 sm:p-5 transition-all duration-500 group hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-bold text-white dark:text-white font-display uppercase tracking-wider">Total Documents</p>
              <p className="text-xl sm:text-3xl font-black mt-1 text-white dark:text-white font-display">{globalUsage?.totalDocuments ?? allDocuments.length}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-teal-mid/20 group-hover:bg-teal-mid/30 transition-colors">
              <FileText className="w-4 h-4 sm:w-6 sm:h-6 text-teal-dark" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            <span className="text-[10px] sm:text-xs font-bold text-white dark:text-white font-outfit">+{Math.min(allDocuments.length, 5)} this week</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-mid to-teal-bright" />
        </div>

        {/* Total Folders */}
        {/* Total Folders */}
        <div className="glass-card relative overflow-hidden p-3 sm:p-5 transition-all duration-500 group hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-bold text-white dark:text-white font-display uppercase tracking-wider">Folders</p>
              <p className="text-xl sm:text-3xl font-black mt-1 text-white dark:text-white font-display">{folders.length}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-orange-400/20 group-hover:bg-orange-400/30 transition-colors">
              <FolderPlus className="w-4 h-4 sm:w-6 sm:h-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <span className="text-[10px] sm:text-xs font-bold text-white dark:text-white font-outfit">Organized structure</span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 to-amber-500" />
        </div>

        {/* Storage Used */}
        {/* Storage Used */}
        <div className="glass-card relative overflow-hidden p-3 sm:p-5 transition-all duration-500 group hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs sm:text-sm font-bold text-white dark:text-white font-display uppercase tracking-wider">Storage Used</p>
              <p className="text-lg sm:text-3xl font-black mt-1 text-white dark:text-white font-display">
                {formatBytes(globalUsage?.storageUsed ?? totalSize)}
              </p>
              {globalUsage?.storageLimit && (
                <p className="text-[10px] sm:text-xs mt-0.5 font-medium text-white dark:text-white font-outfit">
                  of {formatBytes(globalUsage.storageLimit)}
                </p>
              )}
            </div>
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-purple-500/20 group-hover:bg-purple-500/30 transition-colors">
              <HardDrive className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-2 sm:mt-3">
            <div className="h-1 sm:h-1.5 rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-purple-500 transition-all duration-300"
                style={{ width: `${Math.min(globalUsage?.storagePercentage ?? 0, 100)}%` }}
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-600 to-purple-500" />
        </div>

        {/* Processing Units Usage */}
        <div className="glass-card relative overflow-hidden p-3 sm:p-5 transition-all duration-500 group hover:-translate-y-1">
          <div className="flex items-center justify-between">
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm font-bold text-white dark:text-white font-display uppercase tracking-wider">
                Processing Units
              </p>
              <p className="text-lg sm:text-xl font-black mt-1 text-white dark:text-white font-display">
                {(globalUsage?.puUsed ?? 0).toLocaleString()} / {(globalUsage?.puLimit ?? 0).toLocaleString()}
              </p>
              <p className="text-[10px] sm:text-xs mt-1 font-bold text-white dark:text-white font-outfit">
                {globalUsage?.billingCycleEnd
                  ? `Resets ${Math.ceil((new Date(globalUsage.billingCycleEnd).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days`
                  : 'Resets monthly'}
              </p>
            </div>
            {/* Circular Gauge */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Background circle */}
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke="rgba(0,0,0,0.05)"
                  strokeWidth="10"
                />
                {/* Progress circle */}
                <circle
                  cx="50" cy="50" r="40"
                  fill="none"
                  stroke={
                    (globalUsage?.puPercentage ?? 0) >= 95 ? '#ef4444' :
                    (globalUsage?.puPercentage ?? 0) >= 90 ? '#f97316' :
                    (globalUsage?.puPercentage ?? 0) >= 70 ? '#eab308' :
                    '#22c55e'
                  }
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${((globalUsage?.puPercentage ?? 0) / 100) * 251.2} 251.2`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs sm:text-sm font-bold text-white dark:text-white font-display">
                  {Math.round(globalUsage?.puPercentage ?? 0)}%
                </span>
              </div>
            </div>
          </div>
          {/* Color-coded bottom bar */}
          <div
            className="absolute bottom-0 left-0 right-0 h-1 transition-colors"
            style={{
              backgroundColor:
                (globalUsage?.puPercentage ?? 0) >= 95 ? '#ef4444' :
                (globalUsage?.puPercentage ?? 0) >= 90 ? '#f97316' :
                (globalUsage?.puPercentage ?? 0) >= 70 ? '#eab308' :
                '#22c55e'
            }}
          />
        </div>
      </div>

      {/* Main Content Area - Full Width (no sidebar) */}
      <div
        className="w-full relative"
        onDragOver={handleFileDragOver}
        onDragLeave={handleFileDragLeave}
        onDrop={handleFileDrop}
      >
          {/* Drop zone overlay */}
          {isDraggingFiles && (
            <div className={`absolute inset-0 z-50 flex items-center justify-center rounded-xl sm:rounded-2xl pointer-events-none ${
              isDarkMode
                ? 'bg-blue-500/20 border-2 border-dashed border-blue-400'
                : 'bg-blue-100/80 border-2 border-dashed border-blue-500'
            }`}>
              <div className={`text-center p-8 rounded-xl ${isDarkMode ? 'bg-slate-800/90' : 'bg-white/90'}`}>
                <Upload className={`w-12 h-12 mx-auto mb-3 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <p className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-navy'}`}>
                  Drop files to upload
                </p>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-slate-400' : 'text-navy/70'}`}>
                  Release to add files to {currentFolderName || 'this folder'}
                </p>
              </div>
            </div>
          )}

          <div className={`glass-card p-4 sm:p-6 transition-all duration-500 ${isDraggingFiles ? 'opacity-50' : ''}`}>
            {/* Header with Breadcrumb and Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              <FolderBreadcrumb
                folders={folders}
                currentFolderId={currentFolderId}
                onNavigate={setCurrentFolderId}
                isBusinessAccount={!isPersonalVault}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowCreateFolder(true)}
                  disabled={!validatedOrgId}
                  className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? 'bg-slate-700 hover:bg-slate-600 text-white border border-slate-600'
                      : 'bg-white/40 hover:bg-white/60 text-white border border-white/30'
                  }`}
                >
                  <FolderPlus className="w-4 h-4" />
                  <span className="hidden sm:inline">New Folder</span>
                </button>
                <button
                  onClick={() => setShowScanModal(true)}
                  disabled={!validatedOrgId}
                  className={`flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    isDarkMode
                      ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-white'
                  } shadow-lg shadow-emerald-500/25`}
                >
                  <Camera className="w-4 h-4" />
                  <span className="hidden sm:inline">Scan</span>
                </button>
                <button
                  onClick={() => setShowUploadModal(true)}
                  disabled={!validatedOrgId}
                  className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 min-h-[44px] bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white rounded-lg sm:rounded-xl text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/25"
                >
                  <Upload className="w-4 h-4" />
                  <span className="hidden sm:inline">Upload</span>
                </button>
              </div>
            </div>

            {/* Search and Filters */}
            {activeOrg && !loading && (
              <div className="mb-4 sm:mb-6 space-y-3 sm:space-y-4">
                {/* Search Bar */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-white" />
                    <input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg sm:rounded-xl transition-all outline-none focus:ring-2 focus:ring-teal-mid/50 border border-white/30 bg-white/40 backdrop-blur-md text-white dark:text-white placeholder-white/70 font-outfit shadow-sm"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 p-1 text-white/60 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {/* Search Help Tooltip */}
                  <div className="relative group">
                    <HelpCircle className="w-5 h-5 cursor-help text-white hover:text-white/80 transition-colors" />
                    <div className="absolute right-0 top-8 hidden group-hover:block rounded-lg p-3 w-52 z-50 shadow-xl glass-card border-white/40 text-white text-xs font-medium backdrop-blur-xl">
                      <p className="font-bold mb-2 text-sm font-display">Search tips:</p>
                      <p className="mb-1">• <code className="bg-white/30 px-1 rounded">word1+word2</code> = both</p>
                      <p className="mb-1">• <code className="bg-white/30 px-1 rounded">word1-word2</code> = exclude</p>
                      <p>• <code className="bg-white/30 px-1 rounded">word1 word2</code> = either</p>
                    </div>
                  </div>
                </div>

                {/* Filters and Sort */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative z-10">
                  {/* File Type Filter */}
                  <select
                    value={fileTypeFilter}
                    onChange={(e) => setFileTypeFilter(e.target.value)}
                    className="pl-3 pr-8 sm:pl-4 sm:pr-10 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white dark:text-white bg-white/40 border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-teal-mid/50 focus:border-teal-mid outline-none transition-all cursor-pointer appearance-none font-outfit hover:bg-white/50 [&>option]:text-slate-900 [&>option]:bg-white"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23FFFFFF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1em' }}
                  >
                    <option value="all">All Types</option>
                    <option value="pdf">PDF</option>
                    <option value="word">Word</option>
                    <option value="excel">Excel</option>
                    <option value="image">Image</option>
                    <option value="other">Other</option>
                  </select>

                  {/* Tag Filter */}
                  {uniqueTags.length > 0 && (
                    <select
                      value={tagFilter}
                      onChange={(e) => setTagFilter(e.target.value)}
                      className="px-3 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white dark:text-white bg-white/40 border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-teal-mid/50 outline-none transition-all cursor-pointer font-outfit hover:bg-white/50 [&>option]:text-slate-900 [&>option]:bg-white"
                    >
                      <option value="all">All Tags</option>
                      {uniqueTags.map(tag => (
                        <option key={tag} value={tag}>{tag}</option>
                      ))}
                    </select>
                  )}

                  {/* Date Range Filter */}
                  <select
                    value={dateRangeFilter}
                    onChange={(e) => setDateRangeFilter(e.target.value)}
                    className="px-3 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white dark:text-white bg-white/40 border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-teal-mid/50 outline-none transition-all cursor-pointer font-outfit hover:bg-white/50 [&>option]:text-slate-900 [&>option]:bg-white"
                  >
                    <option value="all">All Dates</option>
                    <option value="today">Today</option>
                    <option value="week">Past Week</option>
                    <option value="month">Past Month</option>
                    <option value="year">Past Year</option>
                    <option value="custom">Custom</option>
                  </select>

                  {/* Custom Date Range Inputs */}
                  {dateRangeFilter === 'custom' && (
                    <>
                      <input
                        type="date"
                        value={customDateFrom}
                        onChange={(e) => setCustomDateFrom(e.target.value)}
                        className="px-3 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white dark:text-white bg-white/40 border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-teal-mid/50 outline-none transition-all font-outfit"
                      />
                      <input
                        type="date"
                        value={customDateTo}
                        onChange={(e) => setCustomDateTo(e.target.value)}
                        className="px-3 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-xs sm:text-sm font-medium text-white dark:text-white bg-white/40 border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-teal-mid/50 outline-none transition-all font-outfit"
                      />
                    </>
                  )}

                  {/* Size Filter - hidden on very small screens */}
                  <select
                    value={sizeFilter}
                    onChange={(e) => setSizeFilter(e.target.value)}
                    className="hidden sm:block px-3 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white dark:text-white bg-white/40 border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-teal-mid/50 outline-none transition-all cursor-pointer font-outfit hover:bg-white/50 [&>option]:text-slate-900 [&>option]:bg-white"
                  >
                    <option value="all">All Sizes</option>
                    <option value="small">Small (&lt; 1 MB)</option>
                    <option value="medium">Medium (1-10 MB)</option>
                    <option value="large">Large (&gt; 10 MB)</option>
                  </select>

                  {/* Favorites Filter */}
                  <button
                    onClick={() => setFavoritesFilter(!favoritesFilter)}
                    className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold transition-all font-outfit ${
                      favoritesFilter
                        ? 'bg-amber-400/20 border border-amber-400/50 text-amber-700'
                        : 'bg-white/40 border border-white/30 text-white hover:bg-white/50'
                    }`}
                    title={favoritesFilter ? 'Show all documents' : 'Show favorites only'}
                  >
                    <Star className={`w-4 h-4 ${favoritesFilter ? 'fill-amber-500 text-amber-500' : 'text-white'}`} />
                    <span className="hidden sm:inline">Favorites</span>
                  </button>

                  {/* Sort Options - Right aligned */}
                  <div className="flex items-center gap-2 ml-auto">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as 'name' | 'date' | 'size')}
                      className="px-2 sm:px-4 py-2 min-h-[44px] rounded-lg sm:rounded-xl text-xs sm:text-sm font-bold text-white dark:text-white bg-white/40 border border-white/30 backdrop-blur-md focus:ring-2 focus:ring-teal-mid/50 outline-none transition-all cursor-pointer font-outfit hover:bg-white/50 [&>option]:text-slate-900 [&>option]:bg-white"
                    >
                      <option value="date">Date</option>
                      <option value="name">Name</option>
                      <option value="size">Size</option>
                    </select>

                    <button
                      onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                      className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg sm:rounded-xl transition-all border border-white/30 bg-white/40 hover:bg-white/50 text-white"
                      title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                    >
                      {sortOrder === 'asc' ? '↑' : '↓'}
                    </button>
                  </div>
                </div>

                {/* Results Count & Clear Filters */}
                {(searchQuery || fileTypeFilter !== 'all' || tagFilter !== 'all' || dateRangeFilter !== 'all' || sizeFilter !== 'all' || favoritesFilter) && (
                  <div className={`flex items-center justify-between text-sm ${isDarkMode ? 'text-slate-400' : 'text-white'}`}>
                    <span>Showing {documents.length} of {allDocuments.length} documents{favoritesFilter ? ' (favorites only)' : ''}</span>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setFileTypeFilter('all');
                        setTagFilter('all');
                        setDateRangeFilter('all');
                        setCustomDateFrom('');
                        setCustomDateTo('');
                        setSizeFilter('all');
                        setFavoritesFilter(false);
                      }}
                      className="text-white hover:text-white/80 font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Documents */}
            {!activeOrg ? (
              <div className="text-center py-16">
                <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 ${isDarkMode ? 'bg-slate-700' : 'bg-gray-100'}`}>
                  <FileText className={`w-10 h-10 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`} />
                </div>
                {user ? (
                  <>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>Create an Organization</h3>
                    <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-white/80'}`}>
                      You need to create an organization to store your documents
                    </p>
                    <a
                      href="/settings?tab=organization"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25"
                    >
                      Go to Settings
                    </a>
                  </>
                ) : (
                  <>
                    <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-white'}`}>Please sign in</h3>
                    <p className={`text-sm mb-6 ${isDarkMode ? 'text-slate-400' : 'text-white/80'}`}>
                      You need to sign in to view your documents
                    </p>
                    <a
                      href="/login"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25"
                    >
                      Sign In
                    </a>
                  </>
                )}
              </div>
            ) : loading ? (
              <div className="text-center py-16 flex flex-col items-center justify-center min-h-[400px]">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent mb-4 shadow-lg shadow-white/20"></div>
                <p className="text-base font-medium text-white dark:text-white font-display animate-pulse">Loading documents...</p>
              </div>
            ) : isSearchMode && searchResults ? (
              /* Search Results View */
              <SearchResults
                searchQuery={searchQuery}
                matchedFolders={searchResults.folders}
                groupedDocuments={searchResults.groupedByFolder}
                expandedFolders={expandedSearchFolders}
                onToggleFolder={handleToggleSearchFolder}
                onFolderClick={handleSearchFolderClick}
                onDocumentPreview={(doc) => {
                  setSelectedDocument(doc);
                  setShowPreviewModal(true);
                }}
                onDocumentRename={(doc) => {
                  setSelectedDocument(doc);
                  setShowRenameDocument(true);
                }}
                onDocumentDelete={handleDeleteDocument}
                onDocumentMove={(doc) => {
                  setSelectedDocument(doc);
                  setShowMoveDocument(true);
                }}
                onDocumentDownload={handleDownloadDocument}
                onDocumentManageTags={(doc) => {
                  setSelectedDocument(doc);
                  setShowManageTags(true);
                }}
                onDocumentToggleFavorite={handleToggleFavorite}
              />
            ) : documents.length === 0 && childFolders.length === 0 ? (
              <div className="text-center py-16 glass-card rounded-2xl border border-white/20 shadow-xl backdrop-blur-md">
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-white/10 border border-white/20 shadow-inner">
                  <FileText className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-black mb-2 text-white dark:text-white font-display">No documents yet</h3>
                <p className="text-sm mb-6 text-white/80 dark:text-slate-200 font-medium font-outfit max-w-sm mx-auto">
                  Upload your first document to get started with Secure Vault.
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  disabled={!validatedOrgId}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-mid to-teal-bright text-white rounded-xl font-bold hover:shadow-lg hover:shadow-teal-mid/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm uppercase tracking-wide"
                >
                  <Upload className="w-5 h-5" />
                  Upload Documents
                </button>
              </div>
            ) : (
              <>
                {/* Folders Section - Inline in main panel */}
                <FolderSection
                  folders={childFolders}
                  onFolderClick={setCurrentFolderId}
                  onRename={(folder) => {
                    setSelectedFolder({ id: folder.id, name: folder.name });
                    setShowRenameFolder(true);
                  }}
                  onDelete={handleDeleteFolder}
                  onMove={(folder) => {
                    setMoveFolderTarget(folder);
                  }}
                  onDocumentDrop={handleDocumentDrop}
                />

                {/* Documents Section Header */}
                {documents.length > 0 && (
                  <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <FileText className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                    Documents ({documents.length})
                  </h3>
                )}

                {/* Selection toolbar */}
                <div className={`flex items-center justify-between mb-4 p-3 rounded-xl transition-all ${
                  selectionMode
                    ? 'glass-card border-teal-mid/30'
                    : ''
                }`}>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={toggleSelectionMode}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all ${
                        selectionMode
                          ? 'bg-teal-mid text-white shadow-lg shadow-teal-mid/20'
                          : 'bg-white/40 hover:bg-white/60 text-navy border border-white/20'
                      }`}
                    >
                      {selectionMode ? <CheckSquare className="w-4 h-4" /> : <Square className="w-4 h-4" />}
                      {selectionMode ? 'Cancel' : 'Select'}
                    </button>

                    {selectionMode && documents.length > 0 && (
                      <>
                        <button
                          onClick={handleSelectAll}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-bold transition-all bg-white/40 hover:bg-white/60 text-navy border border-white/20 backdrop-blur-md"
                        >
                          {selectedDocuments.length === documents.length ? (
                            <>
                              <X className="w-4 h-4" />
                              Deselect All
                            </>
                          ) : (
                            <>
                              <CheckSquare className="w-4 h-4 text-teal-dark" />
                              Select All ({documents.length})
                            </>
                          )}
                        </button>

                        {selectedDocuments.length > 0 && (
                          <span className="text-sm font-medium text-slate-500 font-outfit">
                            {selectedDocuments.length} selected
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {selectionMode && selectedDocuments.length > 0 && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowBulkMoveModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all bg-blue-500/10 hover:bg-blue-500/20 text-blue-700 border border-blue-500/20 shadow-lg shadow-blue-500/10"
                      >
                        <FolderInput className="w-4 h-4" />
                        Move ({selectedDocuments.length})
                      </button>
                      <button
                        onClick={() => setShowBulkTagModal(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all bg-purple-500/10 hover:bg-purple-500/20 text-purple-700 border border-purple-500/20 shadow-lg shadow-purple-500/10"
                      >
                        <Tags className="w-4 h-4" />
                        Tags ({selectedDocuments.length})
                      </button>
                      <button
                        onClick={handleBulkDelete}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/20 shadow-lg shadow-red-500/10"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete ({selectedDocuments.length})
                      </button>
                    </div>
                  )}
                </div>

                <DocumentList
                  documents={documents}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                  onRename={(doc) => {
                    setSelectedDocument(doc);
                    setShowRenameDocument(true);
                  }}
                  onDelete={handleDeleteDocument}
                  onMove={(doc) => {
                    setSelectedDocument(doc);
                    setShowMoveDocument(true);
                  }}
                  onDownload={handleDownloadDocument}
                  onManageTags={(doc) => {
                    setSelectedDocument(doc);
                    setShowManageTags(true);
                  }}
                  onPreview={(doc) => {
                    setSelectedDocument(doc);
                    setShowPreviewModal(true);
                  }}
                  onViewVersions={(doc) => {
                    setVersionHistoryDocument(doc);
                  }}
                  onUploadNewVersion={(doc) => {
                    setUploadVersionDocument(doc);
                  }}
                  onToggleFavorite={handleToggleFavorite}
                  selectionMode={selectionMode}
                  selectedDocuments={selectedDocuments}
                  onToggleSelect={handleToggleSelect}
                />
              </>
            )}
          </div>
        </div>

      {/* Modals */}
      <CreateFolderModal
        isOpen={showCreateFolder}
        onClose={() => setShowCreateFolder(false)}
        onCreateFolder={handleCreateFolder}
        parentFolderName={currentFolderName}
      />

      <RenameFolderModal
        isOpen={showRenameFolder}
        onClose={() => {
          setShowRenameFolder(false);
          setSelectedFolder(null);
        }}
        onRenameFolder={handleRenameFolder}
        folder={selectedFolder}
      />

      <UploadDocumentModal
        isOpen={showUploadModal}
        onClose={handleUploadModalClose}
        onUpload={handleUploadDocuments}
        currentFolderName={currentFolderName}
        personalVaultId={isPersonalVault ? validatedOrgId : undefined}
        organizationId={!isPersonalVault ? validatedOrgId : undefined}
        enableOCR={true}
        onNavigateToFolder={(folderId) => setCurrentFolderId(folderId)}
        onRefresh={loadData}
        initialFiles={droppedFiles.length > 0 ? droppedFiles : undefined}
      />

      <DocumentPreviewModal
        isOpen={showPreviewModal}
        onClose={() => {
          setShowPreviewModal(false);
          setSelectedDocument(null);
        }}
        document={selectedDocument}
        onDownload={handleDownloadDocument}
      />

      <RenameDocumentModal
        isOpen={showRenameDocument}
        onClose={() => {
          setShowRenameDocument(false);
          setSelectedDocument(null);
        }}
        onRename={handleRenameDocument}
        document={selectedDocument}
      />

      <MoveDocumentModal
        isOpen={showMoveDocument}
        onClose={() => {
          setShowMoveDocument(false);
          setSelectedDocument(null);
        }}
        onMove={handleMoveDocument}
        document={selectedDocument}
        folders={folders.map(f => ({ id: f.id, name: f.name }))}
        isBusinessAccount={!isPersonalVault}
      />

      <ManageTagsModal
        isOpen={showManageTags}
        onClose={() => {
          setShowManageTags(false);
          setSelectedDocument(null);
        }}
        onSave={handleManageTags}
        document={selectedDocument}
      />

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => {
          setShowDeleteConfirm(false);
          setDeleteTarget(null);
        }}
        onConfirm={confirmDelete}
        title={
          deleteTarget?.type === 'bulk'
            ? `Delete ${(deleteTarget?.item as string[])?.length} Documents`
            : `Delete ${deleteTarget?.type === 'folder' ? 'Folder' : 'Document'}`
        }
        message={
          deleteTarget?.type === 'bulk'
            ? `Are you sure you want to delete ${(deleteTarget?.item as string[])?.length} selected documents? This action cannot be undone.`
            : `Are you sure you want to delete "${deleteTarget?.item?.name}"? This action cannot be undone.`
        }
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        loading={deleteLoading}
      />

      <DocumentScanner
        isOpen={showScanModal}
        onClose={() => setShowScanModal(false)}
        onUpload={handleScanUpload}
        maxImages={10}
        personalVaultId={isPersonalVault ? validatedOrgId : undefined}
        organizationId={!isPersonalVault ? validatedOrgId : undefined}
        vaultContext={isPersonalVault ? 'personal' : 'organization'}
        userId={user?.id}
      />

      {/* Version History Modal */}
      {versionHistoryDocument && (
        <DocumentVersionHistoryModal
          isOpen={!!versionHistoryDocument}
          document={versionHistoryDocument}
          onClose={() => setVersionHistoryDocument(null)}
          onVersionRestored={() => {
            // Refresh the documents list
            loadData();
            setVersionHistoryDocument(null);
          }}
        />
      )}

      {/* Upload New Version Modal */}
      {uploadVersionDocument && (
        <UploadNewVersionModal
          isOpen={!!uploadVersionDocument}
          document={uploadVersionDocument}
          userId={user?.id || ''}
          onClose={() => setUploadVersionDocument(null)}
          onVersionUploaded={() => {
            // Refresh the documents list
            loadData();
            setUploadVersionDocument(null);
          }}
        />
      )}

      {/* Move Folder Modal */}
      <MoveFolderModal
        isOpen={!!moveFolderTarget}
        onClose={() => setMoveFolderTarget(null)}
        onMove={handleMoveFolder}
        folder={moveFolderTarget}
        folders={folders.map(f => ({ id: f.id, name: f.name, parentId: f.parentId }))}
        isBusinessAccount={!isPersonalVault}
      />

      {/* Bulk Move Documents Modal */}
      <BulkMoveDocumentModal
        isOpen={showBulkMoveModal}
        onClose={() => setShowBulkMoveModal(false)}
        onMove={handleBulkMove}
        documentIds={selectedDocuments}
        folders={folders.map(f => ({ id: f.id, name: f.name }))}
        isBusinessAccount={!isPersonalVault}
      />

      {/* Bulk Tag Modal */}
      <BulkTagModal
        isOpen={showBulkTagModal}
        onClose={() => setShowBulkTagModal(false)}
        onApplyTags={handleBulkApplyTags}
        documents={documents.filter(doc => selectedDocuments.includes(doc.id))}
      />
    </div>
  );
}


function SharesView() {
  const { activeOrg, isPersonalVault } = useOrganization();
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  const router = useRouter();
  const { limits, currentUsage, plan } = usePlanEnforcement();
  const { showToast } = useToast();

  // Validate activeOrg ID - if corrupted, treat as null
  const validatedOrgId = isValidOrgId(activeOrg?.id) ? activeOrg?.id : undefined;

  const [shares, setShares] = React.useState<any[]>([]);
  const [copied, setCopied] = React.useState<string | null>(null);
  const [showCreateModal, setShowCreateModal] = React.useState(false);

  React.useEffect(() => {
    if (validatedOrgId) {
      loadShares();
    }
  }, [validatedOrgId]);

  const loadShares = async () => {
    try {
      const vaultParam = isPersonalVault
        ? `personalVaultId=${validatedOrgId}`
        : `organizationId=${validatedOrgId}`;

      const response = await fetch(`/api/shares?${vaultParam}`);
      const data = await response.json();
      setShares(data.shares || []);
    } catch (error) {
      console.error('Error loading shares:', error);
      setShares([]);
    }
  };

  const copyToClipboard = (url: string, token: string) => {
    navigator.clipboard.writeText(url);
    setCopied(token);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleCreateShare = async (shareData: {
    label: string;
    expiresAt: string;
    pin?: string;
    allowDownload: boolean;
    documentIds: string[];
  }) => {
    try {
      const response = await fetch('/api/shares', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...shareData,
          organizationId: isPersonalVault ? undefined : validatedOrgId,
          personalVaultId: isPersonalVault ? validatedOrgId : undefined,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create share link');
      }

      const data = await response.json();

      // Reload shares from API
      await loadShares();

      showToast(`Share link created! URL: ${data.shareUrl}`, 'success');

      // Copy share URL to clipboard
      navigator.clipboard.writeText(data.shareUrl);
      showToast('Share link copied to clipboard!', 'success');
    } catch (error) {
      console.error('Error creating share:', error);
      throw error;
    }
  };

  const handleDelete = (token: string) => {
    setShares(shares.filter(s => s.token !== token));
    showToast('Share link deleted', 'success');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const isExpired = (dateString: string) => {
    return new Date(dateString) < new Date();
  };

  const shareLimit = limits.secureShareLinks;
  const shareCount = shares.length;
  const canCreateMore = shareLimit === -1 || shareCount < Number(shareLimit);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {/* Active Links */}
        {/* Active Links */}
        <div className="glass-card relative overflow-hidden p-3 sm:p-5 transition-all duration-500 group hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-sm font-bold text-white dark:text-white font-display uppercase tracking-wider">Active Links</p>
              <p className="text-xl sm:text-3xl font-black mt-1 text-white dark:text-white font-display">
                {shares.filter(s => !isExpired(s.expiresAt)).length}
              </p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-teal-mid/20 group-hover:bg-teal-mid/30 transition-colors">
              <Link2 className="w-4 h-4 sm:w-6 sm:h-6 text-teal-dark" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-mid to-teal-bright" />
        </div>

        {/* Total Links */}
        {/* Total Links */}
        <div className="glass-card relative overflow-hidden p-3 sm:p-5 transition-all duration-500 group hover:-translate-y-1">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-sm font-bold text-white dark:text-white font-display uppercase tracking-wider">Total Links</p>
              <p className="text-xl sm:text-3xl font-black mt-1 text-white dark:text-white font-display">{shareCount}</p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-blue-500/20 group-hover:bg-blue-500/30 transition-colors">
              <Shield className="w-4 h-4 sm:w-6 sm:h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 to-blue-400" />
        </div>

        {/* Plan Limit */}
        <div className="glass-card relative overflow-hidden rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all duration-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] sm:text-sm font-bold text-white dark:text-white font-display uppercase tracking-wider">Plan Limit</p>
              <p className="text-lg sm:text-3xl font-black mt-1 text-white dark:text-white font-display">
                {shareLimit === -1 ? '∞' : `${shareCount}/${shareLimit}`}
              </p>
            </div>
            <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-purple-500/20">
              <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-purple-600" />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-purple-400" />
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-white dark:text-white font-display tracking-tight">Secure Share Links</h2>
          <p className="text-sm mt-1 text-white dark:text-slate-200 font-medium font-outfit">
            Create secure, expiring links to share documents with clients
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          disabled={!canCreateMore}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold tracking-tight btn-enhanced-primary hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">New Share Link</span>
          <span className="sm:hidden">New Link</span>
        </button>
      </div>

      {/* Shares List */}
      <div className="glass-card rounded-2xl overflow-hidden transition-all duration-500">
        {shares.length === 0 ? (
          <div className="p-16 text-center">
            <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center mb-4 bg-teal-mid/10 border border-teal-mid/20 shadow-inner">
              <Link2 className="w-10 h-10 text-teal-dark" />
            </div>
            <h3 className="text-xl font-black mb-2 text-white dark:text-white font-display">No share links yet</h3>
            <p className="text-sm mb-6 text-white/80 dark:text-slate-200 font-medium font-outfit max-w-sm mx-auto">
              Create your first secure share link to share documents with clients.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-bold hover:from-blue-400 hover:to-blue-500 transition-all shadow-lg shadow-blue-500/25 uppercase tracking-wide text-sm"
            >
              <Plus className="w-5 h-5" />
              Create Share Link
            </button>
          </div>
        ) : (
          <div className="divide-y divide-white/20">
            {shares.map((share) => {
              const expired = isExpired(share.expiresAt);
              const baseUrl = typeof window !== 'undefined'
                ? window.location.origin
                : process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
              const shareUrl = `${baseUrl}/s/${share.token}`;

              return (
                <div key={share.token} className="p-5 transition-colors hover:bg-white/5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-white dark:text-white text-lg font-display">{share.label}</h3>
                        {expired && (
                          <span className="px-2 py-0.5 bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-bold rounded-full">
                            Expired
                          </span>
                        )}
                        {share.pin && (
                          <span className="px-2 py-0.5 text-xs font-bold rounded-full flex items-center gap-1 bg-blue-500/10 border border-blue-500/20 text-blue-700">
                            <Shield className="w-3 h-3" />
                            PIN Protected
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-white/70 dark:text-slate-400 font-medium">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-white" />
                          Expires {formatDate(share.expiresAt)}
                        </span>
                        {share.allowDownload && (
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4 text-white" />
                            Downloads allowed
                          </span>
                        )}
                      </div>
                      <div className="mt-3 flex items-center gap-2">
                        <code className="text-xs px-3 py-2 rounded-lg flex-1 overflow-hidden text-ellipsis bg-white/40 border border-white/20 text-white dark:text-white font-mono">
                          {shareUrl}
                        </code>
                        <button
                          onClick={() => copyToClipboard(shareUrl, share.token)}
                          className="px-4 py-2 text-sm rounded-lg font-bold flex items-center gap-1 transition-all bg-white/10 hover:bg-white/20 text-white border border-white/30"
                        >
                          <Copy className="w-4 h-4" />
                          {copied === share.token ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(share.token)}
                      className="ml-4 p-2 rounded-lg transition-all text-slate-400 hover:text-red-600 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {!canCreateMore && (
        <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 backdrop-blur-sm">
          <p className="text-sm text-orange-700 font-medium font-outfit">
            <strong>Limit reached:</strong> You've reached your {shareLimit} share link limit on the {plan} plan.
            Upgrade to create more links.
          </p>
        </div>
      )}

      <CreateShareLinkModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateShare={handleCreateShare}
        organizationId={isPersonalVault ? undefined : validatedOrgId}
        personalVaultId={isPersonalVault ? validatedOrgId : undefined}
      />
    </div>
  );
}

function DocumentsPageContent() {
  const searchParams = useSearchParams();
  const { isDarkMode } = useTheme();
  const tab = (searchParams.get('tab') as Tab) || 'documents';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white dark:text-white font-display">Documents</h1>
        <p className="mt-2 text-white dark:text-slate-200 font-medium font-outfit">Manage documents and shares</p>
      </div>

      <DocumentsTabs />

      {tab === 'documents' && <DocumentsView />}
      {tab === 'shares' && <SharesView />}
    </div>
  );
}

export default function DocumentsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="text-gray-400">Loading documents...</div></div>}>
      <DocumentsPageContent />
    </Suspense>
  );
}
