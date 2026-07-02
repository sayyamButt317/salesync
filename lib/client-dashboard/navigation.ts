import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  BookOpen,
  Bot,
  CalendarCheck,
  LayoutDashboard,
  MessageSquare,
  Plug,
  Settings,
  UserPlus,
  Video,
} from "lucide-react";

export interface ClientNavItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const CLIENT_NAV_ITEMS: ClientNavItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/client/dashboard",
    icon: LayoutDashboard,
  },
  { id: "agents", label: "My Agents", href: "/client/agents", icon: Bot },
  { id: "leads", label: "Leads", href: "/client/leads", icon: UserPlus },
  { id: "conversations", label: "Conversations", href: "#", icon: MessageSquare },
  { id: "bookings", label: "Bookings", href: "/client/bookings", icon: CalendarCheck },
  { id: "ugc", label: "UGC Submissions", href: "#", icon: Video },
  { id: "analytics", label: "Analytics", href: "#", icon: BarChart3 },
  {
    id: "knowledge",
    label: "Knowledge Base",
    href: "/client/knowledge-base",
    icon: BookOpen,
  },
  { id: "integrations", label: "Integrations", href: "#", icon: Plug },
  {
    id: "settings",
    label: "Settings",
    href: "/client/setting",
    icon: Settings,
  },
];
