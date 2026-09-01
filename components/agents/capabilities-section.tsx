"use client";

import { motion } from "framer-motion";
import { EMPLOYEE_CAPABILITIES } from "@/lib/ai-employees/data";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp } from "@/lib/motion/variants";
import { SectionHeader } from "@/components/landing/section-header";

export function CapabilitiesSection() {
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(
    EMPLOYEE_CAPABILITIES.length,
    true,
    "[data-capability-card]",
  );

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-12 flex justify-center"
        >
          <SectionHeader
            title="Every agent includes"
            description="No matter which agent you choose, you get the same peace of mind—your business handled while you focus on growth."
          />
        </motion.div>

        <div
          ref={gridRef}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {EMPLOYEE_CAPABILITIES.map((capability) => (
            <article
              key={capability.id}
              data-capability-card
              className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 shadow-sm"
            >
              <span className="text-2xl" aria-hidden>
                {capability.emoji}
              </span>
              <h3 className="mt-3 text-sm font-bold text-gray-900">
                {capability.label}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">
                {capability.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
