import type { AgentStatus } from "@/lib/client-dashboard/types";

export type AgentBadgeStatus = AgentStatus | "Archived";

const STATUS_STYLES: Record<AgentBadgeStatus, string> = {
  Active: "bg-green-50 text-green-700",
  Training: "bg-violet-50 text-violet-700",
  Paused: "bg-gray-100 text-gray-600",
  Archived: "bg-gray-100 text-gray-500",
};

export interface AgentStatusBadgeProps {
  status: AgentBadgeStatus;
}

export function AgentStatusBadge({ status }: AgentStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
