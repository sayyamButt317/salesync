"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { ActivityItem } from "@/lib/dashboard/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface ActivityFeedProps {
  items: ActivityItem[];
}

export function ActivityFeed({ items }: ActivityFeedProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">Activity Feed</h3>
        </div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="divide-y divide-gray-50"
        >
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <motion.li
                key={item.id}
                variants={tableRow}
                className="flex items-start gap-3 px-5 py-4"
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: item.iconBg }}
                >
                  <Icon
                    className="h-4 w-4"
                    style={{ color: item.iconColor }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700">{item.description}</p>
                  <p className="mt-0.5 text-[11px] text-gray-400">
                    {item.timeAgo}
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
