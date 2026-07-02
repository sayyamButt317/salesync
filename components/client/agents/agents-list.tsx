"use client";

import { ChevronDown, LayoutGrid, List } from "lucide-react";
import { motion } from "framer-motion";
import { Card, Tabs } from "@/components/ui";
import { SORT_OPTIONS } from "@/lib/client-agents/data";
import type { AgentRecord, AgentSort, AgentTab } from "@/lib/client-agents/types";
import { AGENT_TAB_LABELS } from "@/lib/client-agents/types";
import { useGsapStagger } from "@/lib/motion/use-gsap-stagger";
import { staggerContainer } from "@/lib/motion/variants";
import { AgentRow } from "./agent-row";

const LIST_TABS = (Object.keys(AGENT_TAB_LABELS) as AgentTab[]).map((id) => ({
  id,
  label: AGENT_TAB_LABELS[id].label,
}));

export interface AgentsListProps {
  agents: AgentRecord[];
  tab: AgentTab;
  sort: AgentSort;
  onTabChange: (tab: AgentTab) => void;
  onSortChange: (sort: AgentSort) => void;
}

export function AgentsList({
  agents,
  tab,
  sort,
  onTabChange,
  onSortChange,
}: AgentsListProps) {
  const listRef = useGsapStagger<HTMLDivElement>({
    selector: "[data-animate]",
    y: 16,
    stagger: 0.06,
    delay: 0.1,
  });

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 pt-2">
        <Tabs
          tabs={LIST_TABS}
          value={tab}
          onChange={onTabChange}
          layoutId="agents-tab"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
        <div className="relative">
          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value as AgentSort)}
            className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2 pr-9 pl-3 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-gray-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by: {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="flex items-center gap-1 rounded-lg border border-gray-200 p-0.5">
          <button
            type="button"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-violet-50 text-violet-600"
            aria-label="List view"
          >
            <List className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-50"
            aria-label="Grid view"
          >
            <LayoutGrid className="h-4 w-4" />
          </button>
        </div>
      </div>

      <motion.div
        ref={listRef}
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        key={`${tab}-${sort}`}
      >
        {agents.map((agent) => (
          <AgentRow key={agent.id} agent={agent} />
        ))}
      </motion.div>
    </Card>
  );
}
