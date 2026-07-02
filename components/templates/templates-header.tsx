"use client";

import { Bell, FolderOpen, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button, IconButton } from "@/components/ui";
import { fadeUp } from "@/lib/motion/variants";

export function TemplatesHeader() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className="mb-6 flex flex-wrap items-start justify-between gap-4"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Templates
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Use templates to create pitches, messages, follow ups and tasks faster.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Button icon={Plus} iconPosition="left">
          New Template
        </Button>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <FolderOpen className="h-4 w-4 text-gray-400" />
          Categories
        </button>
        <IconButton badge={3} aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
        </IconButton>
      </div>
    </motion.div>
  );
}
