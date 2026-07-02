"use client";

import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { Card, Pagination, Tabs, TemplateCard } from "@/components/ui";
import type { TemplateRecord, TemplateSort, TemplateTab } from "@/lib/templates/types";
import { TEMPLATE_TAB_LABELS } from "@/lib/templates/types";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";

const GRID_TABS = (Object.keys(TEMPLATE_TAB_LABELS) as TemplateTab[]).map(
  (id) => ({
    id,
    label: TEMPLATE_TAB_LABELS[id].label,
  }),
);

const SORT_OPTIONS: { value: TemplateSort; label: string }[] = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "name", label: "Name A–Z" },
];

export interface TemplatesGridProps {
  templates: TemplateRecord[];
  tab: TemplateTab;
  search: string;
  sort: TemplateSort;
  page: number;
  pageSize: number;
  totalItems: number;
  onTabChange: (tab: TemplateTab) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: TemplateSort) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function TemplatesGrid({
  templates,
  tab,
  search,
  sort,
  page,
  pageSize,
  totalItems,
  onTabChange,
  onSearchChange,
  onSortChange,
  onPageChange,
  onPageSizeChange,
}: TemplatesGridProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(
    templates.length,
    true,
    "[data-stagger-card]",
  );

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 pt-2">
        <Tabs
          tabs={GRID_TABS}
          value={tab}
          onChange={onTabChange}
          layoutId="template-tab"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
        <div className="relative max-w-sm min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-4 w-4 text-gray-400" />
            Filters
          </button>

          <div className="relative">
            <select
              value={sort}
              onChange={(event) =>
                onSortChange(event.target.value as TemplateSort)
              }
              className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2 pr-9 pl-3 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-gray-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div ref={gridRef} className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        itemLabel="templates"
      />
    </Card>
  );
}
