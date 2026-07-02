"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { TagCount } from "@/lib/knowledge-base/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

const TAG_COLORS = [
  "bg-violet-50 text-violet-700",
  "bg-blue-50 text-blue-700",
  "bg-orange-50 text-orange-700",
  "bg-green-50 text-green-700",
  "bg-amber-50 text-amber-700",
];

export interface TopTagsCardProps {
  tags: TagCount[];
  extraCount: number;
}

export function TopTagsCard({ tags, extraCount }: TopTagsCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Top Tags</h3>
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 hover:underline"
          >
            View all
          </button>
        </div>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="flex flex-wrap gap-2"
        >
          {tags.map((tag, index) => (
            <motion.span
              key={tag.id}
              variants={tableRow}
              className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium ${
                TAG_COLORS[index % TAG_COLORS.length]
              }`}
            >
              {tag.label}
              <span className="font-bold opacity-70">{tag.count}</span>
            </motion.span>
          ))}
          <span className="inline-flex items-center rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-500">
            +{extraCount} more
          </span>
        </motion.div>
      </Card>
    </motion.div>
  );
}
