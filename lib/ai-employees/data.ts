import type {
  AiEmployee,
  ClinicLeadExample,
  EmployeeCapability,
  HowItWorksStep,
  RealEstateLeadExample,
  ReputationReviewExample,
} from "./types";

export const AGENTS_HEADLINE = "Stop losing customers while you're busy running the business.";
export const AGENTS_SUBHEADLINE =
  "Each agent handles a real business problem for you—reviews, leads, and appointments—so you wake up to clear summaries and ready-to-act opportunities, not missed messages.";

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    id: "1",
    emoji: "📩",
    title: "Your customer reaches out",
    description:
      "A review lands on Google, or someone messages you on WhatsApp asking about a property or treatment.",
  },
  {
    id: "2",
    emoji: "⚡",
    title: "The agent handles it instantly",
    description:
      "It replies, asks the right questions, and collects everything you need—without you typing a word.",
  },
  {
    id: "3",
    emoji: "✅",
    title: "You get a clear next step",
    description:
      "A ready-to-publish response, a hot lead summary, or a booking request lands on your phone or dashboard.",
  },
];

export const AI_EMPLOYEES: AiEmployee[] = [
  {
    id: "reputation",
    emoji: "⭐",
    name: "Reputation Manager",
    shortName: "Reputation Manager",
    tagline: "Never let a bad review sit unanswered",
    description:
      "When customers leave reviews—good or bad—this agent responds professionally, spots recurring complaints, and tells you exactly what to fix in your business.",
    painPoint: "Bad reviews hurt your rating and you don't have time to reply to every one.",
    outcome: "Protect your reputation and fix problems before they spread",
    workflowSummary: "Review → Response → Insight → Action",
    workflow: [
      { id: "1", label: "Review arrives" },
      { id: "2", label: "Professional reply drafted" },
      { id: "3", label: "You approve or auto-send" },
      { id: "4", label: "Pattern spotted & team alerted" },
    ],
    processSteps: [
      {
        id: "1",
        emoji: "⭐",
        title: "A customer leaves a review",
        description:
          "Google, Facebook, or another platform—positive or negative, you don't have to watch it yourself.",
      },
      {
        id: "2",
        emoji: "💬",
        title: "A professional reply goes out",
        description:
          "The agent writes a thoughtful response in your brand voice. You can approve it or let it publish automatically.",
      },
      {
        id: "3",
        emoji: "🔍",
        title: "Recurring issues are flagged",
        description:
          "If multiple customers mention slow service or pricing, you'll know—before it damages your rating further.",
      },
      {
        id: "4",
        emoji: "📱",
        title: "You get a simple alert",
        description:
          "WhatsApp or dashboard notification with what happened and what we recommend you do next.",
      },
    ],
    youGet: [
      "Every review answered within hours, not days",
      "Early warning when the same complaint keeps showing up",
      "Professional responses that show customers you care",
      "Less time reading reviews, more time running the business",
    ],
    withoutAgent: "Reviews pile up unanswered. Rating drops. You find out about problems too late.",
    withAgent: "Every review handled. Problems flagged early. Your rating stays protected.",
    gradient: "from-amber-50 to-orange-50",
    accentColor: "#f97316",
  },
  {
    id: "real-estate",
    emoji: "🏠",
    name: "Real Estate Lead Manager",
    shortName: "Lead Manager",
    tagline: "Never miss a buyer who's ready to move",
    description:
      "When prospects message on WhatsApp, this agent chats with them, learns their budget and timeline, and sends your sales team only the leads worth calling.",
    painPoint: "Leads message at odd hours and your team loses hot buyers in long chat threads.",
    outcome: "Capture every inquiry and hand sales ready-to-close opportunities",
    workflowSummary: "Inquiry → Qualify → Summarize → Sales call",
    workflow: [
      { id: "1", label: "WhatsApp inquiry" },
      { id: "2", label: "Budget & needs collected" },
      { id: "3", label: "Lead scored hot/warm/cold" },
      { id: "4", label: "Sales team notified" },
    ],
    processSteps: [
      {
        id: "1",
        emoji: "💬",
        title: "Someone asks about a property",
        description:
          "They message on WhatsApp at 10pm. The agent replies immediately—no waiting until morning.",
      },
      {
        id: "2",
        emoji: "🎯",
        title: "Budget, location & timeline captured",
        description:
          "Natural conversation collects what your sales team needs: budget, area, property type, and when they want to buy.",
      },
      {
        id: "3",
        emoji: "🔥",
        title: "Hot leads are flagged for you",
        description:
          "Ready-to-buy prospects get a HOT score. Your team sees a one-line summary—not a 50-message thread.",
      },
      {
        id: "4",
        emoji: "📞",
        title: "Sales calls the right people first",
        description:
          "Your team gets notified with full context so the first call is about closing, not re-asking basic questions.",
      },
    ],
    youGet: [
      "24/7 response so leads never go cold overnight",
      "Budget, location, and timeline collected automatically",
      "Hot leads highlighted so sales prioritizes correctly",
      "No more scrolling WhatsApp to figure out who to call",
    ],
    withoutAgent: "Messages sit unread. Sales reads long chats. Hot buyers go to a competitor.",
    withAgent: "Every inquiry answered instantly. Sales gets a clean summary and calls the hottest leads first.",
    gradient: "from-violet-50 to-indigo-50",
    accentColor: "#7c3aed",
  },
  {
    id: "clinic",
    emoji: "✨",
    name: "Clinic Lead Manager",
    shortName: "Clinic Manager",
    tagline: "Turn treatment inquiries into booked appointments",
    description:
      "When patients ask about Botox, fillers, or other treatments on WhatsApp, this agent understands what they want, checks their readiness, and alerts your front desk when someone is ready to book.",
    painPoint: "Patient inquiries get lost in WhatsApp and your front desk misses booking-ready leads.",
    outcome: "More consultations booked from the same ad spend",
    workflowSummary: "Inquiry → Understand → Qualify → Book",
    workflow: [
      { id: "1", label: "Treatment inquiry" },
      { id: "2", label: "Needs & date collected" },
      { id: "3", label: "Booking intent confirmed" },
      { id: "4", label: "Front desk notified" },
    ],
    processSteps: [
      {
        id: "1",
        emoji: "💉",
        title: "A patient asks about a treatment",
        description:
          "They want Botox pricing or availability. The agent responds right away with helpful, on-brand answers.",
      },
      {
        id: "2",
        emoji: "📋",
        title: "Treatment, location & date captured",
        description:
          "The agent learns what they want, where they're based, and when they'd like to come in—naturally, in chat.",
      },
      {
        id: "3",
        emoji: "✅",
        title: "Ready-to-book patients are flagged",
        description:
          "When someone asks about pricing and gives a preferred date, they're marked as high intent—not just browsing.",
      },
      {
        id: "4",
        emoji: "🔔",
        title: "Your front desk gets a booking alert",
        description:
          "One notification with everything needed to confirm the appointment—no digging through messages.",
      },
    ],
    youGet: [
      "Instant replies to treatment questions, even after hours",
      "Clear signal on who's ready to book vs. just browsing",
      "Front desk notified with treatment and preferred date",
      "More appointments from the same marketing spend",
    ],
    withoutAgent: "Inquiries wait hours for a reply. Front desk reads every chat. Bookings slip away.",
    withAgent: "Patients get instant answers. Booking-ready leads ping your team immediately.",
    gradient: "from-pink-50 to-rose-50",
    accentColor: "#ec4899",
  },
];

export const EMPLOYEE_CAPABILITIES: EmployeeCapability[] = [
  {
    id: "always-on",
    emoji: "🌙",
    label: "Works while you sleep",
    description: "Replies to customers 24/7 so you never lose a lead or leave a review unanswered.",
  },
  {
    id: "summaries",
    emoji: "📋",
    label: "Clear summaries, not chat logs",
    description: "You see what matters—budget, intent, issue—in one glance, not 50 messages.",
  },
  {
    id: "alerts",
    emoji: "📱",
    label: "Alerts on your phone",
    description: "Hot leads and urgent reviews come straight to WhatsApp or your dashboard.",
  },
  {
    id: "brand-voice",
    emoji: "🎯",
    label: "Sounds like your business",
    description: "Responses match your tone—professional, friendly, or clinical—however you want.",
  },
  {
    id: "patterns",
    emoji: "📊",
    label: "Spots patterns you'd miss",
    description: "Recurring complaints or common questions surface so you can fix root causes.",
  },
  {
    id: "control",
    emoji: "👤",
    label: "You're always in control",
    description: "Approve responses before they go out, or set rules for what runs automatically.",
  },
  {
    id: "handoff",
    emoji: "🤝",
    label: "Smooth handoff to your team",
    description: "When a human needs to step in, your team gets full context—no starting from zero.",
  },
  {
    id: "results",
    emoji: "📈",
    label: "Track what's working",
    description: "See response times, lead conversion, and booking rates in one place.",
  },
];

export const REPUTATION_EXAMPLE: ReputationReviewExample = {
  rating: 2,
  maxRating: 5,
  sentiment: "Negative",
  issue: "Slow service",
  urgency: "Medium",
  intent: "Complaint",
  humanApproval: true,
  aiReply:
    "Thank you for your feedback. We're sorry about the wait you experienced. We've shared this with our team and are working to improve service times. We'd love the chance to make this right—please reach out directly so we can follow up.",
  whyItMatters:
    "23 customers mentioned slow service this month. Fixing wait times could lift your rating from 4.1 to 4.5.",
  recommendedAction:
    "Review staffing during peak hours. This reply is ready—approve it to show customers you're listening.",
  whatsappAlertSent: true,
  recurringInsight:
    "23 reviews this month mention slow service—that's your #1 complaint right now.",
};

export const REAL_ESTATE_EXAMPLE: RealEstateLeadExample = {
  contactName: "Ahmed",
  source: "WhatsApp",
  employeeName: "Lead Manager",
  temperature: "HOT",
  score: 92,
  headline: "Ready to buy — call within the hour",
  fields: [
    { id: "budget", label: "Budget", value: "$450,000" },
    { id: "location", label: "Location", value: "Dubai Marina" },
    { id: "property", label: "Property", value: "2 Bedroom" },
    { id: "purpose", label: "Purpose", value: "Investment" },
    { id: "timeline", label: "Timeline", value: "Within 30 days" },
    { id: "financing", label: "Financing", value: "Cash" },
  ],
  actions: [
    { id: "1", label: "Replied to inquiry within 2 minutes", completed: true },
    { id: "2", label: "Collected budget, location & timeline", completed: true },
    { id: "3", label: "Scored as HOT — ready to buy", completed: true },
    { id: "4", label: "Sales team notified on WhatsApp", completed: true },
    { id: "5", label: "Recommended: call Ahmed today", completed: true },
  ],
};

export const CLINIC_EXAMPLE: ClinicLeadExample = {
  contactName: "Sara",
  source: "WhatsApp",
  employeeName: "Clinic Manager",
  intent: "Treatment inquiry",
  treatment: "Botox",
  location: "Riyadh",
  preferredDate: "This Saturday",
  temperature: "HOT",
  score: 94,
  detectedSignals: [
    "Asked about Botox pricing",
    "Gave preferred appointment date",
    "Confirmed location",
    "Ready to book — not just browsing",
  ],
  aiRecommendation:
    "Sara is ready to book Botox this Saturday. Notify front desk to confirm the slot?",
  notificationPreview:
    "🔥 Booking-ready patient\nSara wants Botox this Saturday in Riyadh.\nShe asked about pricing and confirmed her date.\n→ Call or message to confirm appointment.",
};

export const COMING_SOON_LABEL = "More agents for restaurants, salons & e-commerce — coming soon";
