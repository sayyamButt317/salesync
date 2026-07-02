import type { LeadRecord, LeadSort, LeadTab } from "./types";
import { TAB_TO_STATUS } from "./types";

export function filterLeads(
  records: LeadRecord[],
  tab: LeadTab,
  search: string,
): LeadRecord[] {
  const query = search.toLowerCase().trim();
  const statusFilter = TAB_TO_STATUS[tab];

  return records.filter((record) => {
    const matchesTab = !statusFilter || record.status === statusFilter;

    const matchesSearch =
      !query ||
      record.name.toLowerCase().includes(query) ||
      record.email.toLowerCase().includes(query) ||
      record.phone.includes(query) ||
      record.agentName.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
}

export function sortLeads(records: LeadRecord[], sort: LeadSort): LeadRecord[] {
  const sorted = [...records];

  switch (sort) {
    case "oldest":
      return sorted.reverse();
    case "score":
      return sorted.sort((a, b) => b.leadScore - a.leadScore);
    case "newest":
    default:
      return sorted;
  }
}
