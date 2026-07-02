"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { ChartContainer } from "@/components/ui/chart-container";
import type { ChannelSegment } from "@/lib/reports/types";
import { fadeUp } from "@/lib/motion/variants";

export interface ChannelPerformanceCardProps {
  segments: ChannelSegment[];
  total: number;
}

export function ChannelPerformanceCard({
  segments,
  total,
}: ChannelPerformanceCardProps) {
  const groupRef = useRef<SVGGElement>(null);
  const size = 160;
  const radius = size / 2 - 14;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulative = 0;
  const arcs = segments.map((segment) => {
    const fraction = segment.value / total;
    const dashArray = `${fraction * circumference} ${circumference}`;
    const dashOffset = -cumulative * circumference;
    cumulative += fraction;
    return { ...segment, dashArray, dashOffset, fraction };
  });

  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;

    const circles = group.querySelectorAll("[data-segment]");
    const tween = gsap.fromTo(
      circles,
      { strokeDashoffset: circumference },
      {
        strokeDashoffset: (_, target) =>
          Number((target as SVGCircleElement).getAttribute("data-offset")),
        duration: 1,
        stagger: 0.08,
        ease: "power2.out",
        delay: 0.2,
      },
    );

    return () => {
      tween.kill();
    };
  }, [segments, circumference]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.15 }}
      className="h-full"
    >
      <ChartContainer
        title="Channel Performance"
        dropdownLabel="All Channels"
        className="h-full"
        footer={
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
          >
            View channel breakdown →
          </button>
        }
      >
        <div className="flex flex-col items-center gap-5 p-5">
          <div className="relative">
            <svg width={size} height={size} className="shrink-0 -rotate-90">
              <g ref={groupRef}>
                {arcs.map((arc, index) => (
                  <circle
                    key={arc.label}
                    data-segment
                    data-offset={arc.dashOffset}
                    cx={center}
                    cy={center}
                    r={radius}
                    fill="none"
                    stroke={arc.color}
                    strokeWidth={18}
                    strokeDasharray={arc.dashArray}
                    strokeDashoffset={circumference}
                    strokeLinecap="butt"
                    style={{ opacity: 1 - index * 0.02 }}
                  />
                ))}
              </g>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">{total}</span>
              <span className="text-[10px] font-medium text-gray-400">Total</span>
            </div>
          </div>

          <ul className="w-full space-y-2.5">
            {arcs.map((arc) => (
              <li
                key={arc.label}
                className="flex items-center justify-between gap-2 text-xs"
              >
                <span className="flex items-center gap-2 text-gray-600">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: arc.color }}
                  />
                  {arc.label}
                </span>
                <span className="font-semibold text-gray-900">
                  {arc.value}
                  <span className="ml-1.5 font-normal text-gray-400">
                    {Math.round(arc.fraction * 100)}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </ChartContainer>
    </motion.div>
  );
}
