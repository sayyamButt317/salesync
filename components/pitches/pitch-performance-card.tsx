"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { PitchPerformanceSegment } from "@/lib/pitches/types";
import { fadeUp } from "@/lib/motion/variants";
import { DonutChart } from "./pitch-performance-chart";

export interface PitchPerformanceCardProps {
  segments: PitchPerformanceSegment[];
}

export function PitchPerformanceCard({ segments }: PitchPerformanceCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="h-full"
    >
      <Card className="flex h-full flex-col justify-center">
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Pitch Performance
        </h3>
        <DonutChart segments={segments} />
      </Card>
    </motion.div>
  );
}
