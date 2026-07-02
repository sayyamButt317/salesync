"use client";

import { ClientShell } from "@/components/client/layout";
import {
  AI_SCORE_LABEL,
  AI_SCORE_METRICS,
  AI_SCORE_OVERALL,
  CLIENT_DASHBOARD_METRICS,
  CLIENT_RECENT_CONVERSATIONS,
  PERFORMANCE_CHART_DATA,
  TOP_AGENTS,
  UPCOMING_BOOKINGS,
} from "@/lib/client-dashboard/data";
import type { ClientDashboardPageProps } from "@/lib/client-dashboard/types";
import { ClientDashboardHeader } from "./client-dashboard-header";
import { ClientDashboardMetrics } from "./client-dashboard-metrics";
import { PerformanceOverviewChart } from "./performance-overview-chart";
import { AIPerformanceCard } from "./ai-performance-card";
import { TopAgentsTable } from "./top-agents-table";
import { UpcomingBookingsWidget } from "./upcoming-bookings-widget";
import { ClientRecentConversations } from "./client-recent-conversations";

export function ClientDashboard({
  activeNavId = "dashboard",
  userName = "Sajam",
}: ClientDashboardPageProps) {
  return (
    <ClientShell activeNavId={activeNavId}>
      <ClientDashboardHeader userName={userName} />
      <ClientDashboardMetrics metrics={CLIENT_DASHBOARD_METRICS} />

      <div className="mb-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <PerformanceOverviewChart data={PERFORMANCE_CHART_DATA} />
        </div>
        <div>
          <AIPerformanceCard
            score={AI_SCORE_OVERALL}
            label={AI_SCORE_LABEL}
            metrics={AI_SCORE_METRICS}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TopAgentsTable agents={TOP_AGENTS} />
        </div>
        <div className="space-y-6">
          <UpcomingBookingsWidget bookings={UPCOMING_BOOKINGS} />
          <ClientRecentConversations
            conversations={CLIENT_RECENT_CONVERSATIONS}
          />
        </div>
      </div>
    </ClientShell>
  );
}
