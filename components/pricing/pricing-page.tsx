"use client";

import type { PricingPageProps } from "@/lib/pricing/types";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { CtaBanner } from "@/components/landing/cta-banner";
import { LandingFooter } from "@/components/landing/landing-footer";
import { PricingHeader } from "./pricing-header";
import { PricingGrid } from "./pricing-grid";
import { FreeTrialBanner } from "./free-trial-banner";
import { UsageOverageSection } from "./usage-overage-section";
import { AiTasksSection } from "./ai-tasks-section";
import { ComparisonTable } from "./comparison-table";
import { PricingFaq } from "./pricing-faq";

export function PricingPage({
  signInHref = "/login",
  getStartedHref = "/signup",
}: PricingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar
        signInHref={signInHref}
        getStartedHref={getStartedHref}
      />
      <main>
        <PricingHeader />
        <PricingGrid />
        <FreeTrialBanner />
        <UsageOverageSection />
        <AiTasksSection />
        <ComparisonTable />
        <PricingFaq />
        <CtaBanner getStartedHref={getStartedHref} />
      </main>
      <LandingFooter />
    </div>
  );
}
