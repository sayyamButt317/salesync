import { TrendingDown, TrendingUp } from "lucide-react";
import type { TrendDirection } from "@/lib/dashboard/types";

export interface TrendBadgeProps {
  value: number;
  direction: TrendDirection;
  label?: string;
}

export function TrendBadge({
  value,
  direction,
  label = "vs last month",
}: TrendBadgeProps) {
  const isUp = direction === "up";

  return (
    <p
      className={`mt-1 flex items-center gap-1 text-[11px] font-medium ${
        isUp ? "text-green-600" : "text-red-500"
      }`}
    >
      {isUp ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {isUp ? "+" : "-"}
      {value}% {label}
    </p>
  );
}
