"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  BarChart3,
  Bot,
  CalendarCheck,
  LayoutDashboard,
  MessageSquare,
  Settings,
  UserPlus,
  Users,
} from "lucide-react";
import {
  PREVIEW_AGENTS,
  PREVIEW_CONVERSATIONS,
  PREVIEW_METRICS,
} from "@/lib/landing/data";

const SIDEBAR_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Bot, label: "My Agents" },
  { icon: UserPlus, label: "Leads" },
  { icon: MessageSquare, label: "Conversations" },
  { icon: CalendarCheck, label: "Bookings" },
  { icon: Settings, label: "Settings" },
];

export function HeroDashboardPreview() {
  const floatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = floatRef.current;
    if (!el) return;

    const tween = gsap.to(el, {
      y: -12,
      duration: 2.8,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={floatRef}
      className="relative overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-2xl shadow-violet-500/10"
    >
      <div className="flex min-h-[420px]">
        <aside className="hidden w-44 shrink-0 border-r border-gray-100 bg-gray-50/80 p-3 sm:block">
          <div className="mb-4 flex items-center gap-2 px-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
              <Bot className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-gray-800">Salesync</span>
          </div>
          <ul className="space-y-0.5">
            {SIDEBAR_ITEMS.map((item) => (
              <li
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-medium ${
                  item.active
                    ? "bg-violet-50 text-violet-700"
                    : "text-gray-500"
                }`}
              >
                <item.icon className="h-3.5 w-3.5 shrink-0" />
                {item.label}
              </li>
            ))}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-sm font-bold text-gray-900">
              Welcome back, Sajam! 👋
            </p>
            <p className="text-[11px] text-gray-500">
              Here&apos;s how your AI agents are performing today.
            </p>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {PREVIEW_METRICS.map((metric) => (
              <div
                key={metric.id}
                className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm"
              >
                <div
                  className="mb-2 flex h-7 w-7 items-center justify-center rounded-lg"
                  style={{ backgroundColor: metric.iconBg }}
                >
                  <metric.icon
                    className="h-3.5 w-3.5"
                    style={{ color: metric.iconColor }}
                  />
                </div>
                <p className="text-[10px] text-gray-500">{metric.label}</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-gray-900">
                    {metric.value}
                  </span>
                  <span
                    className={`text-[10px] font-semibold ${
                      metric.trendUp ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {metric.trend}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-3 lg:grid-cols-5">
            <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm lg:col-span-3">
              <div className="mb-2 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-900">
                  Conversations Overview
                </p>
                <BarChart3 className="h-3.5 w-3.5 text-gray-400" />
              </div>
              <div className="flex h-24 items-end gap-1">
                {[40, 55, 45, 70, 60, 85, 75, 90, 65, 95, 80, 88].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t bg-gradient-to-t from-violet-600 to-violet-400 opacity-80"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
            </div>

            <div className="space-y-3 lg:col-span-2">
              <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <p className="mb-2 text-xs font-bold text-gray-900">
                  Top Performing Agents
                </p>
                <ul className="space-y-2">
                  {PREVIEW_AGENTS.map((agent) => (
                    <li
                      key={agent.id}
                      className="flex items-center justify-between gap-2"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                          style={{ backgroundColor: agent.color }}
                        >
                          {agent.initials}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-[10px] font-semibold text-gray-800">
                            {agent.name}
                          </p>
                          <p className="text-[9px] text-gray-400">
                            {agent.role}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-violet-600">
                        {agent.leads}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-gray-100 bg-white p-3 shadow-sm">
                <p className="mb-2 text-xs font-bold text-gray-900">
                  Recent Conversations
                </p>
                <ul className="space-y-2">
                  {PREVIEW_CONVERSATIONS.map((convo) => (
                    <li key={convo.id} className="flex items-start gap-2">
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white"
                        style={{ backgroundColor: convo.color }}
                      >
                        {convo.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <p className="truncate text-[10px] font-semibold text-gray-800">
                            {convo.name}
                          </p>
                          <span className="shrink-0 text-[9px] text-gray-400">
                            {convo.time}
                          </span>
                        </div>
                        <p className="truncate text-[9px] text-gray-500">
                          {convo.message}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
