import type { LucideIcon } from "lucide-react";

export type KbTab = "all" | "uploaded-by-me" | "shared" | "trash";

export type DocType = "PDF" | "DOCX" | "PPTX" | "TXT" | "XLSX" | "Other";

export type DocStatus = "Indexed" | "Processing" | "Failed";

export type KbSort = "recent" | "oldest" | "name" | "size";

export type TrendDirection = "up" | "down";

export interface KbMetric {
  id: string;
  label: string;
  value: number;
  trend: number;
  trendDirection: TrendDirection;
  trendLabel: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  formatValue?: (value: number) => string;
  valueBadge?: string;
}

export interface AgentAvatar {
  id: string;
  initials: string;
  color: string;
}

export interface KbDocument {
  id: string;
  name: string;
  tags: string[];
  type: DocType;
  size: string;
  uploadedByName: string;
  uploadedByInitials: string;
  uploadedByColor: string;
  uploadedByYou: boolean;
  uploadedDate: string;
  agents: AgentAvatar[];
  extraAgents?: number;
  chunks: number;
  status: DocStatus;
  lastUpdatedDate: string;
  lastUpdatedTime: string;
  source: string;
}

export interface OverviewSegment {
  id: string;
  label: string;
  value: number;
  color: string;
}

export interface TagCount {
  id: string;
  label: string;
  count: number;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: DocType;
}

export interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface KnowledgeBasePageProps {
  activeNavId?: string;
}

export const KB_TAB_LABELS: Record<KbTab, { label: string }> = {
  all: { label: "All Documents" },
  "uploaded-by-me": { label: "Uploaded By Me" },
  shared: { label: "Shared With Agents" },
  trash: { label: "Trash" },
};

export const TOTAL_DOCUMENTS_COUNT = 128;

export const SORT_OPTIONS = [
  { value: "recent", label: "Most Recent" },
  { value: "oldest", label: "Oldest First" },
  { value: "name", label: "Name" },
  { value: "size", label: "Size" },
] as const;
