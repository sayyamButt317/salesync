"use client";

import { ChevronDown, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { DEFAULT_USER, NAV_ITEMS } from "@/lib/layout/navigation";
import { slideInLeft } from "@/lib/motion/variants";
import { SidebarNavItem } from "./sidebar-nav-item";

export interface SidebarProps {
  activeNavId?: string;
}

export function Sidebar({ activeNavId = "agencies" }: SidebarProps) {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={slideInLeft}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="flex h-screen w-60 shrink-0 flex-col border-r border-gray-100 bg-white"
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
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem
            key={item.id}
            label={item.label}
            href={item.href}
            icon={item.icon}
            isActive={item.id === activeNavId}
          />
        ))}
      </nav>

      <div className="border-t border-gray-100 p-3">
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-50"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">
            {DEFAULT_USER.initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-gray-900">
              {DEFAULT_USER.name}
            </p>
            <p className="text-xs text-gray-500">{DEFAULT_USER.role}</p>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-gray-400" />
        </button>
      </div>
    </motion.aside>
  );
}
