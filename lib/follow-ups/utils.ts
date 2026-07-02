import type { FollowUpRecord, FollowUpTab } from "./types";
import { TAB_TO_STATUS } from "./types";

const WEEK_STATUSES = new Set(["Due Today", "Due Tomorrow", "Scheduled"]);

export function filterFollowUps(
  records: FollowUpRecord[],
  tab: FollowUpTab,
  search: string,
): FollowUpRecord[] {
  const query = search.toLowerCase().trim();
  const statusFilter = TAB_TO_STATUS[tab];

  return records.filter((record) => {
    let matchesTab = true;

    if (statusFilter) {
      matchesTab = record.status === statusFilter;
    } else if (tab === "due-week") {
      matchesTab = WEEK_STATUSES.has(record.status);
    }

    const matchesSearch =
      !query ||
      record.contactName.toLowerCase().includes(query) ||
      record.agency.toLowerCase().includes(query) ||
      record.campaign.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
}
