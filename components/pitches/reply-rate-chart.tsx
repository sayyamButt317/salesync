"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { ConversationsChart } from "@/components/dashboard/conversations-chart";
import type { ReplyRatePoint } from "@/lib/pitches/types";
import { fadeUp } from "@/lib/motion/variants";

export interface ReplyRateChartProps {
  data: ReplyRatePoint[];
}

export function ReplyRateChart({ data }: ReplyRateChartProps) {
  const chartData = data.map((point) => ({
    label: point.label.replace("Jun ", ""),
    value: point.value,
  }));

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card padding="none" className="h-full overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">
            Reply Rate Over Time
          </h3>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            This Month
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="h-44 px-4 py-3">
          <ConversationsChart data={chartData} />
        </div>
      </Card>
    </motion.div>
  );
}
