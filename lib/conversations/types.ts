import type { LucideIcon } from "lucide-react";

export type ConversationListTab = "all" | "unread" | "mentions" | "archived";

export type ConversationChannel = "WhatsApp" | "Email" | "SMS";

export type MessageDirection = "incoming" | "outgoing";

export type ChatInputMode = "reply" | "note";

export interface ConversationPreview {
  id: string;
  contactName: string;
  initials: string;
  avatarColor: string;
  preview: string;
  timestamp: string;
  channel: ConversationChannel;
  unreadCount?: number;
  isMention?: boolean;
  isArchived?: boolean;
}

export interface ChatMessage {
  id: string;
  direction: MessageDirection;
  content: string;
  timestamp: string;
  dateLabel?: string;
  read?: boolean;
}

export interface ContactDetails {
  name: string;
  initials: string;
  avatarColor: string;
  status: "Active now" | "Offline";
  phone: string;
  email: string;
  location: string;
  company: string;
  channel: ConversationChannel;
}

export interface DealInfo {
  id: string;
  title: string;
  status: string;
  value: string;
  stage: string;
  updated: string;
}

export interface ContactNote {
  id: string;
  content: string;
  author: string;
  date: string;
}

export interface ActivityItem {
  id: string;
  title: string;
  timestamp: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface ConversationThread {
  id: string;
  preview: ConversationPreview;
  contact: ContactDetails;
  messages: ChatMessage[];
  deals: DealInfo[];
  notes: ContactNote[];
  activities: ActivityItem[];
}

export interface ConversationsPageProps {
  activeNavId?: string;
}

export const CONVERSATION_TAB_LABELS: Record<
  ConversationListTab,
  { label: string; badge?: number }
> = {
  all: { label: "All" },
  unread: { label: "Unread", badge: 5 },
  mentions: { label: "Mentions" },
  archived: { label: "Archived" },
};

export const TOTAL_CONVERSATIONS_COUNT = 128;
