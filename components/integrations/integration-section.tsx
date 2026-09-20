"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

export interface IntegrationSectionProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function IntegrationSection({
  title,
  description,
  children,
}: IntegrationSectionProps) {
  return (
    <motion.section variants={fadeUp} className="space-y-4">
      <div>
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {children}
      </div>
    </motion.section>
  );
}
