"use client";

import {
  Bot,
  ChevronDown,
  LayoutGrid,
  List,
  MoreHorizontal,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Avatar,
  Card,
  LeadScoreIndicator,
  LeadStatusBadge,
  Pagination,
  Tabs,
} from "@/components/ui";
import { SORT_OPTIONS, SOURCE_COLORS, SOURCE_ICONS } from "@/lib/client-leads/data";
import type { LeadRecord, LeadSort, LeadTab } from "@/lib/client-leads/types";
import { LEAD_TAB_LABELS, getLeadScoreLevel } from "@/lib/client-leads/types";
import { staggerContainer, tableRow } from "@/lib/motion/variants";

const TABLE_TABS = (Object.keys(LEAD_TAB_LABELS) as LeadTab[]).map((id) => ({
  id,
  label: LEAD_TAB_LABELS[id].label,
}));

export interface LeadsTableProps {
  records: LeadRecord[];
  tab: LeadTab;
  tableSearch: string;
  sort: LeadSort;
  selectedId: string | null;
  page: number;
  pageSize: number;
  totalItems: number;
  onTabChange: (tab: LeadTab) => void;
  onTableSearchChange: (search: string) => void;
  onSortChange: (sort: LeadSort) => void;
  onSelect: (id: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function LeadsTable({
  records,
  tab,
  tableSearch,
  sort,
  selectedId,
  page,
  pageSize,
  totalItems,
  onTabChange,
  onTableSearchChange,
  onSortChange,
  onSelect,
  onPageChange,
  onPageSizeChange,
}: LeadsTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 pt-2">
        <Tabs
          tabs={TABLE_TABS}
          value={tab}
          onChange={onTabChange}
          layoutId="leads-tab"
        />
      </div>

      <div className="space-y-3 border-b border-gray-100 px-5 py-3">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={tableSearch}
            onChange={(event) => onTableSearchChange(event.target.value)}
            placeholder="Search in table..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {["Agents", "Source", "Status", "Lead Score"].map((filter) => (
            <button
              key={filter}
              type="button"
              className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
            >
              {filter}
              <ChevronDown className="h-3 w-3" />
            </button>
          ))}
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50"
          >
            <SlidersHorizontal className="h-3 w-3" />
            More Filters
          </button>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <select
                value={sort}
                onChange={(event) =>
                  onSortChange(event.target.value as LeadSort)
                }
                className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-1.5 pr-8 pl-3 text-xs font-medium text-gray-700 outline-none"
              >
                {SORT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    Sort by: {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-2 h-3 w-3 -translate-y-1/2 text-gray-400" />
            </div>
            <div className="flex items-center gap-0.5 rounded-lg border border-gray-200 p-0.5">
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md bg-violet-50 text-violet-600"
                aria-label="List view"
              >
                <List className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 hover:bg-gray-50"
                aria-label="Grid view"
              >
                <LayoutGrid className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              <th className="px-5 py-3">Lead</th>
              <th className="px-5 py-3">Source</th>
              <th className="px-5 py-3">Agent</th>
              <th className="px-5 py-3">Lead Score</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3">Last Activity</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            key={`${tab}-${page}-${sort}-${tableSearch}`}
          >
            {records.map((record) => {
              const SourceIcon = SOURCE_ICONS[record.source];
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
                          {record.tag ? (
                            <span className="rounded-md bg-orange-50 px-1.5 py-0.5 text-[10px] font-semibold text-orange-700">
                              {record.tag}
                            </span>
                          ) : null}
                        </div>
                        <p className="text-xs text-gray-500">{record.email}</p>
                        <p className="text-xs text-gray-400">{record.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                      <SourceIcon
                        className="h-3.5 w-3.5"
                        style={{ color: SOURCE_COLORS[record.source] }}
                      />
                      {record.source}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-50">
                        <Bot className="h-3.5 w-3.5 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800">
                          {record.agentName}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {record.agentRole}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <LeadScoreIndicator
                      score={record.leadScore}
                      level={getLeadScoreLevel(record.leadScore)}
                    />
                  </td>
                  <td className="px-5 py-3.5">
                    <LeadStatusBadge status={record.status} />
                  </td>
                  <td className="px-5 py-3.5 text-xs text-gray-500">
                    {record.lastActivity}
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
        itemLabel="leads"
      />
    </Card>
  );
}
