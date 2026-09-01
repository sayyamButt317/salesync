"use client";

import { ArrowRight, X } from "lucide-react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

export interface BeforeAfterPanelProps {
  withoutAgent: string;
  withAgent: string;
  youGet: string[];
  accentColor?: string;
}

export function BeforeAfterPanel({
  withoutAgent,
  withAgent,
  youGet,
  accentColor = "#7c3aed",
}: BeforeAfterPanelProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="grid gap-6 lg:grid-cols-5"
    >
      <div className="rounded-2xl border border-red-100 bg-red-50/60 p-5 lg:col-span-2">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-100">
            <X className="h-4 w-4 text-red-600" />
          </div>
          <p className="text-sm font-bold text-red-800">Without this agent</p>
        </div>
        <p className="text-sm leading-relaxed text-red-900/80">{withoutAgent}</p>
      </div>

      <div className="hidden items-center justify-center lg:flex">
        <ArrowRight className="h-8 w-8 text-gray-300" aria-hidden />
      </div>

      <div
        className="rounded-2xl border p-5 lg:col-span-2"
        style={{
          borderColor: `${accentColor}30`,
          backgroundColor: `${accentColor}08`,
        }}
      >
        <div className="mb-3 flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accentColor}20` }}
          >
            <Check className="h-4 w-4" style={{ color: accentColor }} />
          </div>
          <p className="text-sm font-bold" style={{ color: accentColor }}>
            With this agent
          </p>
        </div>
        <p className="text-sm leading-relaxed text-gray-800">{withAgent}</p>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:col-span-5">
        <p className="mb-4 text-xs font-bold tracking-wide text-gray-400 uppercase">
          What you get
        </p>
        <ul className="grid gap-3 sm:grid-cols-2">
          {youGet.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0"
                style={{ color: accentColor }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
