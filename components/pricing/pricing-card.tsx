import Link from "next/link";
import { Check } from "lucide-react";
import type { BillingCycle, PricingPlan } from "@/lib/pricing/types";

export interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
}

function formatPrice(plan: PricingPlan, billingCycle: BillingCycle) {
  if (plan.monthlyPrice === null) return "Custom";

  if (billingCycle === "annual" && plan.annualPrice) {
    return `$${Math.round(plan.annualPrice / 12)}`;
  }

  return `$${plan.monthlyPrice}`;
}

export function PricingCard({ plan, billingCycle }: PricingCardProps) {
  const isCustom = plan.monthlyPrice === null;
  const price = formatPrice(plan, billingCycle);
  const showAnnualNote =
    !isCustom && billingCycle === "annual" && plan.annualPrice;

  const ctaStyles = {
    primary:
      "bg-violet-600 text-white shadow-lg shadow-violet-600/25 hover:bg-violet-700",
    secondary:
      "border border-gray-200 bg-white text-gray-800 hover:border-gray-300 hover:bg-gray-50",
    outline:
      "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
  };

  return (
    <article
      data-pricing-card
      className={`relative flex h-full flex-col rounded-2xl border p-6 transition-shadow ${
        plan.recommended
          ? "border-violet-300 bg-white shadow-xl shadow-violet-500/10 ring-1 ring-violet-200"
          : "border-gray-100 bg-white shadow-sm hover:shadow-md"
      }`}
    >
      {plan.recommended ? (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-violet-600 px-3 py-1 text-[11px] font-bold tracking-wide text-white uppercase">
          Recommended
        </span>
      ) : null}

      <div className="mb-4">
        <span className="text-2xl" aria-hidden>
          {plan.emoji}
        </span>
        <h3 className="mt-2 text-xl font-bold text-gray-900">{plan.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{plan.tagline}</p>
      </div>

      <div className="mb-5">
        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tight text-gray-900">
            {price}
          </span>
          {!isCustom ? (
            <span className="text-sm text-gray-500">/month</span>
          ) : null}
        </div>
        {showAnnualNote ? (
          <p className="mt-1 text-xs text-gray-500">
            ${plan.annualPrice?.toLocaleString()}/year · Save $
            {plan.annualSavings}/year
          </p>
        ) : null}
        {!isCustom && billingCycle === "monthly" && plan.annualPrice ? (
          <p className="mt-1 text-xs text-gray-400">
            or ${plan.annualPrice.toLocaleString()}/year
          </p>
        ) : null}
      </div>

      <div className="mb-5 space-y-2 rounded-xl bg-gray-50/80 p-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">AI Employees</span>
          <span className="font-semibold text-gray-900">{plan.aiEmployees}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">AI Tasks</span>
          <span className="font-semibold text-gray-900">{plan.aiTasks}</span>
        </div>
      </div>

      <ul className="mb-6 flex-1 space-y-2.5">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
            {feature}
          </li>
        ))}
      </ul>

      <Link
        href={plan.ctaHref}
        className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${ctaStyles[plan.ctaVariant]}`}
      >
        {plan.ctaLabel}
      </Link>
    </article>
  );
}
