"use client";

import { Bell, Calendar, ChevronDown, SlidersHorizontal, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { Button, IconButton } from "@/components/ui";
import { DATE_RANGE_LABEL } from "@/lib/reports/data";
import { fadeUp } from "@/lib/motion/variants";

export function ReportsHeader() {
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
          Reports
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Insights and performance overview of your agents and outreach.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <Calendar className="h-4 w-4 text-gray-400" />
          {DATE_RANGE_LABEL}
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-4 w-4 text-gray-400" />
          Filters
        </button>
        <Button icon={Upload} iconPosition="left">
          Export
        </Button>
        <IconButton badge={3} aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
        </IconButton>
      </div>
    </motion.div>
  );
}
