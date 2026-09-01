"use client";

import { motion } from "framer-motion";
import { FEATURE_ITEMS } from "@/lib/landing/data";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp } from "@/lib/motion/variants";
import { FeatureCard } from "./feature-card";
import { GradientText, SectionHeader } from "./section-header";

export function FeaturesSection() {
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(FEATURE_ITEMS.length);

  return (
    <section id="features" className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="mb-14 flex justify-center"
        >
          <SectionHeader
            title={
              <>
                Built to <GradientText>Work.</GradientText> Designed to{" "}
                <GradientText>Scale.</GradientText>
              </>
            }
          />
        </motion.div>

        <div
          ref={gridRef}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURE_ITEMS.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
