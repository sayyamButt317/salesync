"use client";

import { ChevronDown, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { ProgressBar } from "@/components/ui";
import { CLIENT_PROFILE } from "@/lib/client-dashboard/data";
import { CLIENT_NAV_ITEMS } from "@/lib/client-dashboard/navigation";
import { slideInLeft } from "@/lib/motion/variants";
import { SidebarNavItem } from "@/components/layout/sidebar-nav-item";

export interface ClientSidebarProps {
  activeNavId?: string;
}

export function ClientSidebar({ activeNavId = "dashboard" }: ClientSidebarProps) {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={slideInLeft}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="sticky top-0 flex h-screen w-60 shrink-0 flex-col border-r border-gray-100 bg-white"
    >
      <div className="flex items-center gap-2.5 px-5 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 shadow-sm shadow-violet-600/25">
          <Zap className="h-5 w-5 fill-white text-white" />
        </div>
        <span className="text-lg font-bold tracking-tight text-gray-900">
          Salesync
        </span>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3">
        {CLIENT_NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.id}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={item.id === activeNavId}
          />
        ))}
      </nav>

      <div className="space-y-3 border-t border-gray-100 p-3">
        <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-gray-700">AI Credits</span>
            <span className="text-gray-400">
              {CLIENT_PROFILE.creditsUsed.toLocaleString()} /{" "}
              {CLIENT_PROFILE.creditsTotal.toLocaleString()}
            </span>
          </div>
          <ProgressBar
            value={CLIENT_PROFILE.creditsUsed}
            max={CLIENT_PROFILE.creditsTotal}
            className="mt-2"
          />
          <div className="mt-2 flex items-center justify-between text-[10px]">
            <button
              type="button"
              className="cursor-pointer font-semibold text-violet-600 hover:text-violet-700"
            >
              {CLIENT_PROFILE.plan}
            </button>
            <span className="text-gray-400">{CLIENT_PROFILE.renewalDate}</span>
          </div>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50/60 p-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-600 text-xs font-bold text-white">
              {CLIENT_PROFILE.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">
                {CLIENT_PROFILE.companyName}
              </p>
              <p className="truncate text-[11px] text-gray-500">
                {CLIENT_PROFILE.email}
              </p>
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
