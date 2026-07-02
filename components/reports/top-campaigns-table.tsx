"use client";

import { motion } from "framer-motion";
import { ChartContainer, ProgressBar } from "@/components/ui";
import type { CampaignReport } from "@/lib/reports/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface TopCampaignsTableProps {
  campaigns: CampaignReport[];
}

export function TopCampaignsTable({ campaigns }: TopCampaignsTableProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <ChartContainer
        title="Top Performing Campaigns"
        dropdownLabel="This Month"
        footer={
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
          >
            View all campaigns →
          </button>
        }
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
                <th className="px-5 py-3">Campaign</th>
                <th className="px-5 py-3">Pitches Sent</th>
                <th className="px-5 py-3">Replies</th>
                <th className="px-5 py-3">Reply Rate</th>
                <th className="px-5 py-3">Meetings</th>
                <th className="px-5 py-3">Conversion Rate</th>
              </tr>
            </thead>
            <motion.tbody
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              {campaigns.map((campaign) => {
                const Icon = campaign.icon;

                return (
                  <motion.tr
                    key={campaign.id}
                    variants={tableRow}
                    whileHover={{ backgroundColor: "rgba(249,250,251,0.9)" }}
                    className="border-b border-gray-50 last:border-b-0"
                  >
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                          style={{ backgroundColor: campaign.iconBg }}
                        >
                          <Icon
                            className="h-4 w-4"
                            style={{ color: campaign.iconColor }}
                          />
                        </div>
                        <span className="font-medium text-gray-900">
                          {campaign.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700">
                      {campaign.pitchesSent}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700">
                      {campaign.replies}
                    </td>
                    <td className="min-w-[120px] px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="min-w-[60px] flex-1">
                          <ProgressBar
                            value={campaign.replyRate}
                            color="#7c3aed"
                          />
                        </div>
                        <span className="shrink-0 text-xs font-semibold text-gray-700">
                          {campaign.replyRate}%
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-700">
                      {campaign.meetings}
                    </td>
                    <td className="min-w-[120px] px-5 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="min-w-[60px] flex-1">
                          <ProgressBar
                            value={campaign.conversionRate}
                            color="#7c3aed"
                          />
                        </div>
                        <span className="shrink-0 text-xs font-semibold text-gray-700">
                          {campaign.conversionRate}%
                        </span>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </motion.tbody>
          </table>
        </div>
      </ChartContainer>
    </motion.div>
  );
}
