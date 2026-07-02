import type { LucideIcon } from "lucide-react";

export type LeadTab =
  | "all"
  | "new"
  | "qualified"
  | "in-progress"
  | "converted"
  | "lost";

export type LeadStatus =
  | "New"
  | "Qualified"
  | "In Progress"
  | "Converted"
  | "Lost";

export type LeadScoreLevel = "High" | "Medium" | "Low";

export type LeadSource =
  | "WhatsApp"
  | "Instagram"
  | "Email"
  | "Web"
  | "LinkedIn";

export type LeadDetailTab = "overview" | "profile" | "notes" | "activity";

export type LeadSort = "newest" | "oldest" | "score";

export type TrendDirection = "up" | "down";

export interface LeadMetric {
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
}

export interface LeadActivity {
  id: string;
  title: string;
  timestamp: string;
}

export interface LeadRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  tag?: string;
  initials: string;
  avatarColor: string;
  location: string;
  summary: string;
  source: LeadSource;
  agentName: string;
  agentRole: string;
  leadScore: number;
  status: LeadStatus;
  lastActivity: string;
  capturedOn: string;
  assignedTo?: string;
  activities: LeadActivity[];
}

export interface LeadsPageProps {
  activeNavId?: string;
}

export const LEAD_TAB_LABELS: Record<LeadTab, { label: string }> = {
  all: { label: "All Leads" },
  new: { label: "New" },
  qualified: { label: "Qualified" },
  "in-progress": { label: "In Progress" },
  converted: { label: "Converted" },
  lost: { label: "Lost" },
};

export const TAB_TO_STATUS: Partial<Record<LeadTab, LeadStatus>> = {
  new: "New",
  qualified: "Qualified",
  "in-progress": "In Progress",
  converted: "Converted",
  lost: "Lost",
};

export const TOTAL_LEADS_COUNT = 428;

export function getLeadScoreLevel(score: number): LeadScoreLevel {
  if (score >= 80) return "High";
  if (score >= 60) return "Medium";
  return "Low";
}
