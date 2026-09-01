"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";
import { GradientText, SectionHeader } from "@/components/landing/section-header";
import {
  GROWTH_POSITIONING,
  PRICING_SUBHEADLINE,
} from "@/lib/pricing/data";

export function PricingHeader() {
  return (
    <section className="relative overflow-hidden bg-white pb-4 pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.07),transparent_55%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            eyebrow="Pricing"
            title={
              <>
                Hire AI Employees for{" "}
                <GradientText>Your Business</GradientText>
              </>
            }
            description={PRICING_SUBHEADLINE}
          />
        </motion.div>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="mx-auto mt-6 max-w-2xl rounded-xl border border-violet-100 bg-violet-50/60 px-4 py-3 text-sm font-medium text-violet-800"
        >
          {GROWTH_POSITIONING}
        </motion.p>
      </div>
    </section>
  );
}
