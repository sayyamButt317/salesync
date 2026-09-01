"use client";

import { motion } from "framer-motion";
import { AGENTS_SUBHEADLINE } from "@/lib/ai-employees/data";
import { fadeUp } from "@/lib/motion/variants";
import { GradientText, SectionHeader } from "@/components/landing/section-header";

export function AgentsHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-4 pt-16 sm:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(124,58,237,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.45 }}
        >
          <SectionHeader
            eyebrow="AI Agents for your business"
            title={
              <>
                Solve real problems.{" "}
                <GradientText>Not more work.</GradientText>
              </>
            }
            description={AGENTS_SUBHEADLINE}
          />
        </motion.div>
      </div>
    </section>
  );
}
