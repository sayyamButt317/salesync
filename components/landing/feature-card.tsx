import type { FeatureItem } from "@/lib/landing/types";

export interface FeatureCardProps {
  feature: FeatureItem;
}

export function FeatureCard({ feature }: FeatureCardProps) {
  const Icon = feature.icon;

  return (
    <article
      data-stagger-card
      className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
    >
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: feature.iconBg }}
      >
        <Icon className="h-5 w-5" style={{ color: feature.iconColor }} />
      </div>
      <h3 className="text-base font-bold text-gray-900">{feature.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-gray-500">
        {feature.description}
      </p>
    </article>
  );
}
