"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { Bot, FileText, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button, Card } from "@/components/ui";
import { fadeUp } from "@/lib/motion/variants";

export function CreateAgentWidget() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.1 }}
    >
      <Card className="bg-gradient-to-br from-violet-50 to-indigo-50">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 shadow-sm">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-900">
              Create New Agent
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-gray-600">
              Build a custom AI agent tailored to your business workflows and
              channels.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link href="/client/create-agent">
                <Button size="sm" icon={Plus} iconPosition="left">
                  Create Agent
                </Button>
              </Link>
              <Button size="sm" variant="secondary">
                Explore Templates
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export interface AgentHealthOverviewProps {
  segments: { label: string; value: number; color: string }[];
  total: number;
}

export function AgentHealthOverview({
  segments,
  total,
}: AgentHealthOverviewProps) {
  const groupRef = useRef<SVGGElement>(null);
  const size = 120;
  const radius = size / 2 - 12;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  let cumulative = 0;
  const arcs = segments
    .filter((segment) => segment.value > 0)
    .map((segment) => {
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
    >
      <Card>
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Agent Health Overview
        </h3>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <svg width={size} height={size} className="shrink-0 -rotate-90">
            <g ref={groupRef}>
              {arcs.map((arc) => (
                <circle
                  key={arc.label}
                  data-segment
                  data-offset={arc.dashOffset}
                  cx={center}
                  cy={center}
                  r={radius}
                  fill="none"
                  stroke={arc.color}
                  strokeWidth={16}
                  strokeDasharray={arc.dashArray}
                  strokeDashoffset={circumference}
                />
              ))}
            </g>
          </svg>
          <ul className="w-full space-y-2">
            {segments.map((segment) => (
              <li
                key={segment.label}
                className="flex items-center justify-between text-xs"
              >
                <span className="flex items-center gap-2 text-gray-600">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: segment.color }}
                  />
                  {segment.label}
                </span>
                <span className="font-semibold text-gray-900">
                  {total > 0
                    ? `${Math.round((segment.value / total) * 100)}%`
                    : "0%"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </motion.div>
  );
}

export interface TopPerformingAgentWidgetProps {
  name: string;
  aiScore: number;
  leadsGenerated: number;
  revenueInfluenced: string;
}

export function TopPerformingAgentWidget({
  name,
  aiScore,
  leadsGenerated,
  revenueInfluenced,
}: TopPerformingAgentWidgetProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.2 }}
    >
      <Card>
        <h3 className="mb-4 text-sm font-bold text-gray-900">
          Top Performing Agent
        </h3>
        <p className="text-sm font-semibold text-violet-600">{name}</p>
        <dl className="mt-4 space-y-2.5">
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">AI Score</dt>
            <dd className="font-bold text-gray-900">{aiScore}%</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Leads Generated</dt>
            <dd className="font-bold text-gray-900">{leadsGenerated}</dd>
          </div>
          <div className="flex justify-between text-sm">
            <dt className="text-gray-500">Revenue Influenced</dt>
            <dd className="font-bold text-gray-900">{revenueInfluenced}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="mt-4 w-full cursor-pointer rounded-lg border border-violet-200 bg-violet-50 py-2 text-xs font-semibold text-violet-700 transition-colors hover:bg-violet-100"
        >
          View Performance
        </button>
      </Card>
    </motion.div>
  );
}

export function NeedHelpWidget() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.25 }}
    >
      <Card className="bg-gray-50/80">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
            <FileText className="h-4 w-4 text-violet-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900">Need help?</p>
            <p className="mt-0.5 text-xs text-gray-500">
              Learn how to set up and optimize your agents.
            </p>
            <button
              type="button"
              className="mt-2 cursor-pointer text-xs font-semibold text-violet-600 hover:text-violet-700"
            >
              View Documentation →
            </button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
