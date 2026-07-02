"use client";

import { Calendar, ChevronDown, MoreHorizontal, Search } from "lucide-react";
import { motion } from "framer-motion";
import {
  Avatar,
  Card,
  Pagination,
  Tabs,
  TaskPriorityIndicator,
  TaskStatusBadge,
} from "@/components/ui";
import { ASSOCIATED_ICONS, SORT_OPTIONS } from "@/lib/tasks/data";
import type { TaskRecord, TaskSort, TaskTab } from "@/lib/tasks/types";
import { TASK_TAB_LABELS } from "@/lib/tasks/types";
import { staggerContainer, tableRow } from "@/lib/motion/variants";

const TABLE_TABS = (Object.keys(TASK_TAB_LABELS) as TaskTab[]).map((id) => ({
  id,
  label: TASK_TAB_LABELS[id].label,
}));

export interface TasksTableProps {
  records: TaskRecord[];
  tab: TaskTab;
  search: string;
  sort: TaskSort;
  page: number;
  pageSize: number;
  totalItems: number;
  onTabChange: (tab: TaskTab) => void;
  onSearchChange: (search: string) => void;
  onSortChange: (sort: TaskSort) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function TasksTable({
  records,
  tab,
  search,
  sort,
  page,
  pageSize,
  totalItems,
  onTabChange,
  onSearchChange,
  onSortChange,
  onPageChange,
  onPageSizeChange,
}: TasksTableProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 pt-2">
        <Tabs
          tabs={TABLE_TABS}
          value={tab}
          onChange={onTabChange}
          layoutId="task-tab"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-3">
        <div className="relative max-w-sm min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search tasks..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2 pr-4 pl-9 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition-colors focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 transition-colors hover:bg-gray-50"
            aria-label="Calendar"
          >
            <Calendar className="h-4 w-4" />
          </button>

          <div className="relative">
            <select
              value={sort}
              onChange={(event) => onSortChange(event.target.value as TaskSort)}
              className="cursor-pointer appearance-none rounded-xl border border-gray-200 bg-white py-2 pr-9 pl-3 text-sm font-medium text-gray-700 outline-none transition-colors hover:border-gray-300 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              <th className="w-10 px-5 py-3">
                <input type="checkbox" className="rounded border-gray-300" />
              </th>
              <th className="px-5 py-3">Task</th>
              <th className="px-5 py-3">Associated With</th>
              <th className="px-5 py-3">Assignee</th>
              <th className="px-5 py-3">Due Date</th>
              <th className="px-5 py-3">Priority</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3" />
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            key={`${tab}-${page}-${search}-${sort}`}
          >
            {records.map((record) => {
              const AssociatedIcon = ASSOCIATED_ICONS[record.associatedType];

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
                    <p className="font-semibold text-gray-900">{record.title}</p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {record.description}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-sm text-gray-700">
                      <AssociatedIcon className="h-3.5 w-3.5 text-gray-400" />
                      {record.associatedName}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <Avatar initials={record.assigneeInitials} size="sm" />
                      <span className="text-sm font-medium text-gray-700">
                        {record.assigneeName}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <p
                      className={`font-medium ${
                        record.isDueUrgent ? "text-red-600" : "text-gray-800"
                      }`}
                    >
                      {record.dueDate}
                    </p>
                    <p className="text-xs text-gray-500">
                      {record.dueTime}
                      {record.dueLabel ? ` · ${record.dueLabel}` : ""}
                    </p>
                  </td>
                  <td className="px-5 py-3.5">
                    <TaskPriorityIndicator priority={record.priority} />
                  </td>
                  <td className="px-5 py-3.5">
                    <TaskStatusBadge status={record.status} />
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
        itemLabel="tasks"
      />
    </Card>
  );
}
