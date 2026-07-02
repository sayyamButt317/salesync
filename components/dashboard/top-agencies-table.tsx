"use client";

import { motion } from "framer-motion";
import { Avatar, Card } from "@/components/ui";
import type { TopAgency } from "@/lib/dashboard/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface TopAgenciesTableProps {
  agencies: TopAgency[];
}

export function TopAgenciesTable({ agencies }: TopAgenciesTableProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.15 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">
            Top Performing Agencies
          </h3>
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
          >
            View all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                <th className="px-5 py-3">Agency</th>
                <th className="px-5 py-3">Conversations</th>
                <th className="px-5 py-3">Reply Rate</th>
                <th className="px-5 py-3">Deals</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {agencies.map((agency) => (
                <motion.tr
                  key={agency.id}
                  variants={tableRow}
                  className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/70"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar
                        initials={agency.initials}
                        size="sm"
                        color={agency.color}
                      />
                      <span className="font-semibold text-gray-900">
                        {agency.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-700">
                    {agency.conversations}
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-full rounded-full bg-violet-500"
                          style={{ width: `${agency.replyRate}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-600">
                        {agency.replyRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-700">
                    {agency.deals}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
