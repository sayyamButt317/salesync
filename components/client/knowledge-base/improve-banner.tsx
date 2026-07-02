"use client";

import { BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { fadeUp } from "@/lib/motion/variants";

export function ImproveBanner() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.3 }}
      className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-6 py-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
          <BrainCircuit className="h-5 w-5 text-violet-600" />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">
            Improve your agent with more knowledge
          </p>
          <p className="text-xs text-gray-500">
            Agents with more relevant knowledge answer 35% more accurately.
          </p>
        </div>
      </div>
      <Button>Add More Knowledge</Button>
    </motion.div>
  );
}
