"use client";

import { AppShell } from "@/components/layout";
import {
  ACTIVITY_CHART_DATA,
  CHANNEL_SEGMENTS,
  CHANNEL_TOTAL,
  PERFORMANCE_STATS,
  REPLY_RATE_SUMMARY,
  REPORT_METRICS,
  TOP_CAMPAIGNS,
} from "@/lib/reports/data";
import type { ReportsPageProps } from "@/lib/reports/types";
import { ReportsHeader } from "./reports-header";
import { ReportsMetrics } from "./reports-metrics";
import { ActivityOverviewChart } from "./activity-overview-chart";
import { ChannelPerformanceCard } from "./channel-performance-card";
import { TopCampaignsTable } from "./top-campaigns-table";
import { ReplyRateCard } from "./reply-rate-card";
import { PerformanceSummaryCard } from "./performance-summary-card";

export function ReportsPage({ activeNavId = "reports" }: ReportsPageProps) {
  return (
    <AppShell activeNavId={activeNavId}>
      <ReportsHeader />
      <ReportsMetrics metrics={REPORT_METRICS} />

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <ActivityOverviewChart data={ACTIVITY_CHART_DATA} />
        </div>
        <div>
          <ChannelPerformanceCard
            segments={CHANNEL_SEGMENTS}
            total={CHANNEL_TOTAL}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TopCampaignsTable campaigns={TOP_CAMPAIGNS} />
        </div>
        <div className="space-y-6">
          <ReplyRateCard summary={REPLY_RATE_SUMMARY} />
          <PerformanceSummaryCard stats={PERFORMANCE_STATS} />
        </div>
      </div>
    </AppShell>
  );
}
