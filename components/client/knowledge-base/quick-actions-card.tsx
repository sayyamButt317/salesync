"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui";
import type { QuickAction } from "@/lib/knowledge-base/types";
import { fadeUp } from "@/lib/motion/variants";

export interface QuickActionsCardProps {
  actions: QuickAction[];
}

export function QuickActionsCard({ actions }: QuickActionsCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card>
        <h3 className="mb-3 text-sm font-bold text-gray-900">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-2.5">
          {actions.map((action) => {
            const Icon = action.icon;

            return (
              <motion.button
                key={action.id}
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="flex cursor-pointer flex-col items-center gap-2 rounded-xl border border-gray-100 bg-white px-2 py-3 text-center transition-colors hover:border-violet-200 hover:bg-violet-50/40"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-medium leading-tight text-gray-600">
                  {action.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
