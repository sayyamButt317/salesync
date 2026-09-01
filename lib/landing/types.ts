import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  hasDropdown?: boolean;
}

export interface TrustLogo {
  id: string;
  label: string;
}

export interface HeroTrustPoint {
  id: string;
  label: string;
}

export interface HowItWorksStep {
  id: string;
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface FooterLinkGroup {
  id: string;
  title: string;
  links: { id: string; label: string; href: string }[];
}

export interface SocialLink {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export interface DashboardMetric {
  id: string;
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface DashboardAgent {
  id: string;
  name: string;
  role: string;
  leads: number;
  initials: string;
  color: string;
}

export interface DashboardConversation {
  id: string;
  name: string;
  message: string;
  time: string;
  initials: string;
  color: string;
}

export interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

export interface LandingPageProps {
  signInHref?: string;
  getStartedHref?: string;
  demoHref?: string;
}
