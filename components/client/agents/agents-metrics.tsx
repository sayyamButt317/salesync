"use client";

import type { AgentMetric } from "@/lib/client-agents/types";
import { MetricCard } from "@/components/ui/metric-card";
import { useGsapCounter } from "@/lib/motion/use-gsap-counter";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { TrendBadge } from "@/components/ui/trend-badge";

function AgentSummaryCard({ metric }: { metric: AgentMetric }) {
  const ref = useGsapCounter(metric.value, 1.2, true, metric.formatValue);
  const Icon = metric.icon;
  const display = metric.formatValue
    ? metric.formatValue(metric.value)
    : metric.value.toLocaleString();

  return (
    <div
      data-stagger-card
      className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: metric.iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: metric.iconColor }} />
      </div>
      <p className="mt-4 text-xs font-medium text-gray-500">{metric.label}</p>
      <p className="mt-0.5 text-2xl font-bold tracking-tight text-gray-900">
        <span ref={ref}>{display}</span>
      </p>
      {metric.subtext ? (
        <p className="mt-1 text-[11px] font-medium text-gray-500">
          {metric.subtext}
        </p>
      ) : metric.trend !== undefined && metric.trendDirection ? (
        <TrendBadge
          value={metric.trend}
          direction={metric.trendDirection}
          label={metric.trendLabel}
        />
      ) : null}
    </div>
  );
}

export interface AgentsMetricsProps {
  metrics: AgentMetric[];
}

export function AgentsMetrics({ metrics }: AgentsMetricsProps) {
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(metrics.length);

  return (
    <div
      ref={gridRef}
      className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5"
    >
      {metrics.map((metric) =>
        metric.subtext ? (
          <AgentSummaryCard key={metric.id} metric={metric} />
        ) : (
          <MetricCard
            key={metric.id}
            label={metric.label}
            value={metric.value}
            icon={metric.icon}
            iconBg={metric.iconBg}
            iconColor={metric.iconColor}
            trend={metric.trend ?? 0}
            trendDirection={metric.trendDirection ?? "up"}
            trendLabel={metric.trendLabel}
            formatValue={metric.formatValue}
          />
        ),
      )}
    </div>
  );
}
