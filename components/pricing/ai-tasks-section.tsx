"use client";

import { Bot } from "lucide-react";
import { motion } from "framer-motion";
import { AI_TASK_EXAMPLES } from "@/lib/pricing/data";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";
import { GradientText, SectionHeader } from "@/components/landing/section-header";

export function AiTasksSection() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-10 flex justify-center"
        >
          <SectionHeader
            title={
              <>
                What counts as an{" "}
                <GradientText>AI Task</GradientText>?
              </>
            }
            description="An AI Task is meaningful work completed by your AI employee—not just a message. This is how we measure value, not chat volume."
          />
        </motion.div>

        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {AI_TASK_EXAMPLES.map((task) => (
            <motion.li
              key={task.id}
              variants={tableRow}
              className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 text-sm font-medium text-gray-700"
            >
              <Bot className="h-4 w-4 shrink-0 text-violet-600" />
              {task.label}
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
