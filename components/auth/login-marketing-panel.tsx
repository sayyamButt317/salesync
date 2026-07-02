"use client";

import { Sparkles, Zap } from "lucide-react";
import { AUTH_FEATURES } from "@/lib/auth/data";
import { useGsapStagger } from "@/lib/motion/use-gsap-stagger";
import { DashboardPreview } from "./dashboard-preview";

export function LoginMarketingPanel() {
  const contentRef = useGsapStagger<HTMLDivElement>({
    selector: "[data-animate]",
    y: 20,
    stagger: 0.1,
    delay: 0.15,
  });

  return (
    <div className="relative flex h-full min-h-screen flex-col overflow-hidden bg-gradient-to-br from-violet-50 via-indigo-50/80 to-purple-100/60 px-10 py-10 xl:px-14">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-violet-300/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-20 -left-16 h-64 w-64 rounded-full bg-indigo-300/20 blur-3xl"
        aria-hidden
      />

      <div ref={contentRef} className="relative z-10 flex flex-1 flex-col">
        <div data-animate className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-600 shadow-sm shadow-violet-600/25">
            <Zap className="h-5 w-5 fill-white text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Salesync
          </span>
        </div>

        <div
          data-animate
          className="mt-8 inline-flex w-fit items-center gap-1.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow-sm"
        >
          <Sparkles className="h-3.5 w-3.5" />
          AI-Powered Sales Automation
        </div>

        <h1
          data-animate
          className="mt-8 max-w-lg text-4xl leading-tight font-bold tracking-tight text-gray-900 xl:text-[2.75rem]"
        >
          Manage Conversations. Close More Deals.{" "}
          <span className="text-violet-600">All in One Place.</span>
        </h1>

        <p
          data-animate
          className="mt-5 max-w-md text-base leading-relaxed text-gray-600"
        >
          Automate outreach, track every conversation, and grow your agency
          with AI agents built for modern sales teams.
        </p>

        <ul className="mt-10 space-y-5">
          {AUTH_FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <li
                key={feature.id}
                data-animate
                className="flex items-start gap-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-100/80">
                  <Icon className="h-5 w-5 text-violet-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    {feature.title}
                  </p>
                  <p className="mt-0.5 text-sm leading-relaxed text-gray-500">
                    {feature.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-auto pt-8">
          <DashboardPreview />
        </div>
      </div>
    </div>
  );
}
