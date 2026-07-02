import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  CheckSquare,
  FileText,
  LayoutDashboard,
  MessageSquare,
  Send,
  Settings,
  Timer,
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { id: "dashboard", label: "Dashboard", href: "/", icon: LayoutDashboard },
  { id: "agencies", label: "Agencies", href: "/agencies", icon: Building2 },
  { id: "pitches", label: "Pitches", href: "/pitches", icon: Send },
  { id: "conversations", label: "Conversations", href: "/conversations", icon: MessageSquare },
  { id: "follow-ups", label: "Follow Ups", href: "/follow-ups", icon: Timer },
  { id: "tasks", label: "Tasks", href: "/tasks", icon: CheckSquare },
  { id: "templates", label: "Templates", href: "/templates", icon: FileText },
  { id: "reports", label: "Reports", href: "/reports", icon: BarChart3 },
  { id: "settings", label: "Settings", href: "/settings", icon: Settings },
];

export interface UserProfile {
  name: string;
  email: string;
  role: string;
  initials: string;
  plan: string;
  planRenewalPercent: number;
}

export const DEFAULT_USER: UserProfile = {
  name: "Sajam J.",
  email: "sajam@acme.com",
  role: "Admin",
  initials: "SJ",
  plan: "Pro Plan",
  planRenewalPercent: 72,
};
