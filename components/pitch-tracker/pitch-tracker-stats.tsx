import type { PitchTrackerStats } from "@/lib/pitch-tracker/types";

const STAT_ITEMS = [
  { key: "total", label: "Total Agencies", color: "#6366f1" },
  { key: "pitched", label: "Pitched", color: "#3b82f6" },
  { key: "replied", label: "Replies", color: "#f59e0b" },
  { key: "closed", label: "Closed", color: "#22c55e" },
] as const;

interface PitchTrackerStatsBarProps {
  stats: PitchTrackerStats;
}

export function PitchTrackerStatsBar({ stats }: PitchTrackerStatsBarProps) {
  return (
    <div className="my-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {STAT_ITEMS.map(({ key, label, color }) => (
        <div
          key={key}
          className="rounded-[10px] border border-[#1e2a3a] bg-[#131927] px-4 py-3.5"
        >
          <div
            className="text-[26px] font-extrabold"
            style={{ color }}
          >
            {stats[key]}
          </div>
          <div className="mt-0.5 text-xs text-slate-500">{label}</div>
        </div>
      ))}
    </div>
  );
}
