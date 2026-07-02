import type { DocStatus } from "@/lib/knowledge-base/types";

const STATUS_STYLES: Record<DocStatus, string> = {
  Indexed: "bg-green-50 text-green-700",
  Processing: "bg-amber-50 text-amber-700",
  Failed: "bg-red-50 text-red-600",
};

const DOT_STYLES: Record<DocStatus, string> = {
  Indexed: "bg-green-500",
  Processing: "bg-amber-500",
  Failed: "bg-red-500",
};

export interface DocStatusBadgeProps {
  status: DocStatus;
}

export function DocStatusBadge({ status }: DocStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${STATUS_STYLES[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${DOT_STYLES[status]} ${
          status === "Processing" ? "animate-pulse" : ""
        }`}
      />
      {status}
    </span>
  );
}
