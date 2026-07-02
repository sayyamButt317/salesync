"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { ChartContainer } from "@/components/ui/chart-container";
import type { PerformanceStat } from "@/lib/reports/types";
import { fadeUp } from "@/lib/motion/variants";

export interface PerformanceSummaryCardProps {
  stats: PerformanceStat[];
}

function StatTrend({
  trend,
  direction,
  invertTrend,
}: {
  trend: number;
  direction: PerformanceStat["trendDirection"];
  invertTrend?: boolean;
}) {
  const isPositive =
    direction === "up" ? !invertTrend : invertTrend;
  const isUp = direction === "up";

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
        isPositive ? "text-green-600" : "text-red-500"
      }`}
    >
      {isUp ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {isUp ? "+" : "-"}
      {trend}%
    </span>
  );
}

export function PerformanceSummaryCard({ stats }: PerformanceSummaryCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.3 }}
    >
      <ChartContainer
        title="Performance Summary"
        dropdownLabel="This Month"
        footer={
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
          >
            View full performance report →
          </button>
        }
      >
        <div className="grid grid-cols-2 gap-px bg-gray-100">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white px-5 py-4"
            >
              <p className="text-[11px] font-medium text-gray-500">
                {stat.label}
              </p>
              <div className="mt-1 flex items-end justify-between gap-2">
                <span className="text-lg font-bold text-gray-900">
                  {stat.value}
                </span>
                <StatTrend
                  trend={stat.trend}
                  direction={stat.trendDirection}
                  invertTrend={stat.invertTrend}
                />
              </div>
            </div>
          ))}
        </div>
      </ChartContainer>
    </motion.div>
  );
}
