"use client";

import { motion } from "framer-motion";
import { Avatar, Card } from "@/components/ui";
import type { UpcomingFollowUp } from "@/lib/follow-ups/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface UpcomingFollowUpsProps {
  items: UpcomingFollowUp[];
}

export function UpcomingFollowUps({ items }: UpcomingFollowUpsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">
            Upcoming Follow Ups
          </h3>
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
              className="flex items-center gap-3 px-5 py-3.5"
            >
              <Avatar initials={item.initials} size="sm" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900">
                  {item.name}
                </p>
                <p className="truncate text-xs text-gray-500">{item.agency}</p>
              </div>
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
