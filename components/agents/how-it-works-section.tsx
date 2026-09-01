"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/ai-employees/data";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { SectionHeader } from "@/components/landing/section-header";

export function HowItWorksSection() {
  return (
    <section className="border-y border-gray-100 bg-gradient-to-b from-violet-50/40 to-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-14 flex justify-center"
        >
          <SectionHeader
            eyebrow="Simple for you"
            title="How it works — from your perspective"
            description="You don't manage the agent. You just see results: answered reviews, qualified leads, and booking-ready patients."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={staggerContainer}
          className="relative grid gap-8 md:grid-cols-3 md:gap-6"
        >
          <div
            className="pointer-events-none absolute top-12 hidden h-0.5 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-violet-200 md:block"
            style={{ left: "16%", right: "16%" }}
            aria-hidden
          />

          {HOW_IT_WORKS_STEPS.map((step, index) => (
            <motion.article
              key={step.id}
              variants={fadeUp}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-violet-100 bg-white text-3xl shadow-md shadow-violet-100/50">
                {step.emoji}
              </div>
              <span className="mt-4 inline-flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                {index + 1}
              </span>
              <h3 className="mt-3 text-lg font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-gray-500">
                {step.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
