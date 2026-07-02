"use client";

import { Info } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { OverviewSegment } from "@/lib/knowledge-base/types";
import { fadeUp } from "@/lib/motion/variants";
import { KnowledgeDonut } from "./knowledge-donut";

export interface KnowledgeOverviewCardProps {
  segments: OverviewSegment[];
  totalDocuments: number;
}

export function KnowledgeOverviewCard({
  segments,
  totalDocuments,
}: KnowledgeOverviewCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-bold text-gray-900">Knowledge Overview</h3>
          <Info className="h-3.5 w-3.5 text-gray-300" />
        </div>
        <KnowledgeDonut
          segments={segments}
          centerValue={totalDocuments}
          centerLabel="Documents"
        />
      </Card>
    </motion.div>
  );
}
