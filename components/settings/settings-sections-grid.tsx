"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Button, SettingsCard, SettingsRow } from "@/components/ui";
import { INTEGRATION_APPS, SETTINGS_SECTIONS } from "@/lib/settings/data";
import { IntegrationsGrid } from "./integrations-grid";

export function SettingsSectionsGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll("[data-stagger-card]");
    if (!cards.length) return;

    const tween = gsap.fromTo(
      cards,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.15,
      },
    );

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-5 md:grid-cols-2"
    >
      {SETTINGS_SECTIONS.map((section) => {
        const headerAction =
          section.headerAction?.variant === "button" ? (
            <Button size="sm" variant="secondary">
              {section.headerAction.label}
            </Button>
          ) : section.headerAction ? (
            <button
              type="button"
              className="cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
            >
              {section.headerAction.label}
            </button>
          ) : null;

        return (
          <SettingsCard
            key={section.id}
            title={section.title}
            subtitle={section.subtitle}
            icon={section.icon}
            iconBg={section.iconBg}
            iconColor={section.iconColor}
            headerAction={headerAction}
          >
            {section.variant === "integrations" ? (
              <IntegrationsGrid apps={INTEGRATION_APPS} />
            ) : (
              <ul className="divide-y divide-gray-50">
                {section.rows?.map((row) => (
                  <li key={row.id}>
                    <SettingsRow
                      label={row.label}
                      value={row.value}
                      actionLabel={row.actionLabel}
                      variant={row.variant}
                    />
                  </li>
                ))}
              </ul>
            )}
          </SettingsCard>
        );
      })}
    </div>
  );
}
