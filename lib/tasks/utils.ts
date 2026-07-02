import type { TaskPriority, TaskRecord, TaskSort, TaskTab } from "./types";
import { TAB_TO_STATUS } from "./types";

const PRIORITY_ORDER: Record<TaskPriority, number> = {
  High: 0,
  Medium: 1,
  Low: 2,
};

export function filterTasks(
  records: TaskRecord[],
  tab: TaskTab,
  search: string,
): TaskRecord[] {
  const query = search.toLowerCase().trim();
  const statusFilter = TAB_TO_STATUS[tab];

  return records.filter((record) => {
    const matchesTab = !statusFilter || record.status === statusFilter;

    const matchesSearch =
      !query ||
      record.title.toLowerCase().includes(query) ||
      record.description.toLowerCase().includes(query) ||
      record.associatedName.toLowerCase().includes(query) ||
      record.assigneeName.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
}

export function sortTasks(records: TaskRecord[], sort: TaskSort): TaskRecord[] {
  const sorted = [...records];

  switch (sort) {
    case "oldest":
      return sorted.reverse();
    case "due-date":
      return sorted.sort((a, b) => {
        if (a.isDueUrgent && !b.isDueUrgent) return -1;
        if (!a.isDueUrgent && b.isDueUrgent) return 1;
        return a.dueDate.localeCompare(b.dueDate);
      });
    case "priority":
      return sorted.sort(
        (a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority],
      );
    case "newest":
    default:
      return sorted;
  }
}
