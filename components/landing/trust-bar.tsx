"use client";

import { motion } from "framer-motion";
import { TRUST_LOGOS } from "@/lib/landing/data";
import { fadeUp } from "@/lib/motion/variants";

export function TrustBar() {
  return (
    <section className="border-y border-gray-100 bg-gray-50/50 py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.p
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          className="mb-8 text-center text-xs font-bold tracking-[0.2em] text-gray-400 uppercase"
        >
          Trusted by forward-thinking businesses
        </motion.p>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={fadeUp}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 sm:gap-x-14"
        >
          {TRUST_LOGOS.map((logo) => (
            <span
              key={logo.id}
              className="text-sm font-bold tracking-wide text-gray-300 uppercase select-none"
            >
              {logo.label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
