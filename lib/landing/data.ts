import {
  BarChart3,
  Bot,
  Brain,
  Calendar,
  Clock,
  Globe,
  MessageSquare,
  Rocket,
  Share2,
  Shield,
  Sparkles,
  UserPlus,
  Users,
  Video,
  Zap,
} from "lucide-react";
import type {
  DashboardAgent,
  DashboardConversation,
  DashboardMetric,
  FeatureItem,
  FooterLinkGroup,
  HeroTrustPoint,
  HowItWorksStep,
  NavItem,
  SocialLink,
  TrustLogo,
} from "./types";

export const LANDING_NAV_ITEMS: NavItem[] = [
  { id: "product", label: "Agents", href: "/agents", hasDropdown: true },
  { id: "solutions", label: "Solutions", href: "#how-it-works", hasDropdown: true },
  { id: "resources", label: "Resources", href: "#", hasDropdown: true },
  { id: "pricing", label: "Pricing", href: "/pricing" },
  { id: "about", label: "About", href: "#" },
];

export const HERO_TRUST_POINTS: HeroTrustPoint[] = [
  { id: "no-card", label: "No credit card required" },
  { id: "setup", label: "Setup in minutes" },
  { id: "cancel", label: "Cancel anytime" },
];

export const TRUST_LOGOS: TrustLogo[] = [
  { id: "ubiquitous", label: "Ubiquitous" },
  { id: "viral", label: "viral nation" },
  { id: "goat", label: "THE GOAT AGENCY" },
  { id: "hom", label: "House of Marketers" },
  { id: "acme", label: "ACME REAL ESTATE" },
];

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "step-1",
    number: 1,
    title: "Add Your Business",
    description:
      "Tell us about your brand, services, and goals. Salesync learns your business in minutes.",
    icon: UserPlus,
  },
  {
    id: "step-2",
    number: 2,
    title: "Configure Your AI Agent",
    description:
      "Choose channels, upload knowledge, and customize how your AI employee communicates.",
    icon: Bot,
  },
  {
    id: "step-3",
    number: 3,
    title: "Activate & Automate",
    description:
      "Launch your agent and let it qualify leads, book meetings, and follow up 24/7.",
    icon: Rocket,
  },
];

export const FEATURE_ITEMS: FeatureItem[] = [
  {
    id: "engage",
    title: "AI Agents That Engage",
    description:
      "Natural conversations across WhatsApp, email, and web that feel human and convert.",
    icon: MessageSquare,
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
  },
  {
    id: "always-on",
    title: "Always Working",
    description:
      "Your AI employees never sleep. Respond instantly, follow up automatically, and never miss a lead.",
    icon: Clock,
    iconBg: "#dcfce7",
    iconColor: "#22c55e",
  },
  {
    id: "automate",
    title: "Automate Tasks",
    description:
      "From lead qualification to meeting booking — automate repetitive work so your team can focus on closing.",
    icon: Zap,
    iconBg: "#ffedd5",
    iconColor: "#f97316",
  },
  {
    id: "knowledge",
    title: "Knowledge Powered",
    description:
      "Upload docs, FAQs, and product info. Your agents answer accurately using your business knowledge.",
    icon: Brain,
    iconBg: "#dbeafe",
    iconColor: "#3b82f6",
  },
  {
    id: "insights",
    title: "Smart Insights",
    description:
      "Track conversations, leads, and performance with real-time analytics and actionable reports.",
    icon: BarChart3,
    iconBg: "#fce7f3",
    iconColor: "#ec4899",
  },
  {
    id: "secure",
    title: "Secure & Private",
    description:
      "Enterprise-grade security with encrypted data, role-based access, and full compliance controls.",
    icon: Shield,
    iconBg: "#cffafe",
    iconColor: "#06b6d4",
  },
];

export const PREVIEW_METRICS: DashboardMetric[] = [
  {
    id: "agents",
    label: "Active Agents",
    value: "12",
    trend: "+2",
    trendUp: true,
    icon: Bot,
    iconBg: "#ede9fe",
    iconColor: "#7c3aed",
  },
  {
    id: "conversations",
    label: "Conversations",
    value: "186",
    trend: "+18%",
    trendUp: true,
    icon: MessageSquare,
    iconBg: "#dbeafe",
    iconColor: "#3b82f6",
  },
  {
    id: "leads",
    label: "Leads",
    value: "248",
    trend: "+24%",
    trendUp: true,
    icon: Users,
    iconBg: "#dcfce7",
    iconColor: "#22c55e",
  },
  {
    id: "tasks",
    label: "Tasks",
    value: "34",
    trend: "+8",
    trendUp: true,
    icon: Calendar,
    iconBg: "#ffedd5",
    iconColor: "#f97316",
  },
];

export const PREVIEW_AGENTS: DashboardAgent[] = [
  {
    id: "1",
    name: "Real Estate Agent",
    role: "Lead Generation",
    leads: 86,
    initials: "RE",
    color: "#7c3aed",
  },
  {
    id: "2",
    name: "Booking Assistant",
    role: "Scheduling",
    leads: 64,
    initials: "BA",
    color: "#3b82f6",
  },
  {
    id: "3",
    name: "Support Agent",
    role: "Customer Support",
    leads: 42,
    initials: "SA",
    color: "#22c55e",
  },
];

export const PREVIEW_CONVERSATIONS: DashboardConversation[] = [
  {
    id: "1",
    name: "John Smith",
    message: "Interested in 2BHK apartment...",
    time: "2m ago",
    initials: "JS",
    color: "#7c3aed",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    message: "Can we schedule a demo?",
    time: "15m ago",
    initials: "SM",
    color: "#3b82f6",
  },
  {
    id: "3",
    name: "James Cooper",
    message: "What's the pricing for Pro?",
    time: "1h ago",
    initials: "JC",
    color: "#22c55e",
  },
];

export const FOOTER_LINK_GROUPS: FooterLinkGroup[] = [
  {
    id: "product",
    title: "Product",
    links: [
      { id: "features", label: "Features", href: "#features" },
      { id: "pricing", label: "Pricing", href: "/pricing" },
      { id: "integrations", label: "Integrations", href: "#" },
      { id: "changelog", label: "Changelog", href: "#" },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    links: [
      { id: "docs", label: "Documentation", href: "#" },
      { id: "blog", label: "Blog", href: "#" },
      { id: "help", label: "Help Center", href: "#" },
      { id: "api", label: "API", href: "#" },
    ],
  },
  {
    id: "company",
    title: "Company",
    links: [
      { id: "about", label: "About", href: "#" },
      { id: "careers", label: "Careers", href: "#" },
      { id: "contact", label: "Contact", href: "#" },
      { id: "partners", label: "Partners", href: "#" },
    ],
  },
  {
    id: "legal",
    title: "Legal",
    links: [
      { id: "privacy", label: "Privacy", href: "#" },
      { id: "terms", label: "Terms", href: "#" },
      { id: "security", label: "Security", href: "#" },
      { id: "cookies", label: "Cookies", href: "#" },
    ],
  },
];

export const FOOTER_SOCIAL_LINKS: SocialLink[] = [
  { id: "linkedin", label: "LinkedIn", href: "#", icon: Globe },
  { id: "x", label: "X", href: "#", icon: Share2 },
  { id: "youtube", label: "YouTube", href: "#", icon: Video },
];

export const FOOTER_DESCRIPTION =
  "AI employees that qualify leads, book meetings, and follow up — so your team can focus on closing deals.";
