import type { LeadStatus } from "@/lib/client-leads/types";

const STATUS_STYLES: Record<LeadStatus, string> = {
  New: "bg-violet-50 text-violet-700",
  Qualified: "bg-green-50 text-green-700",
  "In Progress": "bg-blue-50 text-blue-700",
  Converted: "bg-emerald-50 text-emerald-800",
  Lost: "bg-red-50 text-red-700",
};

export interface LeadStatusBadgeProps {
  status: LeadStatus;
}

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
