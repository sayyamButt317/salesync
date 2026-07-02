"use client";

import { motion } from "framer-motion";
import { AgentStatusBadge, Card } from "@/components/ui";
import type { TopAgent } from "@/lib/client-dashboard/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";
import { MiniSparkline } from "./mini-sparkline";

export interface TopAgentsTableProps {
  agents: TopAgent[];
}

export function TopAgentsTable({ agents }: TopAgentsTableProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
          <h3 className="text-sm font-bold text-gray-900">
            Top Performing Agents
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                <th className="px-5 py-3">Agent</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Leads</th>
                <th className="px-5 py-3">Conversations</th>
                <th className="px-5 py-3">Bookings</th>
                <th className="px-5 py-3">AI Score</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {agents.map((agent) => {
                const Icon = agent.icon;

                return (
                  <motion.tr
                    key={agent.id}
                    variants={tableRow}
                    whileHover={{ backgroundColor: "rgba(249,250,251,0.9)" }}
                    className="border-b border-gray-50 last:border-b-0"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: agent.iconBg }}
                        >
                          <Icon
                            className="h-4 w-4"
                            style={{ color: agent.iconColor }}
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {agent.name}
                          </p>
                          <p className="text-xs text-gray-500">{agent.role}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <AgentStatusBadge status={agent.status} />
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700">
                      {agent.leads}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700">
                      {agent.conversations}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700">
                      {agent.bookings}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <MiniSparkline data={agent.sparkline} />
                        <span className="text-sm font-bold text-violet-600">
                          {agent.aiScore}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 bg-violet-50/50 px-5 py-4">
          <p className="text-sm font-medium text-gray-700">
            Your agents are working great! 🎉
          </p>
          <button
            type="button"
            className="cursor-pointer rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-colors hover:bg-violet-700"
          >
            View full report
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
