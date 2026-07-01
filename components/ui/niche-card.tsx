"use client";

import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface NicheCardProps {
  id: string;
  label: string;
  icon: LucideIcon;
  selected?: boolean;
  onToggle?: (id: string) => void;
}

export function NicheCard({
  id,
  label,
  icon: Icon,
  selected = false,
  onToggle,
}: NicheCardProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onToggle?.(id)}
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`relative flex cursor-pointer flex-col items-center gap-2.5 rounded-xl border px-3 py-5 transition-colors ${
        selected
          ? "border-violet-400 bg-violet-50 shadow-sm shadow-violet-100"
          : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <AnimatePresence>
        {selected ? (
          <motion.span
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-violet-600"
          >
            <Check className="h-3 w-3 text-white" strokeWidth={3} />
          </motion.span>
        ) : null}
      </AnimatePresence>

      <Icon
        className={`h-6 w-6 ${selected ? "text-violet-600" : "text-gray-400"}`}
      />
      <span
        className={`text-center text-xs font-medium ${
          selected ? "text-violet-700" : "text-gray-700"
        }`}
      >
        {label}
      </span>
    </motion.button>
  );
}
