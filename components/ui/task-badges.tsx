import type { TaskPriority, TaskStatus } from "@/lib/tasks/types";

const STATUS_STYLES: Record<TaskStatus, string> = {
  "To Do": "bg-violet-50 text-violet-700",
  "In Progress": "bg-blue-50 text-blue-700",
  Completed: "bg-green-50 text-green-700",
  Overdue: "bg-red-50 text-red-700",
};

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  High: "#ef4444",
  Medium: "#f97316",
  Low: "#22c55e",
};

export interface TaskStatusBadgeProps {
  status: TaskStatus;
}

export function TaskStatusBadge({ status }: TaskStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

export interface TaskPriorityIndicatorProps {
  priority: TaskPriority;
}

export function TaskPriorityIndicator({ priority }: TaskPriorityIndicatorProps) {
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-700">
      <span
        className="h-2 w-2 rounded-full"
        style={{ backgroundColor: PRIORITY_COLORS[priority] }}
      />
      {priority}
    </span>
  );
}
