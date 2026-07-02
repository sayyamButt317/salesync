"use client";

import { motion } from "framer-motion";
import { ChartContainer, TrendBadge } from "@/components/ui";
import { ConversationsChart } from "@/components/dashboard/conversations-chart";
import type { ReplyRateSummary } from "@/lib/reports/types";
import { fadeUp } from "@/lib/motion/variants";

export interface ReplyRateCardProps {
  summary: ReplyRateSummary;
}

export function ReplyRateCard({ summary }: ReplyRateCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <ChartContainer title="Reply Rate Over Time" dropdownLabel="This Month">
        <div className="px-5 py-4">
          <div className="mb-4">
            <p className="text-3xl font-bold tracking-tight text-gray-900">
              {summary.rate}%
            </p>
            <TrendBadge
              value={summary.trend}
              direction={summary.trendDirection}
              label={summary.trendLabel}
            />
          </div>
          <div className="h-28">
            <ConversationsChart data={summary.chartData} />
          </div>
        </div>
      </ChartContainer>
    </motion.div>
  );
}
