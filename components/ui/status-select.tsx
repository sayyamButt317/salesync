import { STATUS_COLORS, STATUS_OPTIONS } from "@/lib/pitch-tracker/constants";
import type { PitchStatus } from "@/lib/pitch-tracker/types";

export interface StatusSelectProps {
  value: PitchStatus;
  onChange: (status: PitchStatus) => void;
}

export function StatusSelect({ value, onChange }: StatusSelectProps) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value as PitchStatus)}
      className="cursor-pointer rounded-lg border bg-white px-2.5 py-1.5 text-[11px] font-medium outline-none transition-colors focus:ring-2 focus:ring-violet-100"
      style={{
        borderColor: `${STATUS_COLORS[value]}40`,
        color: STATUS_COLORS[value],
      }}
    >
      {STATUS_OPTIONS.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
