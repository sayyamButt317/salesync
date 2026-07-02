"use client";

import {
  Globe,
  Mail,
  MessageCircle,
  MoreVertical,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { AgentStatusBadge, Sparkline } from "@/components/ui";
import { PLATFORM_COLORS } from "@/lib/client-agents/data";
import type { AgentPlatform, AgentRecord } from "@/lib/client-agents/types";
import { tableRow } from "@/lib/motion/variants";

const PLATFORM_ICONS: Record<AgentPlatform, typeof MessageCircle> = {
  WhatsApp: MessageCircle,
  Instagram: MessageCircle,
  Web: Globe,
  LinkedIn: Globe,
  Email: Mail,
};

function TrendIndicator({
  value,
  direction,
}: {
  value: number;
  direction: "up" | "down";
}) {
  const isUp = direction === "up";

  return (
    <span
      className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${
        isUp ? "text-green-600" : "text-red-500"
      }`}
    >
      {isUp ? (
        <TrendingUp className="h-3 w-3" />
      ) : (
        <TrendingDown className="h-3 w-3" />
      )}
      {value}%
    </span>
  );
}

export interface AgentRowProps {
  agent: AgentRecord;
}

export function AgentRow({ agent }: AgentRowProps) {
  const Icon = agent.icon;

  return (
    <motion.div
      data-animate
      variants={tableRow}
      whileHover={{ backgroundColor: "rgba(249,250,251,0.9)" }}
      className="border-b border-gray-50 px-5 py-4 last:border-b-0"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-3">
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
            style={{ backgroundColor: agent.iconBg }}
          >
            <Icon className="h-5 w-5" style={{ color: agent.iconColor }} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-sm font-bold text-gray-900">{agent.name}</h3>
              {agent.isPrimary ? (
                <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
                  Primary
                </span>
              ) : null}
              <AgentStatusBadge status={agent.status} />
            </div>
            <p className="mt-0.5 line-clamp-1 text-xs text-gray-500">
              {agent.description}
            </p>
            <div className="mt-2 flex items-center gap-1.5">
              {agent.platforms.map((platform) => {
                const PlatformIcon = PLATFORM_ICONS[platform];
                return (
                  <span
                    key={platform}
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-gray-100 bg-gray-50"
                    title={platform}
                  >
                    <PlatformIcon
                      className="h-3 w-3"
                      style={{ color: PLATFORM_COLORS[platform] }}
                    />
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 lg:w-72">
          <div>
            <p className="text-[10px] font-medium text-gray-400 uppercase">
              {agent.leads.label}
            </p>
            <p className="text-sm font-bold text-gray-900">
              {agent.leads.value}
            </p>
            <TrendIndicator
              value={agent.leads.trend}
              direction={agent.leads.trendDirection}
            />
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-400 uppercase">
              {agent.conversations.label}
            </p>
            <p className="text-sm font-bold text-gray-900">
              {agent.conversations.value}
            </p>
            <TrendIndicator
              value={agent.conversations.trend}
              direction={agent.conversations.trendDirection}
            />
          </div>
          <div>
            <p className="text-[10px] font-medium text-gray-400 uppercase">
              {agent.thirdMetric.label}
            </p>
            <p className="text-sm font-bold text-gray-900">
              {agent.thirdMetric.value}
            </p>
            <TrendIndicator
              value={agent.thirdMetric.trend}
              direction={agent.thirdMetric.trendDirection}
            />
          </div>
        </div>

        <div className="flex items-center gap-4 lg:w-36">
          <div className="flex items-center gap-2">
            <Sparkline data={agent.sparkline} />
            <span className="text-sm font-bold text-violet-600">
              {agent.aiScore}%
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 lg:w-32 lg:justify-end">
          <span className="text-[11px] text-gray-400">
            Updated {agent.lastUpdated}
          </span>
          <button
            type="button"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="Agent actions"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
