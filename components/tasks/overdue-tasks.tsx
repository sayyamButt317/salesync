"use client";

import { AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { OverdueTask } from "@/lib/tasks/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface OverdueTasksProps {
  items: OverdueTask[];
}

export function OverdueTasks({ items }: OverdueTasksProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">Overdue Tasks</h3>
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
              className="flex items-start gap-3 px-5 py-3.5"
            >
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-red-50">
                <AlertCircle className="h-3.5 w-3.5 text-red-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-800">
                  {item.title}
                </p>
                <p className="mt-0.5 text-[11px] text-red-500">{item.dueDate}</p>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </Card>
    </motion.div>
  );
}
