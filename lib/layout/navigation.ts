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
  { id: "agencies", label: "Agencies", href: "/", icon: Building2 },
  { id: "pitches", label: "Pitches", href: "#", icon: Send },
  { id: "conversations", label: "Conversations", href: "#", icon: MessageSquare },
  { id: "follow-ups", label: "Follow Ups", href: "#", icon: Timer },
  { id: "tasks", label: "Tasks", href: "#", icon: CheckSquare },
  { id: "templates", label: "Templates", href: "#", icon: FileText },
  { id: "reports", label: "Reports", href: "#", icon: BarChart3 },
  { id: "settings", label: "Settings", href: "#", icon: Settings },
];

export interface UserProfile {
  name: string;
  role: string;
  initials: string;
}

export const DEFAULT_USER: UserProfile = {
  name: "Sayyam J.",
  role: "Admin",
  initials: "SJ",
};
