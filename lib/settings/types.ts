import type { LucideIcon } from "lucide-react";

export type SettingsTab =
  | "general"
  | "team"
  | "notifications"
  | "integrations"
  | "billing"
  | "security"
  | "widgets"
  | "advanced";

export type GeneralSection =
  | "profile"
  | "company"
  | "preferences"
  | "email"
  | "whatsapp"
  | "ai-agent"
  | "data-privacy"
  | "api";

export type SettingsRowVariant = "default" | "link" | "danger" | "success";

export interface SettingsNavItem {
  id: GeneralSection;
  label: string;
  icon: LucideIcon;
}

export interface SettingsTabItem {
  id: SettingsTab;
  label: string;
}

export interface SettingsRowItem {
  id: string;
  label: string;
  value?: string;
  actionLabel?: string;
  variant?: SettingsRowVariant;
}

export interface SettingsSectionConfig {
  id: string;
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  headerAction?: {
    label: string;
    variant: "button" | "link";
  };
  rows?: SettingsRowItem[];
  variant: "rows" | "integrations";
}

export interface IntegrationApp {
  id: string;
  name: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  connected: boolean;
}

export interface ProfileFormData {
  fullName: string;
  email: string;
  phoneCountryCode: string;
  phoneNumber: string;
  timezone: string;
  initials: string;
}

export interface SettingsPageProps {
  activeNavId?: string;
}

export const SETTINGS_TABS: SettingsTabItem[] = [
  { id: "general", label: "General" },
  { id: "team", label: "Team" },
  { id: "notifications", label: "Notifications" },
  { id: "integrations", label: "Integrations" },
  { id: "billing", label: "Billing" },
  { id: "security", label: "Security" },
  { id: "widgets", label: "Website Widgets" },
  { id: "advanced", label: "Advanced" },
];
