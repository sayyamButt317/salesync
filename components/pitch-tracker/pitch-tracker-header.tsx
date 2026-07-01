"use client";

import { Bell, ChevronDown, Handshake, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button, IconButton } from "@/components/ui";
import { fadeUp } from "@/lib/motion/variants";

export interface PitchTrackerHeaderProps {
  title: string;
  subtitle: string;
  notificationCount?: number;
}

export function PitchTrackerHeader({
  title,
  subtitle,
  notificationCount = 3,
}: PitchTrackerHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="mb-6 flex flex-wrap items-start justify-between gap-4"
    >
      <div className="flex items-center gap-3.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 shadow-sm shadow-violet-600/25">
          <Handshake className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            {title}
          </h1>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <Button icon={Plus} iconPosition="left">
          Add Agency
          <ChevronDown className="h-3.5 w-3.5 opacity-70" />
        </Button>
        <IconButton badge={notificationCount} aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
        </IconButton>
      </div>
    </motion.div>
  );
}
