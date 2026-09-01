"use client";

import Link from "next/link";
import { Calendar, Check, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { HERO_TRUST_POINTS } from "@/lib/landing/data";
import { fadeUp, staggerContainer } from "@/lib/motion/variants";
import { GradientText } from "./section-header";
import { HeroDashboardPreview } from "./hero-dashboard-preview";

export interface LandingHeroProps {
  getStartedHref?: string;
  demoHref?: string;
}

export function LandingHero({
  getStartedHref = "/signup",
  demoHref = "#",
}: LandingHeroProps) {
  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-12 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.08),transparent_50%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.05),transparent_50%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-xl"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-100 bg-violet-50 px-3 py-1.5 text-xs font-bold tracking-wide text-violet-700 uppercase"
          >
            <Sparkles className="h-3.5 w-3.5" />
            AI Employees That Work 24/7
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl lg:text-[3.25rem]"
          >
            Configure AI Employees That Handle Your Work{" "}
            <GradientText>24/7 and Never Stop.</GradientText>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-base leading-relaxed text-gray-500 sm:text-lg"
          >
            Salesync creates AI agents that qualify leads, book meetings, and
            follow up automatically — so your team can focus on closing deals.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href={getStartedHref}
              className="inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/25 transition-colors hover:bg-violet-700"
            >
              Get Started Free
              <span aria-hidden>→</span>
            </Link>
            <Link
              href={demoHref}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
            >
              <Calendar className="h-4 w-4 text-gray-500" />
              Book a Demo
            </Link>
          </motion.div>

          <motion.ul
            variants={fadeUp}
            className="mt-6 flex flex-wrap gap-x-5 gap-y-2"
          >
            {HERO_TRUST_POINTS.map((point) => (
              <li
                key={point.id}
                className="flex items-center gap-1.5 text-sm text-gray-500"
              >
                <Check className="h-4 w-4 text-green-500" />
                {point.label}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 32, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-violet-100/60 to-fuchsia-100/40 blur-2xl" />
          <HeroDashboardPreview />
        </motion.div>
      </div>
    </section>
  );
}
