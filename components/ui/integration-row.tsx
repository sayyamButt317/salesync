"use client";

import type { ReactNode } from "react";
import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export interface IntegrationRowProps {
  icon: ReactNode;
  name: string;
  connected?: boolean;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function IntegrationRow({
  icon,
  name,
  connected = false,
  onConnect,
  onDisconnect,
}: IntegrationRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5">
      <div className="flex items-center gap-3">
        {icon}
        <span className="text-sm font-medium text-gray-900">{name}</span>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={connected ? onDisconnect : onConnect}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg border px-3.5 py-1.5 text-xs font-semibold transition-colors ${
          connected
            ? "border-green-200 bg-green-50 text-green-700"
            : "border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50"
        }`}
      >
        <AnimatePresence mode="wait" initial={false}>
          {connected ? (
            <motion.span
              key="connected"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
              className="inline-flex items-center gap-1.5"
            >
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
              Connected
            </motion.span>
          ) : (
            <motion.span
              key="connect"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 500, damping: 28 }}
            >
              Connect
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
