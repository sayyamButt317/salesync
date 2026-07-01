"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

export interface SummaryCardProps {
  title: string;
  children: ReactNode;
  onEdit?: () => void;
}

export function SummaryCard({ title, children, onEdit }: SummaryCardProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-3.5">
        <h4 className="text-sm font-bold text-gray-900">{title}</h4>
        {onEdit ? (
          <motion.button
            type="button"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onEdit}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-600 transition-colors hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
          >
            Edit
          </motion.button>
        ) : null}
      </div>
      <dl className="px-5">{children}</dl>
    </div>
  );
}
