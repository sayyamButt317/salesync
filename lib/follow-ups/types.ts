import type { LucideIcon } from "lucide-react";

export type FollowUpStatus =
  | "Due Today"
  | "Due Tomorrow"
  | "Scheduled"
  | "Overdue"
  | "Completed"
  | "Snoozed";

export type FollowUpTab =
  | "all"
  | "due-today"
  | "due-week"
  | "overdue"
  | "completed"
  | "snoozed";

export type FollowUpType = "WhatsApp" | "Email" | "Phone Call";

export type FollowUpPriority = "High" | "Medium" | "Low";

export type TrendDirection = "up" | "down";

export interface FollowUpMetric {
  id: string;
  label: string;
  value: number;
  trend: number;
  trendDirection: TrendDirection;
  trendLabel: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface FollowUpRecord {
  id: string;
  contactName: string;
  contactTitle: string;
  initials: string;
  agency: string;
  campaign: string;
  nextFollowUp: string;
  nextFollowUpTime: string;
  isUrgent: boolean;
  type: FollowUpType;
  status: FollowUpStatus;
  priority: FollowUpPriority;
}

export interface FollowUpSummarySegment {
  label: string;
  value: number;
  color: string;
}

export interface SmartSuggestion {
  id: string;
  message: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface UpcomingFollowUp {
  id: string;
  name: string;
  initials: string;
  time: string;
  agency: string;
}

export interface FollowUpsPageProps {
  activeNavId?: string;
}

export const FOLLOW_UP_TAB_LABELS: Record<
  FollowUpTab,
  { label: string; badge?: number }
> = {
  all: { label: "All" },
  "due-today": { label: "Due Today", badge: 12 },
  "due-week": { label: "Due This Week", badge: 24 },
  overdue: { label: "Overdue", badge: 7 },
  completed: { label: "Completed" },
  snoozed: { label: "Snoozed" },
};

export const TAB_TO_STATUS: Partial<Record<FollowUpTab, FollowUpStatus>> = {
  "due-today": "Due Today",
  overdue: "Overdue",
  completed: "Completed",
  snoozed: "Snoozed",
};

export const TAB_TO_WEEK: FollowUpTab[] = ["due-week"];
