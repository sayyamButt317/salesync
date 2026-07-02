"use client";

import { useMemo, useState } from "react";
import { ClientShell } from "@/components/client/layout";
import {
  KB_DOCUMENTS,
  KB_EXTRA_TAG_COUNT,
  KB_METRICS,
  KB_OVERVIEW_SEGMENTS,
  KB_QUICK_ACTIONS,
  KB_RECENT_ACTIVITY,
  KB_TOP_TAGS,
} from "@/lib/knowledge-base/data";
import type {
  KbSort,
  KbTab,
  KnowledgeBasePageProps,
} from "@/lib/knowledge-base/types";
import { TOTAL_DOCUMENTS_COUNT } from "@/lib/knowledge-base/types";
import { filterDocuments, sortDocuments } from "@/lib/knowledge-base/utils";
import { KnowledgeBaseHeader } from "./knowledge-base-header";
import { KnowledgeBaseMetrics } from "./knowledge-base-metrics";
import { DocumentsTable } from "./documents-table";
import { KnowledgeOverviewCard } from "./knowledge-overview-card";
import { TopTagsCard } from "./top-tags-card";
import { RecentActivityCard } from "./recent-activity-card";
import { QuickActionsCard } from "./quick-actions-card";
import { ImproveBanner } from "./improve-banner";

export function KnowledgeBasePage({
  activeNavId = "knowledge",
}: KnowledgeBasePageProps) {
  const [tab, setTab] = useState<KbTab>("all");
  const [headerSearch, setHeaderSearch] = useState("");
  const [tableSearch, setTableSearch] = useState("");
  const [sort] = useState<KbSort>("recent");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const search = headerSearch || tableSearch;

  const filtered = useMemo(() => {
    const results = filterDocuments(KB_DOCUMENTS, tab, search);
    return sortDocuments(results, sort);
  }, [tab, search, sort]);

  const totalItems =
    search || tab !== "all" ? filtered.length : TOTAL_DOCUMENTS_COUNT;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  return (
    <ClientShell activeNavId={activeNavId}>
      <KnowledgeBaseHeader
        search={headerSearch}
        onSearchChange={(value) => {
          setHeaderSearch(value);
          setPage(1);
        }}
      />
      <KnowledgeBaseMetrics metrics={KB_METRICS} />

      <div className="flex flex-col gap-6 xl:flex-row">
        <div className="min-w-0 flex-1">
          <DocumentsTable
            documents={paginated}
            tab={tab}
            tableSearch={tableSearch}
            sort={sort}
            page={safePage}
            pageSize={pageSize}
            totalItems={totalItems}
            onTabChange={(nextTab) => {
              setTab(nextTab);
              setPage(1);
            }}
            onTableSearchChange={(value) => {
              setTableSearch(value);
              setPage(1);
            }}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
          <ImproveBanner />
        </div>

        <aside className="flex w-full shrink-0 flex-col gap-6 xl:w-80 2xl:w-96">
          <KnowledgeOverviewCard
            segments={KB_OVERVIEW_SEGMENTS}
            totalDocuments={TOTAL_DOCUMENTS_COUNT}
          />
          <TopTagsCard tags={KB_TOP_TAGS} extraCount={KB_EXTRA_TAG_COUNT} />
          <RecentActivityCard activity={KB_RECENT_ACTIVITY} />
          <QuickActionsCard actions={KB_QUICK_ACTIONS} />
        </aside>
      </div>
    </ClientShell>
  );
}
