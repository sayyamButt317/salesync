"use client";

import type { LandingPageProps } from "@/lib/landing/types";
import { LandingNavbar } from "./landing-navbar";
import { LandingHero } from "./landing-hero";
import { TrustBar } from "./trust-bar";
import { HowItWorksSection } from "./how-it-works-section";
import { FeaturesSection } from "./features-section";
import { CtaBanner } from "./cta-banner";
import { LandingFooter } from "./landing-footer";

export function LandingPage({
  signInHref = "/login",
  getStartedHref = "/signup",
  demoHref = "#",
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar
        signInHref={signInHref}
        getStartedHref={getStartedHref}
      />
      <main>
        <LandingHero
          getStartedHref={getStartedHref}
          demoHref={demoHref}
        />
        <TrustBar />
        <HowItWorksSection />
        <FeaturesSection />
        <CtaBanner
          getStartedHref={getStartedHref}
          demoHref={demoHref}
        />
      </main>
      <LandingFooter />
    </div>
  );
}
