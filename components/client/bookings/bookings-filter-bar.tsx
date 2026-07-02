"use client";

import { Calendar, ChevronDown, LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { DEFAULT_DATE_RANGE } from "@/lib/client-bookings/types";

const FILTER_OPTIONS = [
  "Agents",
  "Status",
  "Meeting Type",
  "Source",
] as const;

export interface BookingsFilterBarProps {
  dateRange?: string;
  viewMode?: "list" | "grid";
  onViewModeChange?: (mode: "list" | "grid") => void;
}

export function BookingsFilterBar({
  dateRange = DEFAULT_DATE_RANGE,
  viewMode = "list",
  onViewModeChange,
}: BookingsFilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-100 px-5 py-3">
      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
      >
        <Calendar className="h-3.5 w-3.5 text-gray-400" />
        {dateRange}
      </button>

      {FILTER_OPTIONS.map((filter) => (
        <button
          key={filter}
          type="button"
          className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
        >
          {filter}
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </button>
      ))}

      <button
        type="button"
        className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
      >
        <SlidersHorizontal className="h-3 w-3" />
        More Filters
      </button>

      <div className="ml-auto flex items-center gap-0.5 rounded-lg border border-gray-200 p-0.5">
        <button
          type="button"
          onClick={() => onViewModeChange?.("list")}
          className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
            viewMode === "list"
              ? "bg-violet-50 text-violet-600"
              : "text-gray-400 hover:bg-gray-50"
          }`}
          aria-label="List view"
        >
          <List className="h-3.5 w-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onViewModeChange?.("grid")}
          className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
            viewMode === "grid"
              ? "bg-violet-50 text-violet-600"
              : "text-gray-400 hover:bg-gray-50"
          }`}
          aria-label="Grid view"
        >
          <LayoutGrid className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
