"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { DonutChart } from "@/components/pitches/pitch-performance-chart";
import type { TaskPrioritySegment } from "@/lib/tasks/types";
import { fadeUp } from "@/lib/motion/variants";

export interface TasksPriorityChartProps {
  segments: TaskPrioritySegment[];
}

export function TasksPriorityChart({ segments }: TasksPriorityChartProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card>
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Tasks by Priority
        </h3>
        <DonutChart segments={segments} size={140} />
      </Card>
    </motion.div>
  );
}
