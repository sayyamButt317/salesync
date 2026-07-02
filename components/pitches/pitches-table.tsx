"use client";

import { ChevronDown, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, Card, Pagination, ProgressBar, StatusBadge, Tabs } from "@/components/ui";
import type { PitchRecord, PitchTab } from "@/lib/pitches/types";
import { PITCH_TAB_LABELS } from "@/lib/pitches/types";
import { staggerContainer, tableRow } from "@/lib/motion/variants";

const TABLE_TABS = (Object.keys(PITCH_TAB_LABELS) as PitchTab[]).map((id) => ({
  id,
  label: PITCH_TAB_LABELS[id],
}));

export interface PitchesTableProps {
  records: PitchRecord[];
  tab: PitchTab;
  search: string;
  page: number;
  pageSize: number;
  totalItems: number;
  onTabChange: (tab: PitchTab) => void;
  onSearchChange: (search: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function PitchesTable({
  records,
  tab,
  search,
  page,
  pageSize,
  totalItems,
  onTabChange,
  onSearchChange,
  onPageChange,
  onPageSizeChange,
}: PitchesTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <Card padding="none" className="mb-6 overflow-hidden">
      <div className="px-5 pt-2">
        <Tabs tabs={TABLE_TABS} value={tab} onChange={onTabChange} layoutId="pitch-tab" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
        <div className="relative min-w-[200px] flex-1 max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search pitches..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            aria-label="Filter"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-50"
          >
            Newest First
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              <th className="px-5 py-3">Pitch Title</th>
              <th className="px-5 py-3">Agency</th>
              <th className="px-5 py-3">Recipient</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Sent On</th>
              <th className="px-5 py-3">Last Activity</th>
              <th className="px-5 py-3">Reply Rate</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            key={`${tab}-${page}-${search}`}
          >
            {records.map((record) => (
              <motion.tr
                key={record.id}
                variants={tableRow}
                whileHover={{ backgroundColor: "rgba(249,250,251,0.9)" }}
                className="border-b border-gray-50 last:border-b-0"
              >
                <td className="px-5 py-3.5">
                  <p className="font-semibold text-gray-900">{record.title}</p>
                  <p className="text-xs text-gray-500">{record.agentType}</p>
                </td>
                <td className="px-5 py-3.5 font-medium text-gray-700">
                  {record.agency}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2.5">
                    <Avatar initials={record.recipientInitials} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-gray-900">
                        {record.recipientName}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {record.recipientEmail}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <StatusBadge status={record.status} />
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-gray-600">
                  {record.sentOn}
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-gray-500">
                  {record.lastActivity}
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex min-w-[100px] items-center gap-2">
                    <ProgressBar
                      value={record.replyRate}
                      color="#7c3aed"
                      className="flex-1"
                    />
                    <span className="w-8 text-xs font-semibold text-gray-600">
                      {record.replyRate}%
                    </span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <button
                    type="button"
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
                    aria-label="Actions"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
      />
    </Card>
  );
}
