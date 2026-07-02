"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, Card } from "@/components/ui";
import { ConversationsChart } from "./conversations-chart";
import type { ChartDataPoint } from "@/lib/dashboard/types";
import { fadeUp } from "@/lib/motion/variants";

export interface ConversationsOverviewProps {
  data: ChartDataPoint[];
}

export function ConversationsOverview({ data }: ConversationsOverviewProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">
            Conversations Overview
          </h3>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            This Month
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="h-52 px-4 py-4">
          <ConversationsChart data={data} />
        </div>
      </Card>
    </motion.div>
  );
}
