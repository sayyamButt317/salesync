"use client";

import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { SmartSuggestion } from "@/lib/follow-ups/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface SmartSuggestionsProps {
  suggestions: SmartSuggestion[];
}

export function SmartSuggestions({ suggestions }: SmartSuggestionsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">Smart Suggestions</h3>
        </div>
        <motion.ul
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="divide-y divide-gray-50"
        >
          {suggestions.map((item) => {
            const Icon = item.icon;

            return (
              <motion.li key={item.id} variants={tableRow}>
                <button
                  type="button"
                  className="flex w-full cursor-pointer items-center gap-3 px-5 py-3.5 text-left transition-colors hover:bg-gray-50"
                >
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                    style={{ backgroundColor: item.iconBg }}
                  >
                    <Icon
                      className="h-4 w-4"
                      style={{ color: item.iconColor }}
                    />
                  </div>
                  <span className="flex-1 text-sm text-gray-700">
                    {item.message}
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
                </button>
              </motion.li>
            );
          })}
        </motion.ul>
      </Card>
    </motion.div>
  );
}
