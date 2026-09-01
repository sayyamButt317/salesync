"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { LANDING_NAV_ITEMS } from "@/lib/landing/data";
import { SalesyncLogo } from "./salesync-logo";

export interface LandingNavbarProps {
  signInHref?: string;
  getStartedHref?: string;
}

export function LandingNavbar({
  signInHref = "/login",
  getStartedHref = "/signup",
}: LandingNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45 }}
      className={`sticky top-0 z-50 border-b transition-colors ${
        scrolled
          ? "border-gray-200/80 bg-white/90 backdrop-blur-md"
          : "border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-6 lg:px-8">
        <SalesyncLogo />

        <nav className="hidden items-center gap-1 lg:flex">
          {LANDING_NAV_ITEMS.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="inline-flex items-center gap-0.5 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
            >
              {item.label}
              {item.hasDropdown ? (
                <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={signInHref}
            className="hidden text-sm font-semibold text-gray-600 transition-colors hover:text-gray-900 sm:inline"
          >
            Sign In
          </Link>
          <Link
            href={getStartedHref}
            className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-600/25 transition-colors hover:bg-violet-700"
          >
            Get Started Free
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
