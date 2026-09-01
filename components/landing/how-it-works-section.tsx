"use client";

import { motion } from "framer-motion";
import { HOW_IT_WORKS_STEPS } from "@/lib/landing/data";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { SectionHeader } from "./section-header";

export function HowItWorksSection() {
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(
    HOW_IT_WORKS_STEPS.length,
    true,
    "[data-step-card]",
  );

  return (
    <section
      id="how-it-works"
      className="bg-[#0f172a] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mb-14 flex justify-center"
        >
          <SectionHeader
            dark
            title="Your AI Employee in 3 Simple Steps"
          />
        </motion.div>

        <div
          ref={gridRef}
          className="relative grid gap-10 md:grid-cols-3 md:gap-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute top-12 right-[16.67%] left-[16.67%] hidden h-px border-t border-dashed border-white/10 md:block"
          />

          {HOW_IT_WORKS_STEPS.map((step) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.id}
                data-step-card
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={staggerContainer}
                className="relative text-center"
              >
                <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                  <Icon className="h-7 w-7 text-violet-400" />
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">
                  {step.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
