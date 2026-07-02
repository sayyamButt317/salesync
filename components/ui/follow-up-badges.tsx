import type { FollowUpPriority, FollowUpStatus } from "@/lib/follow-ups/types";

const STATUS_STYLES: Record<FollowUpStatus, string> = {
  "Due Today": "bg-red-50 text-red-700",
  "Due Tomorrow": "bg-orange-50 text-orange-700",
  Scheduled: "bg-blue-50 text-blue-700",
  Overdue: "bg-red-50 text-red-700",
  Completed: "bg-green-50 text-green-700",
  Snoozed: "bg-gray-100 text-gray-600",
};

const PRIORITY_COLORS: Record<FollowUpPriority, string> = {
  High: "#ef4444",
  Medium: "#f97316",
  Low: "#22c55e",
};

export interface FollowUpStatusBadgeProps {
  status: FollowUpStatus;
}

export function FollowUpStatusBadge({ status }: FollowUpStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}

export interface PriorityIndicatorProps {
  priority: FollowUpPriority;
}

export function PriorityIndicator({ priority }: PriorityIndicatorProps) {
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
