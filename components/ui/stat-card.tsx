import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface StatCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  valueRef?: React.RefObject<HTMLSpanElement | null>;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  valueRef,
}: StatCardProps) {
  return (
    <div
      data-animate
      className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
        style={{ backgroundColor: iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: iconColor }} />
      </div>
      <div>
        <p className="text-2xl font-bold tracking-tight text-gray-900">
          <span ref={valueRef}>{value}</span>
        </p>
        <p className="text-xs font-medium text-gray-500">{label}</p>
      </div>
    </div>
  );
}
