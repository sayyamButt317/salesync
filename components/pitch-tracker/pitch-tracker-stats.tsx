"use client";

import { CheckCircle2, MessageCircle, Send, Users } from "lucide-react";
import type { PitchTrackerStats } from "@/lib/pitch-tracker/types";
import { colors } from "@/lib/design-tokens";
import { useGsapStagger } from "@/lib/motion/use-gsap-stagger";
import { useGsapCounter } from "@/lib/motion/use-gsap-counter";

const STAT_CONFIG = [
  {
    key: "total" as const,
    label: "Total Agencies",
    icon: Users,
    iconBg: colors.stat.total.bg,
    iconColor: colors.stat.total.icon,
  },
  {
    key: "pitched" as const,
    label: "Pitched",
    icon: Send,
    iconBg: colors.stat.pitched.bg,
    iconColor: colors.stat.pitched.icon,
  },
  {
    key: "replied" as const,
    label: "Replies",
    icon: MessageCircle,
    iconBg: colors.stat.replied.bg,
    iconColor: colors.stat.replied.icon,
  },
  {
    key: "closed" as const,
    label: "Closed",
    icon: CheckCircle2,
    iconBg: colors.stat.closed.bg,
    iconColor: colors.stat.closed.icon,
  },
];

export interface PitchTrackerStatsBarProps {
  stats: PitchTrackerStats;
}

function AnimatedStatValue({ value }: { value: number }) {
  const ref = useGsapCounter(value);
  return <span ref={ref}>{value}</span>;
}

export function PitchTrackerStatsBar({ stats }: PitchTrackerStatsBarProps) {
  const containerRef = useGsapStagger<HTMLDivElement>();

  return (
    <div
      ref={containerRef}
      className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
    >
      {STAT_CONFIG.map(({ key, label, icon: Icon, iconBg, iconColor }) => (
        <div
          key={key}
          data-animate
          className="flex items-center gap-4 rounded-xl border border-gray-100 bg-white px-5 py-4 shadow-sm"
        >
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: iconBg }}
          >
            <Icon className="h-5 w-5" style={{ color: iconColor }} />
          </div>
          <div>
            <p className="text-2xl font-bold tracking-tight text-gray-900">
              <AnimatedStatValue value={stats[key]} />
            </p>
            <p className="text-xs font-medium text-gray-500">{label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
