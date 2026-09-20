"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface IntegrationCardProps {
  name: string;
  description: string;
  icon: ReactNode;
  connected?: boolean;
  loading?: boolean;
  onToggle?: () => void;
}

export function IntegrationCard({
  name,
  description,
  icon,
  connected = false,
  loading = false,
  onToggle,
}: IntegrationCardProps) {
  return (
    <motion.div
      layout
      className={`flex h-full flex-col rounded-2xl border bg-white p-5 transition-colors ${
        connected
          ? "border-green-200 shadow-sm shadow-green-50"
          : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        {icon}
        <AnimatePresence>
          {connected ? (
            <motion.span
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            </motion.span>
          ) : null}
        </AnimatePresence>
      </div>

      <h3 className="text-sm font-semibold text-gray-900">{name}</h3>
      <p className="mt-1 flex-1 text-xs leading-relaxed text-gray-500">
        {description}
      </p>

      <button
        type="button"
        disabled={loading}
        onClick={onToggle}
        className={`mt-5 inline-flex w-full cursor-pointer items-center justify-center rounded-xl px-3 py-2 text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
          connected
            ? "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
            : "border border-gray-200 bg-gray-50 text-gray-800 hover:border-gray-300 hover:bg-white"
        }`}
      >
        {loading ? "Connecting…" : connected ? "Connected" : "Connect"}
      </button>
    </motion.div>
  );
}
