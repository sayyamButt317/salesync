"use client";

import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";

export interface CtaBannerProps {
  getStartedHref?: string;
  demoHref?: string;
}

export function CtaBanner({
  getStartedHref = "/signup",
  demoHref = "#",
}: CtaBannerProps) {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={fadeUp}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-violet-600 to-fuchsia-600 px-8 py-12 sm:px-12 sm:py-14"
        >
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-fuchsia-400/20 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
                Let Salesync be your AI employee that never sleeps.
              </h2>
              <p className="mt-3 text-base text-violet-100">
                Start free today. No credit card required. Setup takes minutes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={getStartedHref}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-violet-700 shadow-lg transition-colors hover:bg-violet-50"
              >
                Get Started Free
                <span aria-hidden>→</span>
              </Link>
              <Link
                href={demoHref}
                className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <Calendar className="h-4 w-4" />
                Book a Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
