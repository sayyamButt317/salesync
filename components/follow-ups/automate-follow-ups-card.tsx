"use client";

import { Bot, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Card } from "@/components/ui";
import { fadeUp } from "@/lib/motion/variants";

export function AutomateFollowUpsCard() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card className="relative overflow-hidden bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="absolute top-3 right-3 opacity-20">
          <Sparkles className="h-16 w-16 text-violet-600" />
        </div>
        <div className="relative flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 shadow-sm shadow-violet-600/25">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Automate Follow Ups
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Let your agent send timely follow-ups automatically based on
              reply patterns and timezone.
            </p>
            <Button size="sm" className="mt-4">
              Create Automation
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
