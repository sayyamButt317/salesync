"use client";

import type { AgentsPageProps } from "@/lib/ai-employees/types";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { CtaBanner } from "@/components/landing/cta-banner";
import { LandingFooter } from "@/components/landing/landing-footer";
import { AgentsHero } from "./agents-hero";
import { HowItWorksSection } from "./how-it-works-section";
import { EmployeesGrid } from "./employees-grid";
import { EmployeeDetailSections } from "./employee-detail-sections";
import { CapabilitiesSection } from "./capabilities-section";

export function AgentsPage({
  signInHref = "/login",
  getStartedHref = "/signup",
}: AgentsPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar
        signInHref={signInHref}
        getStartedHref={getStartedHref}
      />
      <main>
        <AgentsHero />
        <HowItWorksSection />
        <EmployeesGrid />
        <EmployeeDetailSections />
        <CapabilitiesSection />
        <CtaBanner getStartedHref={getStartedHref} />
      </main>
      <LandingFooter />
    </div>
  );
}
