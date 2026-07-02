import type { LucideIcon } from "lucide-react";
import type { AgentStatus } from "@/lib/client-dashboard/types";

export type AgentTab = "all" | "active" | "training" | "paused" | "archived";

export type AgentSort = "recently-updated" | "name" | "ai-score";

export type AgentPlatform =
  | "WhatsApp"
  | "Instagram"
  | "Web"
  | "LinkedIn"
  | "Email";

export type TrendDirection = "up" | "down";

export interface AgentMetric {
  id: string;
  label: string;
  value: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend?: number;
  trendDirection?: TrendDirection;
  trendLabel?: string;
  subtext?: string;
  formatValue?: (value: number) => string;
}

export interface AgentMetricStat {
  label: string;
  value: number;
  trend: number;
  trendDirection: TrendDirection;
}

export interface AgentRecord {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  isPrimary?: boolean;
  status: AgentStatus | "Archived";
  platforms: AgentPlatform[];
  leads: AgentMetricStat;
  conversations: AgentMetricStat;
  thirdMetric: AgentMetricStat;
  aiScore: number;
  sparkline: number[];
  lastUpdated: string;
}

export interface AgentHealthSegment {
  label: string;
  value: number;
  color: string;
}

export interface TopPerformingAgentInfo {
  name: string;
  aiScore: number;
  leadsGenerated: number;
  revenueInfluenced: string;
}

export interface AgentsPageProps {
  activeNavId?: string;
}

export const AGENT_TAB_LABELS: Record<AgentTab, { label: string }> = {
  all: { label: "All Agents" },
  active: { label: "Active" },
  training: { label: "Training" },
  paused: { label: "Paused" },
  archived: { label: "Archived" },
};

export const TAB_TO_STATUS: Partial<
  Record<AgentTab, AgentRecord["status"]>
> = {
  active: "Active",
  training: "Training",
  paused: "Paused",
  archived: "Archived",
};
