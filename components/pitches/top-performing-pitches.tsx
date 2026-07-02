"use client";

import { motion } from "framer-motion";
import { Card, ProgressBar } from "@/components/ui";
import type { TopPerformingPitch } from "@/lib/pitches/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface TopPerformingPitchesProps {
  pitches: TopPerformingPitch[];
}

export function TopPerformingPitches({ pitches }: TopPerformingPitchesProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.2 }}
      className="h-full"
    >
      <Card padding="none" className="h-full overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">
            Top Performing Pitches
          </h3>
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
          >
            View all
          </button>
        </div>

        <motion.ul
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="divide-y divide-gray-50 px-5 py-2"
        >
          {pitches.map((pitch) => (
            <motion.li
              key={pitch.id}
              variants={tableRow}
              className="py-3.5"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="truncate text-xs font-medium text-gray-800">
                  {pitch.name}
                </span>
                <span className="shrink-0 text-xs font-semibold text-violet-600">
                  {pitch.replyRate}%
                </span>
              </div>
              <ProgressBar value={pitch.replyRate} color="#7c3aed" />
            </motion.li>
          ))}
        </motion.ul>
      </Card>
    </motion.div>
  );
}
