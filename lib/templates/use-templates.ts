"use client";

import { useMemo, useState } from "react";
import { TEMPLATE_RECORDS } from "@/lib/templates/data";
import type { TemplateSort, TemplateTab } from "@/lib/templates/types";
import { TOTAL_TEMPLATES_COUNT } from "@/lib/templates/types";
import { filterTemplates, sortTemplates } from "@/lib/templates/utils";

export interface UseTemplatesOptions {
  initialTab?: TemplateTab;
  initialSort?: TemplateSort;
  initialPageSize?: number;
}

export function useTemplates({
  initialTab = "all",
  initialSort = "newest",
  initialPageSize = 12,
}: UseTemplatesOptions = {}) {
  const [tab, setTab] = useState<TemplateTab>(initialTab);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<TemplateSort>(initialSort);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const filtered = useMemo(() => {
    const results = filterTemplates(TEMPLATE_RECORDS, tab, search);
    return sortTemplates(results, sort);
  }, [tab, search, sort]);

  const totalItems =
    search || tab !== "all" ? filtered.length : TOTAL_TEMPLATES_COUNT;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const handleTabChange = (nextTab: TemplateTab) => {
    setTab(nextTab);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (nextSort: TemplateSort) => {
    setSort(nextSort);
    setPage(1);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  return {
    tab,
    search,
    sort,
    page: safePage,
    pageSize,
    totalItems,
    totalPages,
    templates: paginated,
    handleTabChange,
    handleSearchChange,
    handleSortChange,
    setPage,
    handlePageSizeChange,
  };
}
