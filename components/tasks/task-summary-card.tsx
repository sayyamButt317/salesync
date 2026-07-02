"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { Card, ProgressBar } from "@/components/ui";
import type { TaskSummaryStats } from "@/lib/tasks/types";
import { fadeUp } from "@/lib/motion/variants";

export interface TaskSummaryCardProps {
  stats: TaskSummaryStats;
}

export function TaskSummaryCard({ stats }: TaskSummaryCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Task Summary</h3>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700"
          >
            This Month
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>

        <dl className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <dt className="text-gray-500">Created</dt>
            <dd className="font-bold text-gray-900">{stats.created}</dd>
          </div>
          <div className="flex items-center justify-between text-sm">
            <dt className="text-gray-500">Completed</dt>
            <dd className="font-bold text-gray-900">{stats.completed}</dd>
          </div>
        </dl>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-gray-500">Completion Rate</span>
            <span className="font-bold text-violet-600">
              {stats.completionRate}%
            </span>
          </div>
          <ProgressBar value={stats.completionRate} />
        </div>
      </Card>
    </motion.div>
  );
}
