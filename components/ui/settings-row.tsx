"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import type { SettingsRowVariant } from "@/lib/settings/types";

export interface SettingsRowProps {
  label: string;
  value?: string;
  actionLabel?: string;
  variant?: SettingsRowVariant;
  onClick?: () => void;
}

const valueStyles: Record<SettingsRowVariant, string> = {
  default: "text-gray-600",
  link: "text-violet-600",
  danger: "text-red-600",
  success: "text-green-600",
};

export function SettingsRow({
  label,
  value,
  actionLabel,
  variant = "default",
  onClick,
}: SettingsRowProps) {
  const displayText = actionLabel ?? value;
  const hasAction = Boolean(onClick) || Boolean(actionLabel);

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ backgroundColor: "rgba(249,250,251,0.9)" }}
      className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-3.5 text-left transition-colors"
    >
      <span className="text-sm font-medium text-gray-800">{label}</span>
      <span className="flex shrink-0 items-center gap-2">
        {displayText ? (
          <span
            className={`text-sm font-medium ${
              variant !== "default"
                ? valueStyles[variant]
                : actionLabel
                  ? "text-violet-600 hover:underline"
                  : "text-gray-500"
            }`}
          >
            {displayText}
          </span>
        ) : null}
        {hasAction || value ? (
          <ChevronRight className="h-4 w-4 text-gray-300" />
        ) : null}
      </span>
    </motion.button>
  );
}
