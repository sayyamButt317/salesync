"use client";

import { AppShell } from "@/components/layout";
import { TEMPLATE_METRICS } from "@/lib/templates/data";
import type { TemplatesPageProps } from "@/lib/templates/types";
import { useTemplates } from "@/lib/templates/use-templates";
import { TemplatesHeader } from "./templates-header";
import { TemplatesMetrics } from "./templates-metrics";
import { TemplatesGrid } from "./templates-grid";

export function TemplatesPage({ activeNavId = "templates" }: TemplatesPageProps) {
  const {
    tab,
    search,
    sort,
    page,
    pageSize,
    totalItems,
    templates,
    handleTabChange,
    handleSearchChange,
    handleSortChange,
    setPage,
    handlePageSizeChange,
  } = useTemplates();

  return (
    <AppShell activeNavId={activeNavId}>
      <TemplatesHeader />
      <TemplatesMetrics metrics={TEMPLATE_METRICS} />
      <TemplatesGrid
        templates={templates}
        tab={tab}
        search={search}
        sort={sort}
        page={page}
        pageSize={pageSize}
        totalItems={totalItems}
        onTabChange={handleTabChange}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
        onPageChange={setPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </AppShell>
  );
}
