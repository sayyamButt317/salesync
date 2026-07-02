import type { PitchRecord, PitchTab } from "./types";
import { TAB_TO_STATUS } from "./types";

export function filterPitches(
  records: PitchRecord[],
  tab: PitchTab,
  search: string,
): PitchRecord[] {
  const query = search.toLowerCase().trim();
  const statusFilter = TAB_TO_STATUS[tab];

  return records.filter((record) => {
    const matchesTab = !statusFilter || record.status === statusFilter;
    const matchesSearch =
      !query ||
      record.title.toLowerCase().includes(query) ||
      record.agency.toLowerCase().includes(query) ||
      record.recipientName.toLowerCase().includes(query) ||
      record.recipientEmail.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
}
