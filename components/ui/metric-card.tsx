"use client";

import type { LucideIcon } from "lucide-react";
import { useGsapCounter } from "@/lib/motion/use-gsap-counter";
import type { TrendDirection } from "@/lib/dashboard/types";
import { TrendBadge } from "./trend-badge";

export interface MetricCardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  trend: number;
  trendDirection: TrendDirection;
  trendLabel?: string;
  formatValue?: (value: number) => string;
  valueBadge?: string;
  valueBadgeClassName?: string;
}

function AnimatedValue({
  value,
  formatValue,
}: {
  value: number;
  formatValue?: (value: number) => string;
}) {
  const ref = useGsapCounter(value, 1.2, true, formatValue);
  const display = formatValue ? formatValue(value) : value.toLocaleString();

  return <span ref={ref}>{display}</span>;
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  iconBg,
  iconColor,
  trend,
  trendDirection,
  trendLabel,
  formatValue,
  valueBadge,
  valueBadgeClassName = "bg-green-50 text-green-700",
}: MetricCardProps) {
  return (
    <div
      data-stagger-card
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: iconBg }}
        >
          <Icon className="h-5 w-5" style={{ color: iconColor }} />
        </div>
      </div>
      <p className="mt-4 text-xs font-medium text-gray-500">{label}</p>
      <p className="mt-0.5 flex items-center gap-2 text-2xl font-bold tracking-tight text-gray-900">
        <AnimatedValue value={value} formatValue={formatValue} />
        {valueBadge ? (
          <span
            className={`rounded-md px-1.5 py-0.5 text-[10px] font-semibold ${valueBadgeClassName}`}
          >
            {valueBadge}
          </span>
        ) : null}
      </p>
      <TrendBadge
        value={trend}
        direction={trendDirection}
        label={trendLabel}
      />
    </div>
  );
}
