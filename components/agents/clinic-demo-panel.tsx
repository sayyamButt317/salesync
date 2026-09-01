"use client";

import { Bell, Calendar, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import type { ClinicLeadExample } from "@/lib/ai-employees/types";
import { fadeUp } from "@/lib/motion/variants";
import { ScoreDisplay, TemperatureBadge } from "./lead-badges";

export interface ClinicDemoPanelProps {
  example: ClinicLeadExample;
  compact?: boolean;
}

export function ClinicDemoPanel({
  example,
  compact = false,
}: ClinicDemoPanelProps) {
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
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

        <div className="grid gap-2 rounded-xl border border-pink-100 bg-pink-50/40 p-4 text-sm">
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Treatment</span>
            <span className="font-semibold text-gray-900">
              {example.treatment}
            </span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-gray-500">Location</span>
            <span className="font-semibold text-gray-900">
              {example.location}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-gray-500">Preferred date</span>
            <span className="inline-flex items-center gap-1 font-semibold text-gray-900">
              <Calendar className="h-3.5 w-3.5 text-pink-600" />
              {example.preferredDate}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-pink-100 pt-2">
            <span className="text-gray-500">Booking readiness</span>
            <ScoreDisplay score={example.score} />
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-bold text-gray-400 uppercase">
            Why this patient is ready
          </p>
          <ul className="space-y-1.5">
            {example.detectedSignals.map((signal) => (
              <li
                key={signal}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span className="text-green-600">✓</span>
                {signal}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-violet-100 bg-violet-50/50 p-4">
          <p className="text-xs font-bold text-violet-800 uppercase">
            Suggested next step
          </p>
          <p className="mt-2 text-sm font-medium text-gray-800">
            {example.aiRecommendation}
          </p>
          <span className="mt-3 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold text-white">
            <Bell className="h-3.5 w-3.5" />
            Notify front desk
          </span>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
          <p className="mb-2 text-xs font-bold text-gray-400 uppercase">
            Alert your team will receive
          </p>
          <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-gray-700">
            {example.notificationPreview}
          </pre>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="grid gap-6 lg:grid-cols-2"
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-pink-100 text-sm font-bold text-pink-700">
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

        <div className="mt-5 space-y-3">
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-500">Treatment</span>
            <span className="font-semibold text-gray-900">
              {example.treatment}
            </span>
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-500">Location</span>
            <span className="font-semibold text-gray-900">
              {example.location}
            </span>
          </div>
          <div className="flex justify-between gap-4 text-sm">
            <span className="text-gray-500">Preferred date</span>
            <span className="font-semibold text-gray-900">
              {example.preferredDate}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Priority</span>
            <TemperatureBadge temperature={example.temperature} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-gray-500">Booking readiness</span>
            <ScoreDisplay score={example.score} />
          </div>
        </div>

        <div className="mt-5 border-t border-gray-100 pt-4">
          <p className="mb-2 text-xs font-bold text-gray-400 uppercase">
            Why this patient is ready
          </p>
          <ul className="space-y-1.5">
            {example.detectedSignals.map((signal) => (
              <li
                key={signal}
                className="flex items-center gap-2 text-sm text-gray-700"
              >
                <span className="text-green-600">✓</span>
                {signal}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-2xl border border-pink-100 bg-pink-50/50 p-5">
          <p className="text-xs font-bold text-pink-800 uppercase">
            Suggested next step
          </p>
          <p className="mt-2 text-sm font-medium text-gray-800">
            {example.aiRecommendation}
          </p>
          <button
            type="button"
            className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-violet-700"
          >
            <Bell className="h-4 w-4" />
            Notify front desk
          </button>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
          <p className="mb-2 text-xs font-bold text-gray-400 uppercase">
            Alert your team will receive
          </p>
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-gray-700">
            {example.notificationPreview}
          </pre>
        </div>
      </div>
    </motion.div>
  );
}
