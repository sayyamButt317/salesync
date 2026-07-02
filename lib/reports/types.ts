import type { LucideIcon } from "lucide-react";

export type TrendDirection = "up" | "down";

export interface ReportMetric {
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

export interface ActivityDataPoint {
  label: string;
  pitches: number;
  replies: number;
  conversations: number;
}

export interface ActivitySeries {
  id: string;
  label: string;
  color: string;
  fill?: boolean;
}

export interface ChannelSegment {
  label: string;
  value: number;
  color: string;
}

export interface CampaignReport {
  id: string;
  name: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  pitchesSent: number;
  replies: number;
  replyRate: number;
  meetings: number;
  conversionRate: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ReplyRateSummary {
  rate: number;
  trend: number;
  trendDirection: TrendDirection;
  trendLabel: string;
  chartData: ChartDataPoint[];
}

export interface PerformanceStat {
  id: string;
  label: string;
  value: string;
  trend: number;
  trendDirection: TrendDirection;
  invertTrend?: boolean;
}

export interface ReportsPageProps {
  activeNavId?: string;
}

export const ACTIVITY_SERIES: ActivitySeries[] = [
  { id: "pitches", label: "Pitches Sent", color: "#7c3aed", fill: true },
  { id: "replies", label: "Replies", color: "#22c55e" },
  { id: "conversations", label: "Conversations", color: "#3b82f6" },
];
