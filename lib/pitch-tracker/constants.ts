import type { AgencyCountry, PitchStatus } from "./types";

export const COUNTRIES = ["All", "USA", "UK", "UAE", "Australia"] as const;

export const STATUS_OPTIONS: PitchStatus[] = [
  "Not Contacted",
  "Pitched",
  "Replied",
  "Meeting Booked",
  "Closed",
  "Not Interested",
];

export const STATUS_COLORS: Record<PitchStatus, string> = {
  "Not Contacted": "#6b7280",
  Pitched: "#3b82f6",
  Replied: "#f97316",
  "Meeting Booked": "#7c3aed",
  Closed: "#22c55e",
  "Not Interested": "#ef4444",
};

export const COUNTRY_BADGE_STYLES: Record<
  AgencyCountry,
  { background: string; color: string }
> = {
  USA: { background: "#1e3a5f", color: "#60a5fa" },
  UK: { background: "#1a3a2a", color: "#4ade80" },
  UAE: { background: "#3a2a1a", color: "#fb923c" },
  Australia: { background: "#2a1a3a", color: "#c084fc" },
};
