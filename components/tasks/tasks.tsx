"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout";
import {
  OVERDUE_TASKS,
  TASK_METRICS,
  TASK_PRIORITY_SUMMARY,
  TASK_RECORDS,
  TASK_SUMMARY_STATS,
  UPCOMING_TASKS,
} from "@/lib/tasks/data";
import type { TaskSort, TaskTab, TasksPageProps } from "@/lib/tasks/types";
import { TOTAL_TASKS_COUNT } from "@/lib/tasks/types";
import { filterTasks, sortTasks } from "@/lib/tasks/utils";
import { TasksHeader } from "./tasks-header";
import { TasksMetrics } from "./tasks-metrics";
import { TasksTable } from "./tasks-table";
import { TasksPriorityChart } from "./tasks-priority-chart";
import { UpcomingTasks } from "./upcoming-tasks";
import { OverdueTasks } from "./overdue-tasks";
import { TaskSummaryCard } from "./task-summary-card";

export function TasksPage({ activeNavId = "tasks" }: TasksPageProps) {
  const [tab, setTab] = useState<TaskTab>("all");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<TaskSort>("newest");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);

  const filtered = useMemo(() => {
    const results = filterTasks(TASK_RECORDS, tab, search);
    return sortTasks(results, sort);
  }, [tab, search, sort]);

  const totalItems =
    search || tab !== "all" ? filtered.length : TOTAL_TASKS_COUNT;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  const handleTabChange = (nextTab: TaskTab) => {
    setTab(nextTab);
    setPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (nextSort: TaskSort) => {
    setSort(nextSort);
    setPage(1);
  };

  return (
    <AppShell activeNavId={activeNavId}>
      <TasksHeader />
      <TasksMetrics metrics={TASK_METRICS} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <TasksTable
            records={paginated}
            tab={tab}
            search={search}
            sort={sort}
            page={safePage}
            pageSize={pageSize}
            totalItems={totalItems}
            onTabChange={handleTabChange}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onPageChange={setPage}
            onPageSizeChange={(size) => {
              setPageSize(size);
              setPage(1);
            }}
          />
        </div>

        <div className="space-y-6">
          <TasksPriorityChart segments={TASK_PRIORITY_SUMMARY} />
          <UpcomingTasks items={UPCOMING_TASKS} />
          <OverdueTasks items={OVERDUE_TASKS} />
          <TaskSummaryCard stats={TASK_SUMMARY_STATS} />
        </div>
      </div>
    </AppShell>
  );
}
