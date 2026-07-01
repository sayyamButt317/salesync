"use client";

import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export interface SidebarNavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isActive?: boolean;
}

export function SidebarNavItem({
  label,
  href,
  icon: Icon,
  isActive = false,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
        isActive
          ? "text-violet-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {isActive ? (
        <motion.span
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-lg bg-violet-50"
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
      ) : null}
      <Icon
        className={`relative z-10 h-[18px] w-[18px] shrink-0 ${
          isActive ? "text-violet-600" : "text-gray-400 group-hover:text-gray-600"
        }`}
      />
      <span className="relative z-10">{label}</span>
    </Link>
  );
}
