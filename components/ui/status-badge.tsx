import type { PitchStatus } from "@/lib/pitches/types";

const STATUS_STYLES: Record<PitchStatus, string> = {
  Draft: "bg-gray-100 text-gray-600",
  Sent: "bg-blue-50 text-blue-700",
  Viewed: "bg-sky-50 text-sky-700",
  Replied: "bg-green-50 text-green-700",
  Converted: "bg-violet-50 text-violet-700",
  Archived: "bg-gray-100 text-gray-500",
};

export interface StatusBadgeProps {
  status: PitchStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      {status}
    </span>
  );
}
