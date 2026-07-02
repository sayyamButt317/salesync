import type { LucideIcon } from "lucide-react";

export type TaskStatus = "To Do" | "In Progress" | "Completed" | "Overdue";

export type TaskTab = "all" | "todo" | "in-progress" | "completed" | "overdue";

export type TaskPriority = "High" | "Medium" | "Low";

export type TaskSort = "newest" | "oldest" | "due-date" | "priority";

export type TrendDirection = "up" | "down";

export type AssociatedType = "agency" | "contact" | "deal" | "campaign";

export interface TaskMetric {
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

export interface TaskRecord {
  id: string;
  title: string;
  description: string;
  associatedName: string;
  associatedType: AssociatedType;
  assigneeName: string;
  assigneeInitials: string;
  dueDate: string;
  dueTime: string;
  dueLabel?: string;
  isDueUrgent: boolean;
  priority: TaskPriority;
  status: TaskStatus;
}

export interface TaskPrioritySegment {
  label: string;
  value: number;
  color: string;
}

export interface UpcomingTask {
  id: string;
  title: string;
  time: string;
}

export interface OverdueTask {
  id: string;
  title: string;
  dueDate: string;
}

export interface TaskSummaryStats {
  created: number;
  completed: number;
  completionRate: number;
}

export interface TasksPageProps {
  activeNavId?: string;
}

export const TASK_TAB_LABELS: Record<TaskTab, { label: string }> = {
  all: { label: "All Tasks" },
  todo: { label: "To Do" },
  "in-progress": { label: "In Progress" },
  completed: { label: "Completed" },
  overdue: { label: "Overdue" },
};

export const TAB_TO_STATUS: Partial<Record<TaskTab, TaskStatus>> = {
  todo: "To Do",
  "in-progress": "In Progress",
  completed: "Completed",
  overdue: "Overdue",
};

export const TOTAL_TASKS_COUNT = 34;
