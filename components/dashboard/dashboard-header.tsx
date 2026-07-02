"use client";

import Link from "next/link";
import { Bell, Calendar, ChevronDown, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button, IconButton } from "@/components/ui";
import { fadeUp } from "@/lib/motion/variants";

export interface DashboardHeaderProps {
  title?: string;
  subtitle?: string;
  notificationCount?: number;
}

export function DashboardHeader({
  title = "Dashboard",
  subtitle = "Overview of your agencies and conversations.",
  notificationCount = 3,
}: DashboardHeaderProps) {
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
          {title}
        </h1>
        <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <Link href="/client/create-agent">
          <Button icon={Plus} iconPosition="left">
            Add Agency
          </Button>
        </Link>
        <IconButton badge={notificationCount} aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
        </IconButton>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <Calendar className="h-4 w-4 text-gray-400" />
          Jun 1 – Jun 30, 2025
          <ChevronDown className="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </motion.div>
  );
}
