'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Search, Folder, FolderOpen, FileText, ChevronRight, ChevronDown, HelpCircle } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { parseSearchQuery, matchesSearch } from '@/lib/search-utils';

interface Document {
  id: string;
  name: string;
  type: string;
  sizeBytes: number;
  folderId?: string | null;
}

interface FolderData {
  id: string;
  name: string;
  parentId: string | null;
  children?: FolderData[];
}

interface DocumentPickerProps {
  organizationId?: string;
  personalVaultId?: string;
  selectedDocIds: Set<string>;
  onSelectionChange: (docIds: Set<string>) => void;
}

export default function DocumentPicker({
  organizationId,
  personalVaultId,
  selectedDocIds,
  onSelectionChange,
}: DocumentPickerProps) {
  const { isDarkMode } = useTheme();
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const vaultName = organizationId ? 'Business Vault' : 'My Vault';

  // Load folders on mount
  useEffect(() => {
    loadFolders();
  }, [organizationId, personalVaultId]);

  // Load documents when folder changes
  useEffect(() => {
    loadDocuments();
  }, [currentFolderId, organizationId, personalVaultId]);

  const loadFolders = async () => {
    try {
      const vaultParam = personalVaultId
        ? `personalVaultId=${personalVaultId}`
        : `organizationId=${organizationId}`;

      // Include all nested folders for tree building
      const response = await fetch(`/api/folders?${vaultParam}&includeAll=true`);
      const data = await response.json();
      setFolders(data.folders || []);
    } catch (err) {
      console.error('Error loading folders:', err);
    }
  };

  const loadDocuments = async () => {
    try {
      setLoading(true);
      const vaultParam = personalVaultId
        ? `personalVaultId=${personalVaultId}`
        : `organizationId=${organizationId}`;

      const folderParam = currentFolderId
        ? `&folderId=${currentFolderId}`
        : '&rootOnly=true';

      const response = await fetch(`/api/documents?${vaultParam}${folderParam}`);
      const data = await response.json();
      setDocuments(data.documents || []);
    } catch (err) {
      console.error('Error loading documents:', err);
    } finally {
      setLoading(false);
    }
  };

  // Build tree structure
  const buildTree = (folders: FolderData[]): FolderData[] => {
    const folderMap = new Map<string, FolderData>();
    const rootFolders: FolderData[] = [];

    folders.forEach((folder) => {
      folderMap.set(folder.id, { ...folder, children: [] });
    });

    folders.forEach((folder) => {
      const node = folderMap.get(folder.id)!;
      if (folder.parentId && folderMap.has(folder.parentId)) {
        const parent = folderMap.get(folder.parentId)!;
        parent.children!.push(node);
      } else {
        rootFolders.push(node);
      }
    });

    return rootFolders;
  };

  const folderTree = buildTree(folders);

  // Filter documents by search query (supports +/- operators)
  const filteredDocuments = useMemo(() => {
    if (!searchQuery.trim()) return documents;
    const parsed = parseSearchQuery(searchQuery);
    return documents.filter(doc => matchesSearch(doc.name, undefined, parsed));
  }, [documents, searchQuery]);

  const toggleDocument = (docId: string) => {
    const newSet = new Set(selectedDocIds);
    if (newSet.has(docId)) {
      newSet.delete(docId);
    } else {
      newSet.add(docId);
    }
    onSelectionChange(newSet);
  };

  const selectAllInFolder = () => {
    const newSelection = new Set(selectedDocIds);
    filteredDocuments.forEach(doc => newSelection.add(doc.id));
    onSelectionChange(newSelection);
  };

  const deselectAllInFolder = () => {
    const newSelection = new Set(selectedDocIds);
    filteredDocuments.forEach(doc => newSelection.delete(doc.id));
    onSelectionChange(newSelection);
  };

  const toggleFolderExpand = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  // PostgreSQL returns BIGINT as string, so we handle both number and string inputs
  const formatFileSize = (bytes: number | string) => {
    const numBytes = typeof bytes === 'string' ? parseInt(bytes, 10) : bytes;
    if (!numBytes || numBytes === 0 || isNaN(numBytes)) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.min(Math.floor(Math.log(numBytes) / Math.log(k)), sizes.length - 1);
    return parseFloat((numBytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  // Render folder tree node
  const renderFolderNode = (folder: FolderData, depth: number = 0) => {
    const isExpanded = expandedFolders.has(folder.id);
    const isSelected = currentFolderId === folder.id;
    const hasChildren = folder.children && folder.children.length > 0;

    return (
      <div key={folder.id}>
        <div
          className={`flex items-center gap-1 px-2 py-1.5 rounded cursor-pointer ${
            isSelected
              ? isDarkMode
                ? 'bg-blue-900/40 hover:bg-blue-900/50'
                : 'bg-blue-50 hover:bg-blue-100'
              : isDarkMode
                ? 'hover:bg-slate-700'
                : 'hover:bg-gray-100'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (hasChildren) toggleFolderExpand(folder.id);
            }}
            className={`p-0.5 rounded ${isDarkMode ? 'hover:bg-slate-600' : 'hover:bg-gray-200'}`}
          >
            {hasChildren ? (
              isExpanded ? (
                <ChevronDown className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
              ) : (
                <ChevronRight className={`w-4 h-4 ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`} />
              )
            ) : (
              <div className="w-4 h-4" />
            )}
          </button>

          <div
            onClick={() => {
              setCurrentFolderId(folder.id);
              // Also expand the folder when clicking on the name
              if (hasChildren && !isExpanded) {
                toggleFolderExpand(folder.id);
              }
            }}
            className="flex items-center gap-2 flex-1"
          >
            {isExpanded ? (
              <FolderOpen className="w-4 h-4 text-blue-500" />
            ) : (
              <Folder className="w-4 h-4 text-blue-500" />
            )}
            <span className={`text-sm ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>
              {folder.name}
            </span>
          </div>
        </div>

        {isExpanded && hasChildren && (
          <div>
            {folder.children!.map((child) => renderFolderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const allSelected = filteredDocuments.length > 0 &&
    filteredDocuments.every(doc => selectedDocIds.has(doc.id));
  const someSelected = filteredDocuments.some(doc => selectedDocIds.has(doc.id)) && !allSelected;

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Left: Folder Tree */}
      <div className={`col-span-4 border rounded-lg p-3 max-h-96 overflow-y-auto ${
        isDarkMode ? 'border-slate-600 bg-slate-700/50 scrollbar-dark' : 'border-gray-300 bg-white'
      }`}>
        <h3 className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
          Folders
        </h3>
        <div className="space-y-0.5">
          {/* Root "My Vault" option */}
          <div
            onClick={() => setCurrentFolderId(null)}
            className={`flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer ${
              currentFolderId === null
                ? isDarkMode
                  ? 'bg-blue-900/40 hover:bg-blue-900/50'
                  : 'bg-blue-50 hover:bg-blue-100'
                : isDarkMode
                  ? 'hover:bg-slate-700'
                  : 'hover:bg-gray-100'
            }`}
          >
            <Folder className="w-4 h-4 text-blue-500 ml-5" />
            <span className={`text-sm font-medium ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>
              {vaultName}
            </span>
          </div>

          {/* Folder tree */}
          {folderTree.map((folder) => renderFolderNode(folder))}
        </div>
      </div>

      {/* Right: Documents */}
      <div className="col-span-8">
        {/* Search */}
        <div className="flex items-center gap-2 mb-3">
          <div className="relative flex-1">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-slate-400' : 'text-gray-400'
            }`} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search documents..."
              className={`w-full pl-10 pr-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isDarkMode
                  ? 'bg-slate-700 border-slate-600 text-white placeholder-slate-400'
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>
          {/* Search Help Tooltip */}
          <div className="relative group">
            <HelpCircle className={`w-4 h-4 cursor-help ${isDarkMode ? 'text-slate-400 hover:text-slate-300' : 'text-gray-400 hover:text-gray-600'}`} />
            <div className={`absolute right-0 top-6 hidden group-hover:block rounded-lg p-2 w-44 z-50 shadow-lg text-xs ${
              isDarkMode ? 'bg-slate-800 text-slate-200 border border-slate-700' : 'bg-gray-900 text-white'
            }`}>
              <p className="font-semibold mb-1">Search tips:</p>
              <p className="mb-0.5">• <code className="bg-black/30 px-1 rounded">a+b</code> = both required</p>
              <p className="mb-0.5">• <code className="bg-black/30 px-1 rounded">a-b</code> = exclude b</p>
              <p>• <code className="bg-black/30 px-1 rounded">a b</code> = either matches</p>
            </div>
          </div>
        </div>

        {/* Bulk selection buttons */}
        <div className="flex items-center justify-between mb-2">
          <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
            {filteredDocuments.length} document{filteredDocuments.length !== 1 ? 's' : ''} in this folder
          </p>
          <div className="flex gap-2">
            <button
              onClick={selectAllInFolder}
              disabled={allSelected || filteredDocuments.length === 0}
              className={`text-xs hover:text-blue-700 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'text-blue-400 disabled:text-slate-500'
                  : 'text-blue-600 disabled:text-gray-400'
              }`}
            >
              Select All
            </button>
            <button
              onClick={deselectAllInFolder}
              disabled={!someSelected && !allSelected}
              className={`text-xs hover:text-blue-700 disabled:cursor-not-allowed ${
                isDarkMode
                  ? 'text-blue-400 disabled:text-slate-500'
                  : 'text-blue-600 disabled:text-gray-400'
              }`}
            >
              Deselect All
            </button>
          </div>
        </div>

        {/* Document list */}
        <div className={`border rounded-lg max-h-80 overflow-y-auto ${
          isDarkMode ? 'border-slate-600 bg-slate-700/50 scrollbar-dark' : 'border-gray-300 bg-white'
        }`}>
          {loading ? (
            <div className={`p-8 text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              Loading documents...
            </div>
          ) : filteredDocuments.length === 0 ? (
            <div className={`p-8 text-center text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
              {searchQuery ? 'No documents match your search' : 'No documents in this folder'}
            </div>
          ) : (
            <div className={`divide-y ${isDarkMode ? 'divide-slate-600' : 'divide-gray-200'}`}>
              {filteredDocuments.map((doc) => (
                <label
                  key={doc.id}
                  className={`flex items-center gap-3 p-3 cursor-pointer ${
                    isDarkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedDocIds.has(doc.id)}
                    onChange={() => toggleDocument(doc.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <FileText className={`w-4 h-4 flex-shrink-0 ${isDarkMode ? 'text-slate-400' : 'text-gray-400'}`} />
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isDarkMode ? 'text-slate-200' : 'text-gray-900'}`}>
                      {doc.name}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                      {formatFileSize(doc.sizeBytes)}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
