"use client";

import { useState } from "react";
import { Search, Download, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  title: string;
  description?: string;
  columns: Column<T>[];
  data: T[];
  searchable?: boolean;
  searchKeys?: (keyof T)[];
  action?: React.ReactNode;
}

export function DataTable<T extends Record<string, unknown>>({
  title,
  description,
  columns,
  data,
  searchable = true,
  searchKeys = [],
  action,
}: DataTableProps<T>) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const filtered = search
    ? data.filter((row) =>
        searchKeys.some((k) =>
          String(row[k] ?? "").toLowerCase().includes(search.toLowerCase())
        )
      )
    : data;

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const downloadCSV = () => {
    const header = columns.map((c) => c.label).join(",");
    const rows = data.map((row) =>
      columns
        .map((c) => {
          const val = row[c.key as keyof T];
          return `"${String(val ?? "").replace(/"/g, '""')}"`;
        })
        .join(",")
    );
    const csv = [header, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, "-")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border flex-wrap">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold">{title}</h3>
          {description && <p className="text-sm text-muted-foreground mt-0.5">{description}</p>}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          {searchable && (
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                placeholder="Search…"
                className="pl-8 h-8 w-48 text-sm"
              />
            </div>
          )}
          <Button variant="outline" size="sm" onClick={downloadCSV} className="h-8 gap-1.5">
            <Download className="w-3.5 h-3.5" />
            CSV
          </Button>
          {action}
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/30">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={cn("text-left px-5 py-2.5 text-xs font-medium text-muted-foreground uppercase tracking-wider whitespace-nowrap", col.className)}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {paged.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-12 text-center text-muted-foreground">
                  No results found.
                </td>
              </tr>
            ) : (
              paged.map((row, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors cursor-pointer">
                  {columns.map((col) => (
                    <td key={String(col.key)} className={cn("px-5 py-3", col.className)}>
                      {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "")}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20 text-sm text-muted-foreground">
        <span>
          {filtered.length === 0 ? "0" : `${(page - 1) * PAGE_SIZE + 1}–${Math.min(page * PAGE_SIZE, filtered.length)}`} of {filtered.length} rows
        </span>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="px-2 text-xs">
            Page {page} / {totalPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
