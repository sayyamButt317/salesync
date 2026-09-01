"use client";

import { Check, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { COMPARISON_ROWS } from "@/lib/pricing/data";
import { fadeUp } from "@/lib/motion/variants";
import { SectionHeader } from "@/components/landing/section-header";

const PLAN_COLUMNS = ["starter", "growth", "business", "enterprise"] as const;

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="mx-auto h-4 w-4 text-violet-600" />
    ) : (
      <Minus className="mx-auto h-4 w-4 text-gray-300" />
    );
  }

  return <span className="text-sm font-medium text-gray-700">{value}</span>;
}

export function ComparisonTable() {
  return (
    <section className="bg-gray-50/60 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="mb-10 flex justify-center"
        >
          <SectionHeader
            title="Compare plans"
            description="Everything you need to hire and scale your AI workforce."
          />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm"
        >
          <table className="w-full min-w-[720px] text-left">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/80">
                <th className="px-5 py-4 text-sm font-semibold text-gray-500">
                  Feature
                </th>
                <th className="px-5 py-4 text-center text-sm font-bold text-gray-900">
                  Starter
                </th>
                <th className="px-5 py-4 text-center text-sm font-bold text-violet-700">
                  Growth ⭐
                </th>
                <th className="px-5 py-4 text-center text-sm font-bold text-gray-900">
                  Business
                </th>
                <th className="px-5 py-4 text-center text-sm font-bold text-gray-900">
                  Enterprise
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-gray-50 last:border-b-0"
                >
                  <td className="px-5 py-3.5 text-sm font-medium text-gray-600">
                    {row.label}
                  </td>
                  {PLAN_COLUMNS.map((col) => (
                    <td
                      key={col}
                      className={`px-5 py-3.5 text-center ${
                        col === "growth" ? "bg-violet-50/40" : ""
                      }`}
                    >
                      <CellValue value={row[col]} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}
