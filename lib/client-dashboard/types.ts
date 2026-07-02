import type { LucideIcon } from "lucide-react";

export type TrendDirection = "up" | "down";

export type AgentStatus = "Active" | "Training" | "Paused";

export type ConversationPlatform = "WhatsApp" | "Instagram" | "Email";

export type ConversationStatus = "New" | "Replied";

export interface ClientDashboardMetric {
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

export interface PerformanceDataPoint {
  label: string;
  leads: number;
  conversations: number;
  bookings: number;
  deals: number;
}

export interface PerformanceSeries {
  id: string;
  label: string;
  color: string;
  dataKey: keyof Omit<PerformanceDataPoint, "label">;
}

export interface AIScoreMetric {
  id: string;
  label: string;
  value: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface TopAgent {
  id: string;
  name: string;
  role: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  status: AgentStatus;
  leads: number;
  conversations: number;
  bookings: number;
  aiScore: number;
  sparkline: number[];
}

export interface UpcomingBooking {
  id: string;
  dateLabel: string;
  name: string;
  meetingType: string;
  time: string;
}

export interface ClientRecentConversation {
  id: string;
  platform: ConversationPlatform;
  name: string;
  message: string;
  timeAgo: string;
  status: ConversationStatus;
}

export interface ClientProfile {
  companyName: string;
  email: string;
  initials: string;
  creditsUsed: number;
  creditsTotal: number;
  plan: string;
  renewalDate: string;
}

export interface ClientDashboardPageProps {
  activeNavId?: string;
  userName?: string;
}

export const PERFORMANCE_SERIES: PerformanceSeries[] = [
  { id: "leads", label: "Leads", color: "#7c3aed", dataKey: "leads" },
  {
    id: "conversations",
    label: "Conversations",
    color: "#3b82f6",
    dataKey: "conversations",
  },
  { id: "bookings", label: "Bookings", color: "#f97316", dataKey: "bookings" },
  { id: "deals", label: "Deals Closed", color: "#22c55e", dataKey: "deals" },
];
