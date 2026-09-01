import type { LeadTemperature } from "@/lib/ai-employees/types";

const TEMPERATURE_STYLES: Record<LeadTemperature, string> = {
  HOT: "bg-red-50 text-red-700 border-red-100",
  WARM: "bg-amber-50 text-amber-700 border-amber-100",
  COLD: "bg-blue-50 text-blue-700 border-blue-100",
};

export interface TemperatureBadgeProps {
  temperature: LeadTemperature;
  showEmoji?: boolean;
}

export function TemperatureBadge({
  temperature,
  showEmoji = true,
}: TemperatureBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg border px-2.5 py-1 text-xs font-bold ${TEMPERATURE_STYLES[temperature]}`}
    >
      {showEmoji && temperature === "HOT" ? "🔥" : null}
      {temperature}
    </span>
  );
}

export interface ScoreDisplayProps {
  score: number;
  max?: number;
}

export function ScoreDisplay({ score, max = 100 }: ScoreDisplayProps) {
  return (
    <span className="text-sm font-bold text-gray-900">
      {score}{" "}
      <span className="font-medium text-gray-400">/ {max}</span>
    </span>
  );
}
