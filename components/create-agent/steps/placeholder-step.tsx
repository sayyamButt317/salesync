"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

export interface PlaceholderStepProps {
  title: string;
  description: string;
}

export function PlaceholderStep({ title, description }: PlaceholderStepProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.4 }}
      className="max-w-lg"
    >
      <h3 className="text-xl font-bold tracking-tight text-gray-900">{title}</h3>
      <p className="mt-1.5 text-sm text-gray-500">{description}</p>
      <div className="mt-8 rounded-xl border border-dashed border-gray-200 bg-gray-50 px-6 py-10 text-center text-sm text-gray-400">
        This step will be configured in a future release.
      </div>
    </motion.div>
  );
}
