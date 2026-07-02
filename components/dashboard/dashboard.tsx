"use client";

import { AppShell } from "@/components/layout";
import {
  ACTIVITY_FEED,
  CONVERSATION_CHART_DATA,
  DASHBOARD_METRICS,
  RECENT_CONVERSATIONS,
  TOP_AGENCIES,
} from "@/lib/dashboard/data";
import type { DashboardProps } from "@/lib/dashboard/types";
import { ActivityFeed } from "./activity-feed";
import { ConversationsOverview } from "./conversations-overview";
import { DashboardHeader } from "./dashboard-header";
import { DashboardMetrics } from "./dashboard-metrics";
import { RecentConversations } from "./recent-conversations";
import { TopAgenciesTable } from "./top-agencies-table";

export function Dashboard({ activeNavId = "dashboard" }: DashboardProps) {
  return (
    <AppShell activeNavId={activeNavId}>
      <DashboardHeader />
      <DashboardMetrics metrics={DASHBOARD_METRICS} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <ConversationsOverview data={CONVERSATION_CHART_DATA} />
          <RecentConversations conversations={RECENT_CONVERSATIONS} />
        </div>

        <div className="space-y-6">
          <TopAgenciesTable agencies={TOP_AGENCIES} />
          <ActivityFeed items={ACTIVITY_FEED} />
        </div>
      </div>
    </AppShell>
  );
}
