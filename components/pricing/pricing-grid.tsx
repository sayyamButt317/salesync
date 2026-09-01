"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PRICING_PLANS } from "@/lib/pricing/data";
import type { BillingCycle } from "@/lib/pricing/types";
import { useGsapStaggerGrid } from "@/lib/motion/use-gsap-stagger-grid";
import { fadeUp } from "@/lib/motion/variants";
import { BillingToggle } from "./billing-toggle";
import { PricingCard } from "./pricing-card";

export function PricingGrid() {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("monthly");
  const gridRef = useGsapStaggerGrid<HTMLDivElement>(
    PRICING_PLANS.length,
    true,
    "[data-pricing-card]",
  );

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-10"
        >
          <BillingToggle value={billingCycle} onChange={setBillingCycle} />
        </motion.div>

        <div
          ref={gridRef}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {PRICING_PLANS.map((plan) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              billingCycle={billingCycle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
