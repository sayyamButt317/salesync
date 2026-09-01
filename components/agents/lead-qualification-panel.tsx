"use client";

import { MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import type { RealEstateLeadExample } from "@/lib/ai-employees/types";
import { fadeUp } from "@/lib/motion/variants";
import { AiActionsList } from "./ai-actions-list";
import { ScoreDisplay, TemperatureBadge } from "./lead-badges";

export interface LeadQualificationPanelProps {
  example: RealEstateLeadExample;
  compact?: boolean;
}

export function LeadQualificationPanel({
  example,
  compact = false,
}: LeadQualificationPanelProps) {
  if (compact) {
    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="space-y-4"
      >
        <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
            {example.contactName.charAt(0)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-bold text-gray-900">{example.contactName}</p>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <MessageCircle className="h-3.5 w-3.5 text-green-600" />
              Messaged via {example.source}
            </p>
          </div>
          <TemperatureBadge temperature={example.temperature} />
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-sm font-bold text-red-800">{example.headline}</p>
          <p className="mt-1 text-xs text-red-600">
            Everything collected—you don&apos;t need to read the chat.
          </p>
        </div>

        <dl className="grid gap-2">
          {example.fields.map((field) => (
            <div
              key={field.id}
              className="flex justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm"
            >
              <dt className="text-gray-500">{field.label}</dt>
              <dd className="font-semibold text-gray-900">{field.value}</dd>
            </div>
          ))}
        </dl>

        <div className="flex items-center justify-between rounded-xl border border-violet-100 bg-violet-50/50 px-4 py-3">
          <div>
            <p className="text-xs text-gray-500">Lead score</p>
            <ScoreDisplay score={example.score} />
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white">
            <Phone className="h-3.5 w-3.5" />
            Call now
          </span>
        </div>

        <AiActionsList actions={example.actions} title="Already done for you" />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="grid gap-6 lg:grid-cols-5"
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-2">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
            {example.contactName.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{example.contactName}</p>
            <p className="flex items-center gap-1 text-xs text-gray-500">
              <MessageCircle className="h-3.5 w-3.5 text-green-600" />
              Messaged via {example.source}
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
          <p className="text-sm font-bold text-red-800">{example.headline}</p>
          <p className="mt-1 text-xs text-red-600">
            Everything collected—you don&apos;t need to read the chat.
          </p>
        </div>
      </div>

      <div className="space-y-4 lg:col-span-3">
        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="mb-4 text-xs font-bold tracking-wide text-gray-400 uppercase">
            Lead summary
          </p>
          <div className="mb-4 flex flex-wrap items-center gap-4">
            <div>
              <p className="text-xs text-gray-500">Priority</p>
              <TemperatureBadge temperature={example.temperature} />
            </div>
            <div>
              <p className="text-xs text-gray-500">Score</p>
              <ScoreDisplay score={example.score} />
            </div>
          </div>
          <dl className="grid gap-2.5 sm:grid-cols-2">
            {example.fields.map((field) => (
              <div
                key={field.id}
                className="flex justify-between gap-2 rounded-lg bg-gray-50 px-3 py-2 text-sm"
              >
                <dt className="text-gray-500">{field.label}</dt>
                <dd className="font-semibold text-gray-900">{field.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <AiActionsList actions={example.actions} title="Already done for you" />
        </div>
      </div>
    </motion.div>
  );
}
