"use client";

import { ChevronDown, Plus, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui";
import { fadeUp } from "@/lib/motion/variants";

export interface KnowledgeBaseHeaderProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function KnowledgeBaseHeader({
  search,
  onSearchChange,
}: KnowledgeBaseHeaderProps) {
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
          Knowledge Base
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Upload, organize and manage the knowledge your AI agents use to talk to
          your customers.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative w-56 max-w-full">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search knowledge..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
        >
          <SlidersHorizontal className="h-4 w-4 text-gray-400" />
          Filters
        </button>
        <Button icon={Plus} iconPosition="left">
          Upload
          <ChevronDown className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
}
