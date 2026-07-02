"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
export interface ChartSegment {
  label: string;
  value: number;
  color: string;
}

export interface DonutChartProps {
  segments: ChartSegment[];
  size?: number;
}

export function DonutChart({ segments, size = 160 }: DonutChartProps) {
  const groupRef = useRef<SVGGElement>(null);
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);
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
      { strokeDashoffset: (index, target) => circumference },
      {
        strokeDashoffset: (_, target) =>
          Number((target as SVGCircleElement).getAttribute("data-offset")),
        duration: 1,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.2,
      },
    );

    return () => {
      tween.kill();
    };
  }, [segments, circumference]);

  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-6">
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
              strokeWidth={20}
              strokeDasharray={arc.dashArray}
              strokeDashoffset={circumference}
              strokeLinecap="butt"
              style={{ opacity: 1 - index * 0.02 }}
            />
          ))}
        </g>
      </svg>

      <ul className="space-y-2">
        {arcs.map((arc) => (
          <li key={arc.label} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: arc.color }}
            />
            <span className="text-gray-600">{arc.label}</span>
            <span className="font-semibold text-gray-900">
              {Math.round(arc.fraction * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
