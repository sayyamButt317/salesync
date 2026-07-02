import type { LucideIcon } from "lucide-react";

export type TemplateType = "message" | "pitch" | "follow-up" | "task";

export type TemplateTab = TemplateType | "all";

export type TemplateSort = "newest" | "oldest" | "name";

export type TrendDirection = "up" | "down";

export interface TemplateMetric {
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

export interface TemplateRecord {
  id: string;
  type: TemplateType;
  title: string;
  description: string;
  tags: string[];
  updatedAt: string;
  authorInitials: string;
  isFavorite: boolean;
}

export interface TemplateTypeTheme {
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  labelColor: string;
  tagBg: string;
  tagText: string;
}

export interface TemplatesPageProps {
  activeNavId?: string;
}

export const TEMPLATE_TAB_LABELS: Record<TemplateTab, { label: string }> = {
  all: { label: "All Templates" },
  message: { label: "Messages" },
  pitch: { label: "Pitches" },
  "follow-up": { label: "Follow Ups" },
  task: { label: "Tasks" },
};

export const TOTAL_TEMPLATES_COUNT = 48;
