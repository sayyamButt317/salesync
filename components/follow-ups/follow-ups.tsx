"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout";
import {
  FOLLOW_UP_METRICS,
  FOLLOW_UP_RECORDS,
  FOLLOW_UP_SUMMARY,
  SMART_SUGGESTIONS,
  TOTAL_FOLLOW_UPS_COUNT,
  UPCOMING_FOLLOW_UPS,
} from "@/lib/follow-ups/data";
import type { FollowUpTab, FollowUpsPageProps } from "@/lib/follow-ups/types";
import { filterFollowUps } from "@/lib/follow-ups/utils";
import { FollowUpsHeader } from "./follow-ups-header";
import { FollowUpsMetrics } from "./follow-ups-metrics";
import { FollowUpsTable } from "./follow-ups-table";
import { FollowUpSummaryCard } from "./follow-up-summary-card";
import { SmartSuggestions } from "./smart-suggestions";
import { UpcomingFollowUps } from "./upcoming-follow-ups";
import { AutomateFollowUpsCard } from "./automate-follow-ups-card";

export function FollowUpsPage({ activeNavId = "follow-ups" }: FollowUpsPageProps) {
  const [tab, setTab] = useState<FollowUpTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);

  const filtered = useMemo(
    () => filterFollowUps(FOLLOW_UP_RECORDS, tab, search),
    [tab, search],
  );

  const totalItems =
    search || tab !== "all" ? filtered.length : TOTAL_FOLLOW_UPS_COUNT;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const handleTabChange = (nextTab: FollowUpTab) => {
    setTab(nextTab);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <AppShell activeNavId={activeNavId}>
      <FollowUpsHeader />
      <FollowUpsMetrics metrics={FOLLOW_UP_METRICS} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <FollowUpsTable
            records={paginated}
            tab={tab}
            search={search}
            page={safePage}
            pageSize={pageSize}
            totalItems={totalItems}
            onTabChange={handleTabChange}
            onSearchChange={handleSearchChange}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>

        <div className="space-y-6">
          <FollowUpSummaryCard segments={FOLLOW_UP_SUMMARY} />
          <SmartSuggestions suggestions={SMART_SUGGESTIONS} />
          <UpcomingFollowUps items={UPCOMING_FOLLOW_UPS} />
          <AutomateFollowUpsCard />
        </div>
      </div>
    </AppShell>
  );
}
