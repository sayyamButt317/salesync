import type { BookingRecord, BookingSort, BookingTab } from "./types";
import { TAB_TO_STATUS } from "./types";

export function filterBookings(
  records: BookingRecord[],
  tab: BookingTab,
  search: string,
): BookingRecord[] {
  const query = search.toLowerCase().trim();
  const statusFilter = TAB_TO_STATUS[tab];

  return records.filter((record) => {
    const matchesTab = !statusFilter || record.status === statusFilter;

    const matchesSearch =
      !query ||
      record.name.toLowerCase().includes(query) ||
      record.email.toLowerCase().includes(query) ||
      record.phone.includes(query) ||
      record.purpose.toLowerCase().includes(query) ||
      record.agentName.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
}

export function sortBookings(
  records: BookingRecord[],
  sort: BookingSort,
): BookingRecord[] {
  const sorted = [...records];

  switch (sort) {
    case "oldest":
      return sorted.reverse();
    case "date":
      return sorted.sort(
        (a, b) =>
          new Date(`${a.date} ${a.time}`).getTime() -
          new Date(`${b.date} ${b.time}`).getTime(),
      );
    case "newest":
    default:
      return sorted;
  }
}
