"use client";

import { ChevronRight, MoreHorizontal, Search, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import {
  Avatar,
  Card,
  FollowUpStatusBadge,
  Pagination,
  PriorityIndicator,
  Tabs,
} from "@/components/ui";
import { TYPE_ICONS } from "@/lib/follow-ups/data";
import type { FollowUpRecord, FollowUpTab } from "@/lib/follow-ups/types";
import { FOLLOW_UP_TAB_LABELS } from "@/lib/follow-ups/types";
import { staggerContainer, tableRow } from "@/lib/motion/variants";

const TABLE_TABS = (Object.keys(FOLLOW_UP_TAB_LABELS) as FollowUpTab[]).map(
  (id) => ({
    id,
    label: FOLLOW_UP_TAB_LABELS[id].label,
    badge: FOLLOW_UP_TAB_LABELS[id].badge,
  }),
);

export interface FollowUpsTableProps {
  records: FollowUpRecord[];
  tab: FollowUpTab;
  search: string;
  page: number;
  pageSize: number;
  totalItems: number;
  onTabChange: (tab: FollowUpTab) => void;
  onSearchChange: (search: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function FollowUpsTable({
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
}: FollowUpsTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 pt-2">
        <Tabs
          tabs={TABLE_TABS}
          value={tab}
          onChange={onTabChange}
          layoutId="follow-up-tab"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
        <div className="relative max-w-sm min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search follow ups..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>
        <button
          type="button"
          className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
          aria-label="Filter"
        >
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              <th className="w-10 px-5 py-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Agency</th>
              <th className="px-5 py-3">Relation</th>
              <th className="px-5 py-3">Next Follow Up</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            key={`${tab}-${page}-${search}`}
          >
            {records.map((record) => {
              const TypeIcon = TYPE_ICONS[record.type];

              return (
                <motion.tr
                  key={record.id}
                  variants={tableRow}
                  whileHover={{ backgroundColor: "rgba(249,250,251,0.9)" }}
                  className="border-b border-gray-50 last:border-b-0"
                >
                  <td className="px-5 py-3.5">
                    <input type="checkbox" className="rounded border-gray-300" />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar initials={record.initials} size="sm" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {record.contactName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {record.contactTitle}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 font-medium text-gray-700">
                    {record.agency}
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-sm text-gray-800">{record.campaign}</p>
                    <span className="mt-0.5 inline-flex rounded-md bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold text-violet-700">
                      Pitch
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p
                      className={`font-medium ${
                        record.isUrgent ? "text-red-600" : "text-gray-800"
                      }`}
                    >
                      {record.nextFollowUp}
                    </p>
                    <p className="text-xs text-gray-500">
                      {record.nextFollowUpTime}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-[11px] font-medium text-gray-700">
                      <TypeIcon className="h-3.5 w-3.5 text-violet-600" />
                      {record.type}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <FollowUpStatusBadge status={record.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <PriorityIndicator priority={record.priority} />
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
              );
            })}
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
