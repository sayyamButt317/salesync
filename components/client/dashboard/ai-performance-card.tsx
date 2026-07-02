"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChartContainer } from "@/components/ui/chart-container";
import type { AIScoreMetric } from "@/lib/client-dashboard/types";
import { fadeUp } from "@/lib/motion/variants";

export interface AIPerformanceCardProps {
  score: number;
  label: string;
  metrics: AIScoreMetric[];
}

export function AIPerformanceCard({
  score,
  label,
  metrics,
}: AIPerformanceCardProps) {
  const circleRef = useRef<SVGCircleElement>(null);
  const size = 140;
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const dashOffset = circumference - (score / 100) * circumference;

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const tween = gsap.fromTo(
      circle,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: dashOffset,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2,
      },
    );

    return () => {
      tween.kill();
    };
  }, [circumference, dashOffset]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="h-full"
    >
      <ChartContainer
        title="AI Performance Score"
        className="h-full"
        footer={
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
          >
            View full analytics →
          </button>
        }
      >
        <div className="flex flex-col items-center gap-5 p-5 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <svg width={size} height={size} className="-rotate-90">
              <circle
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#f3f4f6"
                strokeWidth={14}
              />
              <circle
                ref={circleRef}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke="#7c3aed"
                strokeWidth={14}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={circumference}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-gray-900">{score}</span>
              <span className="text-xs font-semibold text-violet-600">
                {label}
              </span>
            </div>
          </div>

          <ul className="w-full space-y-3">
            {metrics.map((metric) => {
              const Icon = metric.icon;

              return (
                <li
                  key={metric.id}
                  className="flex items-center justify-between gap-3"
                >
                  <span className="flex items-center gap-2 text-sm text-gray-700">
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-lg"
                      style={{ backgroundColor: metric.iconBg }}
                    >
                      <Icon
                        className="h-3.5 w-3.5"
                        style={{ color: metric.iconColor }}
                      />
                    </span>
                    {metric.label}
                  </span>
                  <span className="text-sm font-bold text-gray-900">
                    {metric.value}%
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </ChartContainer>
    </motion.div>
  );
}
