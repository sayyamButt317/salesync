import type { LucideIcon } from "lucide-react";

export type BillingCycle = "monthly" | "annual";

export type PlanId = "starter" | "growth" | "business" | "enterprise";

export interface PricingPlan {
  id: PlanId;
  name: string;
  tagline: string;
  emoji: string;
  monthlyPrice: number | null;
  annualPrice: number | null;
  annualSavings?: number;
  aiEmployees: string;
  aiTasks: string;
  features: string[];
  recommended?: boolean;
  ctaLabel: string;
  ctaHref: string;
  ctaVariant: "primary" | "secondary" | "outline";
}

export interface ComparisonRow {
  id: string;
  label: string;
  starter: string | boolean;
  growth: string | boolean;
  business: string | boolean;
  enterprise: string | boolean;
}

export interface AiTaskExample {
  id: string;
  label: string;
}

export interface PricingFaq {
  id: string;
  question: string;
  answer: string;
}

export interface PricingPageProps {
  signInHref?: string;
  getStartedHref?: string;
}
