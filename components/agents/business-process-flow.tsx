"use client";

import { motion } from "framer-motion";
import type { BusinessProcessStep } from "@/lib/ai-employees/types";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";

export interface BusinessProcessFlowProps {
  steps: BusinessProcessStep[];
  accentColor?: string;
}

export function BusinessProcessFlow({
  steps,
  accentColor = "#7c3aed",
}: BusinessProcessFlowProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={staggerContainer}
      className="relative"
    >
      <p className="mb-6 text-center text-sm font-semibold text-gray-500">
        What happens — step by step
      </p>

      <div className="relative space-y-0">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            variants={fadeUp}
            className="relative flex gap-4 pb-8 last:pb-0 sm:gap-6"
          >
            {index < steps.length - 1 ? (
              <div
                className="absolute left-6 top-14 h-[calc(100%-2rem)] w-0.5 sm:left-7"
                style={{
                  background: `linear-gradient(to bottom, ${accentColor}40, ${accentColor}15)`,
                }}
                aria-hidden
              />
            ) : null}

            <div
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 bg-white text-xl shadow-sm sm:h-14 sm:w-14 sm:text-2xl"
              style={{ borderColor: `${accentColor}40` }}
            >
              {step.emoji}
            </div>

            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="text-xs font-bold uppercase tracking-wide"
                  style={{ color: accentColor }}
                >
                  Step {index + 1}
                </span>
              </div>
              <h4 className="mt-1 text-base font-bold text-gray-900 sm:text-lg">
                {step.title}
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
