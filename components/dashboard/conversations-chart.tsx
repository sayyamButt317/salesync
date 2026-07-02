"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import type { ChartDataPoint } from "@/lib/dashboard/types";

export interface ConversationsChartProps {
  data: ChartDataPoint[];
}

const CHART_WIDTH = 560;
const CHART_HEIGHT = 200;
const PADDING = { top: 16, right: 16, bottom: 28, left: 16 };

export function ConversationsChart({ data }: ConversationsChartProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const areaRef = useRef<SVGPathElement>(null);

  const innerWidth = CHART_WIDTH - PADDING.left - PADDING.right;
  const innerHeight = CHART_HEIGHT - PADDING.top - PADDING.bottom;
  const maxValue = Math.max(...data.map((point) => point.value));

  const points = data.map((point, index) => {
    const x =
      PADDING.left + (index / (data.length - 1)) * innerWidth;
    const y =
      PADDING.top +
      innerHeight -
      (point.value / maxValue) * innerHeight;
    return { x, y };
  });

  const linePath = points
    .map((point, index) =>
      `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`,
    )
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1]?.x} ${PADDING.top + innerHeight} L ${points[0]?.x} ${PADDING.top + innerHeight} Z`;

  useEffect(() => {
    const line = pathRef.current;
    const area = areaRef.current;
    if (!line || !area) return;

    const lineLength = line.getTotalLength();

    gsap.set(line, { strokeDasharray: lineLength, strokeDashoffset: lineLength });
    gsap.set(area, { opacity: 0 });

    const tween = gsap.timeline();
    tween.to(line, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.out",
    });
    tween.to(
      area,
      { opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.8",
    );

    return () => {
      tween.kill();
    };
  }, [data]);

  return (
    <svg
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      className="h-full w-full"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </linearGradient>
      </defs>

      {[0, 0.25, 0.5, 0.75, 1].map((fraction) => (
        <line
          key={fraction}
          x1={PADDING.left}
          x2={CHART_WIDTH - PADDING.right}
          y1={PADDING.top + innerHeight * (1 - fraction)}
          y2={PADDING.top + innerHeight * (1 - fraction)}
          stroke="#f3f4f6"
          strokeWidth="1"
        />
      ))}

      <path ref={areaRef} d={areaPath} fill="url(#chartGradient)" />
      <path
        ref={pathRef}
        d={linePath}
        fill="none"
        stroke="#7c3aed"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {data.map((point, index) => (
        <text
          key={point.label}
          x={PADDING.left + (index / (data.length - 1)) * innerWidth}
          y={CHART_HEIGHT - 6}
          textAnchor="middle"
          className="fill-gray-400 text-[10px]"
        >
          {point.label}
        </text>
      ))}
    </svg>
  );
}
