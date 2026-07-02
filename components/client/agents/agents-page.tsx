"use client";

import { useMemo, useState } from "react";
import { ClientShell } from "@/components/client/layout";
import {
  AGENT_HEALTH_SEGMENTS,
  AGENT_HEALTH_TOTAL,
  AGENT_METRICS,
  AGENT_RECORDS,
  TOP_PERFORMING_AGENT,
} from "@/lib/client-agents/data";
import type { AgentSort, AgentTab, AgentsPageProps } from "@/lib/client-agents/types";
import { filterAgents, sortAgents } from "@/lib/client-agents/utils";
import { AgentsHeader } from "./agents-header";
import { AgentsMetrics } from "./agents-metrics";
import { AgentsList } from "./agents-list";
import {
  AgentHealthOverview,
  CreateAgentWidget,
  NeedHelpWidget,
  TopPerformingAgentWidget,
} from "./agents-sidebar-widgets";

export function AgentsPage({ activeNavId = "agents" }: AgentsPageProps) {
  const [tab, setTab] = useState<AgentTab>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<AgentSort>("recently-updated");

  const filtered = useMemo(() => {
    const results = filterAgents(AGENT_RECORDS, tab, search);
    return sortAgents(results, sort);
  }, [tab, search, sort]);

  return (
    <ClientShell activeNavId={activeNavId}>
      <AgentsHeader search={search} onSearchChange={setSearch} />
      <AgentsMetrics metrics={AGENT_METRICS} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AgentsList
            agents={filtered}
            tab={tab}
            sort={sort}
            onTabChange={setTab}
            onSortChange={setSort}
          />
        </div>

        <div className="space-y-6">
          <CreateAgentWidget />
          <AgentHealthOverview
            segments={AGENT_HEALTH_SEGMENTS}
            total={AGENT_HEALTH_TOTAL}
          />
          <TopPerformingAgentWidget {...TOP_PERFORMING_AGENT} />
          <NeedHelpWidget />
        </div>
      </div>
    </ClientShell>
  );
}
