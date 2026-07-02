"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout";
import {
  PITCH_METRICS,
  PITCH_PERFORMANCE,
  PITCH_RECORDS,
  REPLY_RATE_DATA,
  TOP_PERFORMING_PITCHES,
  TOTAL_PITCHES_COUNT,
} from "@/lib/pitches/data";
import type { PitchTab, PitchesPageProps } from "@/lib/pitches/types";
import { filterPitches } from "@/lib/pitches/utils";
import { PitchesHeader } from "./pitches-header";
import { PitchesMetrics } from "./pitches-metrics";
import { PitchesTable } from "./pitches-table";
import { PitchPerformanceCard } from "./pitch-performance-card";
import { ReplyRateChart } from "./reply-rate-chart";
import { TopPerformingPitches } from "./top-performing-pitches";

export function PitchesPage({ activeNavId = "pitches" }: PitchesPageProps) {
  const [tab, setTab] = useState<PitchTab>("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);

  const filtered = useMemo(
    () => filterPitches(PITCH_RECORDS, tab, search),
    [tab, search],
  );

  const totalItems = search || tab !== "all" ? filtered.length : TOTAL_PITCHES_COUNT;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const handleTabChange = (nextTab: PitchTab) => {
    setTab(nextTab);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <AppShell activeNavId={activeNavId}>
      <PitchesHeader />
      <PitchesMetrics metrics={PITCH_METRICS} />
      <PitchesTable
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

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <PitchPerformanceCard segments={PITCH_PERFORMANCE} />
        <ReplyRateChart data={REPLY_RATE_DATA} />
        <TopPerformingPitches pitches={TOP_PERFORMING_PITCHES} />
      </div>
    </AppShell>
  );
}
