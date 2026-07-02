"use client";

import { Bell, Plus, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Button, IconButton, SearchInput } from "@/components/ui";
import { fadeUp } from "@/lib/motion/variants";

export interface ConversationsHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function ConversationsHeader({
  search,
  onSearchChange,
}: ConversationsHeaderProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45 }}
      className="mb-5 flex shrink-0 flex-wrap items-start justify-between gap-4"
    >
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Conversations
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          All your conversations in one place.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative w-64 max-w-full">
          <SearchInput
            value={search}
            onValueChange={onSearchChange}
            placeholder="Search conversations..."
            className="pr-14"
          />
          <kbd className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
            ⌘K
          </kbd>
        </div>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-4 w-4 text-gray-400" />
          Filters
        </button>
        <Button icon={Plus} iconPosition="left">
          New Message
        </Button>
        <IconButton badge={3} aria-label="Notifications">
          <Bell className="h-[18px] w-[18px]" />
        </IconButton>
      </div>
    </motion.div>
  );
}
