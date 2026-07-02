"use client";

import type { DashboardMetric } from "@/lib/dashboard/types";
import { MetricCard } from "@/components/ui/metric-card";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";

export interface DashboardMetricsProps {
  metrics: DashboardMetric[];
}

export function DashboardMetrics({ metrics }: DashboardMetricsProps) {
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(metrics.length);

  return (
    <div
      ref={gridRef}
      className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
    >
      {metrics.map((metric) => (
        <MetricCard
          key={metric.id}
          label={metric.label}
          value={metric.value}
          icon={metric.icon}
          iconBg={metric.iconBg}
          iconColor={metric.iconColor}
          trend={metric.trend}
          trendDirection={metric.trendDirection}
          trendLabel={metric.trendLabel}
          formatValue={(value) => value.toLocaleString()}
        />
      ))}
    </div>
  );
}
