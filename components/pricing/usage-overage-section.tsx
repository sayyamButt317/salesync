"use client";

import { TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { USAGE_OVERAGE } from "@/lib/pricing/data";
import { fadeUp } from "@/lib/motion/variants";

export function UsageOverageSection() {
  return (
    <section className="border-y border-gray-100 bg-white py-12">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </div>
          <h3 className="text-lg font-bold text-gray-900">
            Need more AI Tasks?
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-gray-500">
            {USAGE_OVERAGE.description}
          </p>
          <p className="mt-4 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm font-semibold text-gray-800">
            {USAGE_OVERAGE.rate} per {USAGE_OVERAGE.unit}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
