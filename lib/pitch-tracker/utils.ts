import type { Agency, PitchStatus, PitchTrackerStats } from "./types";

import type { CountryFilter } from "@/lib/pitch-tracker/types";

export function filterAgencies(
  agencies: Agency[],
  country: CountryFilter,
  search: string,
): Agency[] {
  const query = search.toLowerCase();

  return agencies.filter((agency) => {
    const matchesCountry = country === "All" || agency.country === country;
    const matchesSearch =
      agency.name.toLowerCase().includes(query) ||
      agency.ceo.toLowerCase().includes(query) ||
      agency.focus.toLowerCase().includes(query);

    return matchesCountry && matchesSearch;
  });
}

export function computeStats(
  agencies: Agency[],
  statuses: Record<number, PitchStatus | undefined>,
): PitchTrackerStats {
  const statusValues = Object.values(statuses);

  return {
    total: agencies.length,
    pitched: statusValues.filter(
      (status) => status && status !== "Not Contacted",
    ).length,
    replied: statusValues.filter(
      (status) =>
        status === "Replied" ||
        status === "Meeting Booked" ||
        status === "Closed",
    ).length,
    closed: statusValues.filter((status) => status === "Closed").length,
  };
}
