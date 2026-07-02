import type { LucideIcon } from "lucide-react";

export type ConversationStatus = "New" | "Replied" | "Closed" | "Pending";
export type TrendDirection = "up" | "down";

export interface DashboardMetric {
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

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface RecentConversation {
  id: string;
  name: string;
  initials: string;
  agency: string;
  message: string;
  timeAgo: string;
  status: ConversationStatus;
}

export interface TopAgency {
  id: string;
  name: string;
  initials: string;
  color: string;
  conversations: number;
  replyRate: number;
  deals: number;
}

export interface ActivityItem {
  id: string;
  description: string;
  timeAgo: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface DashboardProps {
  activeNavId?: string;
}
