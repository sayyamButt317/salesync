"use client";

import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

export function SettingsPageHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className="mb-2"
    >
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        Settings
      </h1>
      <p className="mt-1 text-sm text-gray-500">
        Manage your account, preferences and integrations.
      </p>
    </motion.div>
  );
}
