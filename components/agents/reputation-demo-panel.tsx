"use client";

import { AlertTriangle, Bell, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { ReputationReviewExample } from "@/lib/ai-employees/types";
import { fadeUp } from "@/lib/motion/variants";

export interface ReputationDemoPanelProps {
  example: ReputationReviewExample;
  compact?: boolean;
}

export function ReputationDemoPanel({
  example,
  compact = false,
}: ReputationDemoPanelProps) {
  if (compact) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="space-y-4"
      >
        <div className="rounded-xl border border-red-100 bg-red-50/50 p-4">
          <p className="text-xs font-bold text-red-700 uppercase">
            New review — needs your attention
          </p>
          <p className="mt-2 text-sm font-bold text-gray-900">
            ⭐ {example.rating}/{example.maxRating} — Customer complained about{" "}
            {example.issue.toLowerCase()}
          </p>
        </div>

        <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-600" />
            <p className="text-xs font-bold text-violet-800 uppercase">
              Reply ready for you
            </p>
          </div>
          <p className="text-sm leading-relaxed text-gray-700">
            {example.aiReply}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white">
              <Check className="h-3 w-3" />
              Approve & publish
            </span>
            <span className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-600">
              Edit first
            </span>
          </div>
        </div>

        <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-xs font-bold text-amber-800">
                {example.recurringInsight}
              </p>
              <p className="mt-1 text-xs text-amber-900/80">
                {example.recommendedAction}
              </p>
            </div>
          </div>
        </div>

        {example.whatsappAlertSent ? (
          <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-3 py-2.5 text-xs font-medium text-green-700">
            <Bell className="h-3.5 w-3.5" />
            Alert sent to your phone
          </div>
        ) : null}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="grid gap-4 lg:grid-cols-2"
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <p className="mb-4 text-xs font-bold tracking-wide text-gray-400 uppercase">
          New review alert
        </p>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-gray-500">Rating</span>
            <span className="font-bold text-red-600">
              ⭐ {example.rating}/{example.maxRating} — {example.sentiment}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Issue</span>
            <span className="font-medium text-gray-800">{example.issue}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Urgency</span>
            <span className="font-medium text-gray-800">{example.urgency}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-5">
          <div className="mb-2 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-violet-600" />
            <p className="text-xs font-bold text-violet-800 uppercase">
              Reply ready for you
            </p>
          </div>
          <p className="text-sm leading-relaxed text-gray-700">
            {example.aiReply}
          </p>
        </div>

        <div className="rounded-2xl border border-amber-100 bg-amber-50/60 p-4">
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
            <div>
              <p className="text-xs font-bold text-amber-800 uppercase">
                What to do next
              </p>
              <p className="mt-1 text-sm text-amber-900">
                {example.recommendedAction}
              </p>
            </div>
          </div>
        </div>

        {example.whatsappAlertSent ? (
          <div className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            <Bell className="h-4 w-4" />
            Alert sent to your phone
          </div>
        ) : null}
      </div>

      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-violet-200 bg-gradient-to-r from-violet-50 to-fuchsia-50 p-5">
          <p className="text-sm font-bold text-violet-900">
            {example.recurringInsight}
          </p>
          <p className="mt-1 text-sm text-gray-500">{example.whyItMatters}</p>
        </div>
      </div>
    </motion.div>
  );
}
