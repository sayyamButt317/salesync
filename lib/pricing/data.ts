import type {
  AiTaskExample,
  ComparisonRow,
  PricingFaq,
  PricingPlan,
} from "./types";

export const PRICING_HEADLINE = "Hire AI Employees for Your Business";
export const PRICING_SUBHEADLINE =
  "Sales, support, bookings, and follow-ups—handled 24/7. Pay for AI employees and the work they perform, not per seat.";

export const FREE_TRIAL = {
  days: 14,
  aiEmployees: 2,
  aiTasks: 500,
  noCreditCard: true,
};

export const USAGE_OVERAGE = {
  label: "Additional AI Tasks",
  rate: "$25",
  unit: "1,000 AI Tasks",
  description:
    "When you exceed your plan limit, add more capacity without upgrading. Predictable pricing that scales with your business.",
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Start with 2 AI employees",
    emoji: "🚀",
    monthlyPrice: 99,
    annualPrice: 990,
    annualSavings: 198,
    aiEmployees: "Up to 2",
    aiTasks: "2,000 / month",
    features: [
      "WhatsApp & Website integration",
      "Basic knowledge base",
      "Basic automations",
      "Conversation history",
      "Basic analytics",
      "2 team members",
      "2 integrations",
      "Email support",
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "/signup?plan=starter",
    ctaVariant: "secondary",
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Build your AI team with 5 employees",
    emoji: "⚡",
    monthlyPrice: 249,
    annualPrice: 2490,
    annualSavings: 498,
    aiEmployees: "Up to 5",
    aiTasks: "10,000 / month",
    recommended: true,
    features: [
      "WhatsApp, Website & all channels",
      "Advanced knowledge base / RAG",
      "Custom AI employee instructions",
      "Tool & API integrations",
      "Appointment booking & lead qualification",
      "Follow-ups & task automation",
      "Analytics & reports",
      "10 team members · 10 integrations",
      "Priority support",
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "/signup?plan=growth",
    ctaVariant: "primary",
  },
  {
    id: "business",
    name: "Business",
    tagline: "Run your operation with 10 AI employees",
    emoji: "🏢",
    monthlyPrice: 499,
    annualPrice: 4990,
    annualSavings: 998,
    aiEmployees: "Up to 10",
    aiTasks: "30,000 / month",
    features: [
      "Advanced workflows & departments",
      "CRM integrations & custom tools",
      "Advanced analytics & human handoff",
      "Multiple WhatsApp numbers",
      "Role-based access",
      "25 team members · Unlimited integrations",
      "Priority support",
    ],
    ctaLabel: "Start Free Trial",
    ctaHref: "/signup?plan=business",
    ctaVariant: "secondary",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "Custom AI workforce at scale",
    emoji: "🏦",
    monthlyPrice: null,
    annualPrice: null,
    aiEmployees: "Custom / Unlimited",
    aiTasks: "Custom limits",
    features: [
      "Dedicated infrastructure",
      "Custom integrations & workflows",
      "SLA & dedicated support",
      "Advanced permissions",
      "On-prem / private deployment options",
    ],
    ctaLabel: "Contact Sales",
    ctaHref: "#contact",
    ctaVariant: "outline",
  },
];

export const COMPARISON_ROWS: ComparisonRow[] = [
  {
    id: "price",
    label: "Price",
    starter: "$99/mo",
    growth: "$249/mo",
    business: "$499/mo",
    enterprise: "Custom",
  },
  {
    id: "employees",
    label: "AI Employees",
    starter: "2",
    growth: "5",
    business: "10",
    enterprise: "Custom",
  },
  {
    id: "tasks",
    label: "AI Tasks / month",
    starter: "2,000",
    growth: "10,000",
    business: "30,000",
    enterprise: "Custom",
  },
  {
    id: "knowledge",
    label: "Knowledge Base",
    starter: true,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    starter: true,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    id: "website",
    label: "Website",
    starter: true,
    growth: true,
    business: true,
    enterprise: true,
  },
  {
    id: "automations",
    label: "Automations",
    starter: "Basic",
    growth: "Advanced",
    business: "Advanced",
    enterprise: "Custom",
  },
  {
    id: "integrations",
    label: "Integrations",
    starter: "2",
    growth: "10",
    business: "Unlimited",
    enterprise: "Custom",
  },
  {
    id: "analytics",
    label: "Analytics",
    starter: "Basic",
    growth: "Advanced",
    business: "Advanced",
    enterprise: "Custom",
  },
  {
    id: "team",
    label: "Team Members",
    starter: "2",
    growth: "10",
    business: "25",
    enterprise: "Custom",
  },
  {
    id: "support",
    label: "Support",
    starter: "Email",
    growth: "Priority",
    business: "Priority",
    enterprise: "Dedicated",
  },
];

export const AI_TASK_EXAMPLES: AiTaskExample[] = [
  { id: "1", label: "Answer customer inquiry" },
  { id: "2", label: "Qualify lead" },
  { id: "3", label: "Book appointment" },
  { id: "4", label: "Reschedule appointment" },
  { id: "5", label: "Cancel appointment" },
  { id: "6", label: "Send follow-up" },
  { id: "7", label: "Create CRM lead" },
  { id: "8", label: "Generate quotation" },
  { id: "9", label: "Check availability" },
  { id: "10", label: "Update customer record" },
  { id: "11", label: "Send reminder" },
];

export const GROWTH_POSITIONING =
  "5 AI employees for less than the cost of one human employee.";

export const PRICING_FAQS: PricingFaq[] = [
  {
    id: "1",
    question: "What is an AI Task?",
    answer:
      "An AI Task is any unit of work your AI employee completes—answering a customer, qualifying a lead, booking an appointment, sending a follow-up, or updating your CRM. It's not just a message; it's meaningful work done on your behalf.",
  },
  {
    id: "2",
    question: "Why AI Employees instead of per-seat pricing?",
    answer:
      "You're not buying software seats—you're hiring AI workers that perform 24/7. We charge for the number of AI employees and the volume of work they complete, so you can combine roles into one super agent without penalty.",
  },
  {
    id: "3",
    question: "What happens when I exceed my AI Task limit?",
    answer:
      "You can purchase additional capacity at $25 per 1,000 AI Tasks, or upgrade to the next plan. We'll notify you before you hit your limit so you're never surprised.",
  },
  {
    id: "4",
    question: "Is there a free trial?",
    answer:
      "Yes. Start with a 14-day free trial including 2 AI Employees and 500 AI Tasks. No credit card required. Experience real work being completed before you commit.",
  },
  {
    id: "5",
    question: "Can I switch plans or billing cycles?",
    answer:
      "Absolutely. Upgrade, downgrade, or switch between monthly and annual billing at any time. Annual plans save approximately 2 months compared to monthly.",
  },
];
