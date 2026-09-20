"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

export function IntegrationsPageHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className="mb-6"
    >
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Integrations
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Connect social platforms, CRM tools, and Google or Microsoft accounts.
      </p>
    </motion.div>
  );
}
