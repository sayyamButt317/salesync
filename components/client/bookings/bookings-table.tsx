"use client";

import {
  Bot,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Avatar,
  BookingLabelBadge,
  BookingStatusBadge,
  Card,
  Pagination,
  Tabs,
} from "@/components/ui";
import {
  MEETING_TYPE_ICONS,
  SORT_OPTIONS,
  SOURCE_COLORS,
  SOURCE_ICONS,
} from "@/lib/client-bookings/data";
import type {
  BookingRecord,
  BookingSort,
  BookingTab,
} from "@/lib/client-bookings/types";
import { BOOKING_TAB_LABELS } from "@/lib/client-bookings/types";
import { staggerContainer, tableRow } from "@/lib/motion/variants";
import { BookingsFilterBar } from "./bookings-filter-bar";

const TABLE_TABS = (Object.keys(BOOKING_TAB_LABELS) as BookingTab[]).map(
  (id) => ({
    id,
    label: BOOKING_TAB_LABELS[id].label,
  }),
);

export interface BookingsTableProps {
  records: BookingRecord[];
  tab: BookingTab;
  sort: BookingSort;
  selectedId: string | null;
  page: number;
  pageSize: number;
  totalItems: number;
  onTabChange: (tab: BookingTab) => void;
  onSortChange: (sort: BookingSort) => void;
  onSelect: (id: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function BookingsTable({
  records,
  tab,
  sort,
  selectedId,
  page,
  pageSize,
  totalItems,
  onTabChange,
  onSortChange,
  onSelect,
  onPageChange,
  onPageSizeChange,
}: BookingsTableProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 pt-2">
        <Tabs
          tabs={TABLE_TABS}
          value={tab}
          onChange={onTabChange}
          layoutId="bookings-tab"
        />
      </div>

      <BookingsFilterBar viewMode={viewMode} onViewModeChange={setViewMode} />

      <div className="flex items-center justify-end border-b border-gray-100 px-5 py-2">
        <div className="relative">
          <select
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as BookingSort)
            }
            className="cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pr-8 pl-3 text-xs font-medium text-gray-600 outline-none"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                Sort by: {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              <th className="px-5 py-3">Booking</th>
              <th className="px-5 py-3">Contact</th>
              <th className="px-5 py-3">Agent</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Date &amp; Time</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            key={`${tab}-${page}-${sort}`}
          >
            {records.map((record) => {
              const SourceIcon = SOURCE_ICONS[record.source];
              const MeetingIcon = MEETING_TYPE_ICONS[record.meetingType];
              const isSelected = selectedId === record.id;

              return (
                <motion.tr
                  key={record.id}
                  variants={tableRow}
                  onClick={() => onSelect(record.id)}
                  className={`cursor-pointer border-b border-gray-50 last:border-b-0 ${
                    isSelected ? "bg-violet-50/60" : ""
                  }`}
                  whileHover={{
                    backgroundColor: isSelected
                      ? "rgba(245,243,255,0.8)"
                      : "rgba(249,250,251,0.9)",
                  }}
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar
                        initials={record.initials}
                        size="md"
                        color={record.avatarColor}
                      />
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-semibold text-gray-900">
                            {record.name}
                          </span>
                          {record.label ? (
                            <BookingLabelBadge label={record.label} />
                          ) : null}
                        </div>
                        <p className="text-xs text-gray-500">{record.purpose}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs text-gray-700">{record.email}</p>
                    <p className="text-xs text-gray-400">{record.phone}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50">
                        <Bot className="h-3.5 w-3.5 text-violet-600" />
                      </div>
                      <p className="text-xs font-medium text-gray-800">
                        {record.agentName}
                      </p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-700">
                      <MeetingIcon className="h-3.5 w-3.5 text-gray-400" />
                      {record.meetingType}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <p className="text-xs font-medium text-gray-800">
                      {record.date}
                    </p>
                    <p className="text-xs text-gray-400">{record.time}</p>
                  </td>
                  <td className="px-5 py-3.5">
                    <BookingStatusBadge status={record.status} />
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-xs text-gray-700">
                      <SourceIcon
                        className="h-3.5 w-3.5"
                        style={{ color: SOURCE_COLORS[record.source] }}
                      />
                      {record.source}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <button
                      type="button"
                      onClick={(event) => event.stopPropagation()}
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
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
        itemLabel="bookings"
      />
    </Card>
  );
}
