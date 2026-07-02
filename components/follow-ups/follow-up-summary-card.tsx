"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import { DonutChart } from "@/components/pitches/pitch-performance-chart";
import type { FollowUpSummarySegment } from "@/lib/follow-ups/types";
import { fadeUp } from "@/lib/motion/variants";

export interface FollowUpSummaryCardProps {
  segments: FollowUpSummarySegment[];
}

export function FollowUpSummaryCard({ segments }: FollowUpSummaryCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card>
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Follow Up Summary
        </h3>
        <DonutChart segments={segments} size={140} />
      </Card>
    </motion.div>
  );
}
