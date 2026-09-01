"use client";

import { motion } from "framer-motion";
import type { AiEmployee } from "@/lib/ai-employees/types";
import { fadeUp } from "@/lib/motion/variants";

export interface EmployeeProductCardProps {
  employee: AiEmployee;
  onSelect?: (id: AiEmployee["id"]) => void;
}

export function EmployeeProductCard({
  employee,
  onSelect,
}: EmployeeProductCardProps) {
  return (
    <motion.article
      data-employee-card
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={fadeUp}
      whileHover={{ y: -4 }}
      className={`flex h-full cursor-pointer flex-col rounded-2xl border border-gray-100 bg-gradient-to-br ${employee.gradient} p-6 shadow-sm transition-shadow hover:shadow-lg`}
      onClick={() => onSelect?.(employee.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          onSelect?.(employee.id);
        }
      }}
    >
      <span className="text-3xl" aria-hidden>
        {employee.emoji}
      </span>
      <h3 className="mt-4 text-xl font-bold text-gray-900">
        {employee.shortName}
      </h3>
      <p className="mt-1 text-sm font-semibold text-gray-600">
        {employee.tagline}
      </p>

      <div className="mt-4 rounded-xl border border-red-100/80 bg-white/70 px-3 py-2.5">
        <p className="text-xs font-bold text-red-700/80 uppercase tracking-wide">
          Your problem
        </p>
        <p className="mt-1 text-sm leading-relaxed text-gray-700">
          {employee.painPoint}
        </p>
      </div>

      <div
        className="mt-3 flex-1 rounded-xl border px-3 py-2.5"
        style={{
          borderColor: `${employee.accentColor}25`,
          backgroundColor: `${employee.accentColor}08`,
        }}
      >
        <p
          className="text-xs font-bold uppercase tracking-wide"
          style={{ color: employee.accentColor }}
        >
          What you get
        </p>
        <p className="mt-1 text-sm font-medium leading-relaxed text-gray-800">
          {employee.outcome}
        </p>
      </div>
    </motion.article>
  );
}
