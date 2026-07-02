"use client";

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Card } from "./card";

export interface SettingsCardProps {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  headerAction?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SettingsCard({
  title,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
  headerAction,
  children,
  className = "",
}: SettingsCardProps) {
  return (
    <div data-stagger-card>
      <Card padding="none" className={`overflow-hidden ${className}`}>
        <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
          <div className="flex items-start gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: iconBg }}
            >
              <Icon className="h-5 w-5" style={{ color: iconColor }} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">{title}</h3>
              {subtitle ? (
                <p className="mt-0.5 text-xs text-gray-500">{subtitle}</p>
              ) : null}
            </div>
          </div>
          {headerAction}
        </div>
        {children}
      </Card>
    </div>
  );
}
