"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { FREE_TRIAL } from "@/lib/pricing/data";
import { fadeUp } from "@/lib/motion/variants";

export function FreeTrialBanner() {
  return (
    <section className="py-8">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-2xl border border-violet-100 bg-gradient-to-r from-violet-50 to-fuchsia-50 px-6 py-8 sm:px-10 sm:py-10"
        >
          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                <Sparkles className="h-6 w-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {FREE_TRIAL.days}-day free trial
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {FREE_TRIAL.aiEmployees} AI Employees ·{" "}
                  {FREE_TRIAL.aiTasks.toLocaleString()} AI Tasks included
                  {FREE_TRIAL.noCreditCard
                    ? " · No credit card required"
                    : null}
                </p>
                <p className="mt-2 max-w-xl text-sm text-gray-500">
                  Experience real work being completed before you commit. When
                  you&apos;re ready, upgrade to Growth and keep automating.
                </p>
              </div>
            </div>
            <Link
              href="/signup"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition-colors hover:bg-violet-700"
            >
              Start Free Trial
              <span aria-hidden>→</span>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
