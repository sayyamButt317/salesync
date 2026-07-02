import type { LeadScoreLevel } from "@/lib/client-leads/types";

const SCORE_STYLES: Record<LeadScoreLevel, string> = {
  High: "text-green-600",
  Medium: "text-amber-600",
  Low: "text-red-500",
};

const SCORE_BG: Record<LeadScoreLevel, string> = {
  High: "bg-green-50",
  Medium: "bg-amber-50",
  Low: "bg-red-50",
};

export interface LeadScoreIndicatorProps {
  score: number;
  level: LeadScoreLevel;
  showLabel?: boolean;
}

export function LeadScoreIndicator({
  score,
  level,
  showLabel = true,
}: LeadScoreIndicatorProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-bold ${SCORE_BG[level]} ${SCORE_STYLES[level]}`}
    >
      {score}
      {showLabel ? (
        <span className="font-semibold opacity-80">{level}</span>
      ) : null}
    </span>
  );
}
