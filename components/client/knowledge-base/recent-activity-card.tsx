"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { TYPE_COLORS, TYPE_ICONS } from "@/lib/knowledge-base/data";
import type { ActivityItem } from "@/lib/knowledge-base/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface RecentActivityCardProps {
  activity: ActivityItem[];
}

export function RecentActivityCard({ activity }: RecentActivityCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 hover:underline"
          >
            View all
          </button>
        </div>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-3"
        >
          {activity.map((item) => {
            const Icon = TYPE_ICONS[item.type];
            const color = TYPE_COLORS[item.type];

            return (
              <motion.li
                key={item.id}
                variants={tableRow}
                className="flex items-start gap-2.5"
              >
                <div
                  className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md"
                  style={{ backgroundColor: `${color}1a` }}
                >
                  <Icon className="h-3 w-3" style={{ color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs leading-snug text-gray-700">
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-gray-400">
                    {item.timestamp}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </Card>
    </motion.div>
  );
}
