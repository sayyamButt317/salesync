import type { LucideIcon } from "lucide-react";

export type PitchStatus =
  | "Draft"
  | "Sent"
  | "Viewed"
  | "Replied"
  | "Converted"
  | "Archived";

export type PitchTab =
  | "all"
  | "drafts"
  | "sent"
  | "viewed"
  | "replied"
  | "converted"
  | "archived";

export type TrendDirection = "up" | "down";

export interface PitchMetric {
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

export interface PitchRecord {
  id: string;
  title: string;
  agentType: string;
  agency: string;
  recipientName: string;
  recipientEmail: string;
  recipientInitials: string;
  status: PitchStatus;
  sentOn: string;
  lastActivity: string;
  replyRate: number;
}

export interface PitchPerformanceSegment {
  label: string;
  value: number;
  color: string;
}

export interface ReplyRatePoint {
  label: string;
  value: number;
}

export interface TopPerformingPitch {
  id: string;
  name: string;
  replyRate: number;
}

export interface PitchesPageProps {
  activeNavId?: string;
}

export const PITCH_TAB_LABELS: Record<PitchTab, string> = {
  all: "All Pitches",
  drafts: "Drafts",
  sent: "Sent",
  viewed: "Viewed",
  replied: "Replied",
  converted: "Converted",
  archived: "Archived",
};

export const TAB_TO_STATUS: Partial<Record<PitchTab, PitchStatus>> = {
  drafts: "Draft",
  sent: "Sent",
  viewed: "Viewed",
  replied: "Replied",
  converted: "Converted",
  archived: "Archived",
};
