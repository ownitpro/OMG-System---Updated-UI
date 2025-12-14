"use client";

import React, { useState, useMemo } from "react";
import { cn } from "@/lib/utils";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (row: T) => string;
  searchable?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
  selectable?: boolean;
  expandable?: boolean;
  renderExpandable?: (row: T) => React.ReactNode;
  actions?: (row: T) => React.ReactNode;
  loading?: boolean;
  emptyMessage?: string;
  className?: string;
  onRowClick?: (row: T) => void;
}

type SortDirection = "asc" | "desc" | null;

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  keyExtractor,
  searchable = true,
  searchPlaceholder = "Search...",
  pagination = true,
  pageSize = 10,
  selectable = false,
  expandable = false,
  renderExpandable,
  actions,
  loading = false,
  emptyMessage = "No data available",
  className,
  onRowClick,
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const value = row[col.key];
        return value?.toString().toLowerCase().includes(searchQuery.toLowerCase());
      })
    );
  }, [data, searchQuery, columns]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];
      if (aValue === bValue) return 0;
      const comparison = aValue > bValue ? 1 : -1;
      return sortDirection === "asc" ? comparison : -comparison;
    });
  }, [filteredData, sortColumn, sortDirection]);

  // Paginate data
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortColumn(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map((row) => keyExtractor(row))));
    }
  };

  const handleSelectRow = (rowKey: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowKey)) {
      newSelected.delete(rowKey);
    } else {
      newSelected.add(rowKey);
    }
    setSelectedRows(newSelected);
  };

  const handleToggleExpand = (rowKey: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowKey)) {
      newExpanded.delete(rowKey);
    } else {
      newExpanded.add(rowKey);
    }
    setExpandedRows(newExpanded);
  };

  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-100 rounded animate-pulse"></div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search and Filters */}
      {searchable && (
        <div className="flex items-center space-x-2">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder={searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto admin-scrollbar">
        <div className="rounded-lg border border-gray-200 bg-white admin-card shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                {selectable && (
                  <TableHead className="w-12">
                    <input
                      type="checkbox"
                      checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                  </TableHead>
                )}
                {expandable && <TableHead className="w-12"></TableHead>}
                {columns.map((column) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      "font-semibold text-gray-700 bg-gray-50/50",
                      column.sortable && "cursor-pointer hover:bg-gray-100 transition-colors duration-200",
                      column.className
                    )}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{column.label}</span>
                      {column.sortable && (
                        <span className="flex flex-col">
                          {sortColumn === column.key ? (
                            sortDirection === "asc" ? (
                              <ChevronUpIcon className="h-3.5 w-3.5 text-primary-600" />
                            ) : (
                              <ChevronDownIcon className="h-3.5 w-3.5 text-primary-600" />
                            )
                          ) : (
                            <div className="flex flex-col opacity-30">
                              <ChevronUpIcon className="h-3 w-3 -mb-0.5" />
                              <ChevronDownIcon className="h-3 w-3" />
                            </div>
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
                {actions && <TableHead className="w-12"></TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (actions ? 1 : 0)}
                    className="text-center py-12"
                  >
                    <div className="text-gray-500">{emptyMessage}</div>
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row) => {
                  const rowKey = keyExtractor(row);
                  const isExpanded = expandedRows.has(rowKey);
                  const isSelected = selectedRows.has(rowKey);

                  return (
                    <React.Fragment key={rowKey}>
                      <TableRow
                        className={cn(
                          "admin-table-row hover:bg-gray-50/80 transition-all duration-200 border-b border-gray-100",
                          isSelected && "bg-primary-50 border-primary-200",
                          onRowClick && "cursor-pointer hover:shadow-sm"
                        )}
                        onClick={() => onRowClick?.(row)}
                      >
                        {selectable && (
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => handleSelectRow(rowKey)}
                              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                            />
                          </TableCell>
                        )}
                        {expandable && (
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleToggleExpand(rowKey)}
                              className="h-8 w-8 p-0"
                            >
                              {isExpanded ? (
                                <ChevronDownIcon className="h-4 w-4" />
                              ) : (
                                <ChevronRightIcon className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        )}
                        {columns.map((column) => (
                          <TableCell key={column.key} className={column.className}>
                            {column.render
                              ? column.render(row[column.key], row)
                              : row[column.key]?.toString() || "-"}
                          </TableCell>
                        ))}
                        {actions && (
                          <TableCell onClick={(e) => e.stopPropagation()}>
                            {actions(row)}
                          </TableCell>
                        )}
                      </TableRow>
                      {expandable && isExpanded && renderExpandable && (
                        <TableRow>
                          <TableCell
                            colSpan={columns.length + (selectable ? 1 : 0) + (expandable ? 1 : 0) + (actions ? 1 : 0)}
                            className="bg-gray-50"
                          >
                            {renderExpandable(row)}
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {paginatedData.length === 0 ? (
          <div className="text-center py-12 text-gray-500">{emptyMessage}</div>
        ) : (
          paginatedData.map((row) => {
            const rowKey = keyExtractor(row);
            return (
              <div
                key={rowKey}
                className="rounded-lg border border-gray-200 bg-white p-4 space-y-3"
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <div key={column.key} className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-500">{column.label}:</span>
                    <span className="text-sm text-gray-900 text-right flex-1 ml-4">
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]?.toString() || "-"}
                    </span>
                  </div>
                ))}
                {actions && (
                  <div className="pt-2 border-t border-gray-200">{actions(row)}</div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of {sortedData.length} results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-1">
              {[...Array(Math.min(5, totalPages))].map((_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-10"
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

