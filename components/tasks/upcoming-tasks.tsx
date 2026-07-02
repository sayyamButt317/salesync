"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { UpcomingTask } from "@/lib/tasks/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface UpcomingTasksProps {
  items: UpcomingTask[];
}

export function UpcomingTasks({ items }: UpcomingTasksProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">Upcoming Tasks</h3>
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 hover:text-violet-700"
          >
            View all
          </button>
        </div>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="divide-y divide-gray-50"
        >
          {items.map((item) => (
            <motion.li
              key={item.id}
              variants={tableRow}
              className="flex items-center justify-between gap-3 px-5 py-3.5"
            >
              <p className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800">
                {item.title}
              </p>
              <span className="shrink-0 text-[11px] font-medium text-violet-600">
                {item.time}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      </Card>
    </motion.div>
  );
}
