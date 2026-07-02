import type { AgentRecord, AgentSort, AgentTab } from "./types";
import { TAB_TO_STATUS } from "./types";

export function filterAgents(
  records: AgentRecord[],
  tab: AgentTab,
  search: string,
): AgentRecord[] {
  const query = search.toLowerCase().trim();
  const statusFilter = TAB_TO_STATUS[tab];

  return records.filter((record) => {
    const matchesTab = !statusFilter || record.status === statusFilter;

    const matchesSearch =
      !query ||
      record.name.toLowerCase().includes(query) ||
      record.description.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
}

export function sortAgents(records: AgentRecord[], sort: AgentSort): AgentRecord[] {
  const sorted = [...records];

  switch (sort) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "ai-score":
      return sorted.sort((a, b) => b.aiScore - a.aiScore);
    case "recently-updated":
    default:
      return sorted;
  }
}
