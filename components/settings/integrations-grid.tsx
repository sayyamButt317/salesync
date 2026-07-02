"use client";

import type { IntegrationApp } from "@/lib/settings/types";

export interface IntegrationsGridProps {
  apps: IntegrationApp[];
}

export function IntegrationsGrid({ apps }: IntegrationsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 p-5 sm:grid-cols-3">
      {apps.map((app) => {
        const Icon = app.icon;

        return (
          <div
            key={app.id}
            className="flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50/50 px-3 py-4 text-center transition-colors hover:bg-gray-50"
          >
            <div
              className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ backgroundColor: app.iconBg }}
            >
              <Icon className="h-5 w-5" style={{ color: app.iconColor }} />
            </div>
            <p className="text-xs font-semibold text-gray-800">{app.name}</p>
            <p className="mt-0.5 text-[10px] font-medium text-green-600">
              Connected
            </p>
          </div>
        );
      })}
    </div>
  );
}
