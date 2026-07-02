"use client";

import { ChevronDown, LayoutGrid, List, Search } from "lucide-react";
import { FILTER_DROPDOWNS } from "@/lib/knowledge-base/data";

export interface DocumentsToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
  viewMode: "list" | "grid";
  onViewModeChange: (mode: "list" | "grid") => void;
}

export function DocumentsToolbar({
  search,
  onSearchChange,
  viewMode,
  onViewModeChange,
}: DocumentsToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-5 py-3">
      {FILTER_DROPDOWNS.map((filter) => (
        <button
          key={filter}
          type="button"
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          {filter}
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </button>
      ))}

      <div className="relative ml-auto w-52 max-w-full">
        <Search className="pointer-events-none absolute top-1/2 left-3 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search documents..."
          className="w-full rounded-lg border border-gray-200 bg-white py-1.5 pr-3 pl-8 text-xs outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
        />
      </div>

      <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 p-0.5">
        <button
          type="button"
          onClick={() => onViewModeChange("grid")}
          className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
            viewMode === "grid"
              ? "bg-violet-50 text-violet-600"
              : "text-gray-400 hover:bg-gray-50"
          }`}
          aria-label="Grid view"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange("list")}
          className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
            viewMode === "list"
              ? "bg-violet-50 text-violet-600"
              : "text-gray-400 hover:bg-gray-50"
          }`}
          aria-label="List view"
        >
          <List className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
