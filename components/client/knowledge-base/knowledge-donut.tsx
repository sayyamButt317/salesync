"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { OverviewSegment } from "@/lib/knowledge-base/types";

export interface KnowledgeDonutProps {
  segments: OverviewSegment[];
  centerValue: number;
  centerLabel: string;
  size?: number;
  strokeWidth?: number;
}

export function KnowledgeDonut({
  segments,
  centerValue,
  centerLabel,
  size = 150,
  strokeWidth = 16,
}: KnowledgeDonutProps) {
  const groupRef = useRef<SVGGElement>(null);
  const countRef = useRef<HTMLParagraphElement>(null);

  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  let cumulative = 0;
  const arcs = segments.map((segment) => {
    const fraction = total > 0 ? segment.value / total : 0;
    const gap = 0.008;
    const dashArray = `${Math.max(fraction - gap, 0) * circumference} ${circumference}`;
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

  useEffect(() => {
    const node = countRef.current;
    if (!node) return;

    const counter = { value: 0 };
    const tween = gsap.to(counter, {
      value: centerValue,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        node.textContent = Math.round(counter.value).toLocaleString();
      },
    });

    return () => {
      tween.kill();
    };
  }, [centerValue]);

  return (
    <div className="flex items-center gap-5">
      <div className="relative shrink-0" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth={strokeWidth}
          />
          <g ref={groupRef}>
            {arcs.map((arc) => (
              <circle
                key={arc.id}
                data-segment
                data-offset={arc.dashOffset}
                cx={center}
                cy={center}
                r={radius}
                fill="none"
                stroke={arc.color}
                strokeWidth={strokeWidth}
                strokeDasharray={arc.dashArray}
                strokeDashoffset={circumference}
                strokeLinecap="round"
              />
            ))}
          </g>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p ref={countRef} className="text-2xl font-bold text-gray-900">
            {centerValue}
          </p>
          <p className="text-[10px] font-medium text-gray-400">{centerLabel}</p>
        </div>
      </div>

      <ul className="flex-1 space-y-2">
        {arcs.map((arc) => (
          <li key={arc.id} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: arc.color }}
            />
            <span className="flex-1 text-gray-600">{arc.label}</span>
            <span className="font-semibold text-gray-900">{arc.value}</span>
            <span className="text-gray-400">
              ({Math.round(arc.fraction * 100)}%)
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
