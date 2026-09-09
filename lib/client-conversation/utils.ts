import type {
  MessageDirection,
  WhatsAppConversation,
  WhatsAppMessage,
} from "./types";

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

function pickString(
  source: Record<string, unknown>,
  keys: string[],
  fallback = "",
): string {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "string" && value.trim()) return value;
    if (typeof value === "number") return String(value);
  }
  return fallback;
}

function pickNumber(source: Record<string, unknown>, keys: string[]): number {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "number") return value;
    if (
      typeof value === "string" &&
      value.trim() &&
      !Number.isNaN(Number(value))
    ) {
      return Number(value);
    }
  }
  return 0;
}

function unwrapList(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  const record = asRecord(data);
  if (!record) return [];

  for (const key of [
    "conversations",
    "data",
    "results",
    "items",
    "threads",
  ]) {
    if (Array.isArray(record[key])) return record[key] as unknown[];
  }

  return [];
}

function unwrapMessages(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;
  const record = asRecord(data);
  if (!record) return [];

  for (const key of ["messages", "data", "results", "items", "history"]) {
    if (Array.isArray(record[key])) return record[key] as unknown[];
  }

  return [];
}

export function formatConversationTime(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  if (sameDay) {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  }

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString([], { month: "short", day: "numeric" });
}

export function formatMessageTime(value: string): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function formatDateLabel(value: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;

  const now = new Date();
  const sameDay =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();
  if (sameDay) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString([], {
    weekday: "long",
    month: "short",
    day: "numeric",
  });
}

export function formatPhoneNumber(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return phone;

  if (digits.startsWith("92") && digits.length >= 12) {
    return `+${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }

  if (digits.length > 10) {
    return phone.startsWith("+") ? phone : `+${digits}`;
  }

  return phone;
}

export function formatModeLabel(mode: string): string {
  if (!mode) return "DEFAULT";
  return mode.replace(/_/g, " ");
}

export function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

export function avatarHue(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue} 42% 42%)`;
}

function resolveDirection(item: Record<string, unknown>): MessageDirection {
  const sender = pickString(item, ["sender"]).toLowerCase();
  if (["ai", "agent", "bot", "assistant", "system"].includes(sender)) {
    return "outgoing";
  }

  if (item.human_takeover === true && sender === "human") {
    return "outgoing";
  }

  const raw = pickString(item, [
    "direction",
    "role",
    "from",
    "type",
    "author",
  ]).toLowerCase();

  if (
    [
      "outgoing",
      "outbound",
      "out",
      "agent",
      "assistant",
      "ai",
      "bot",
      "me",
    ].includes(raw)
  ) {
    return "outgoing";
  }

  return "incoming";
}

function resolveMode(item: Record<string, unknown>): string {
  return (
    pickString(item, ["conversation_mode", "mode", "chat_mode"]) || "DEFAULT"
  );
}

function pickBoolean(
  source: Record<string, unknown>,
  keys: string[],
): boolean | undefined {
  for (const key of keys) {
    const value = source[key];
    if (typeof value === "boolean") return value;
    if (value === "true" || value === 1) return true;
    if (value === "false" || value === 0) return false;
  }
  return undefined;
}

function resolveHumanHandoff(item: Record<string, unknown>): boolean {
  const explicit = pickBoolean(item, [
    "human_takeover",
    "human_handoff",
    "handoff",
    "human_handoff_enabled",
  ]);
  if (explicit !== undefined) return explicit;

  const paused = pickBoolean(item, ["agent_paused"]);
  if (paused === true) return true;

  const mode = resolveMode(item).toUpperCase();
  return (
    mode.includes("HANDOFF") ||
    mode.includes("HUMAN") ||
    mode === "MANUAL" ||
    mode === "TAKEOVER"
  );
}

function resolvePhone(
  item: Record<string, unknown>,
  threadId: string,
): string {
  const explicit = pickString(item, [
    "phone_number",
    "phone",
    "mobile",
    "wa_id",
    "number",
  ]);
  if (explicit) return explicit;

  // thread_id is often the WhatsApp phone id (e.g. 923240149841)
  if (/^\d{8,}$/.test(threadId)) return threadId;
  return "";
}

function lastMessagePreview(item: Record<string, unknown>): {
  preview: string;
  timestamp: string;
  mode: string;
} {
  const messages = Array.isArray(item.messages) ? item.messages : [];
  const last = asRecord(messages[messages.length - 1]);

  if (last) {
    return {
      preview: pickString(last, ["message", "content", "text", "body"]),
      timestamp: pickString(last, ["timestamp", "created_at", "sent_at"]),
      mode: resolveMode(last),
    };
  }

  return {
    preview: pickString(item, [
      "last_message",
      "preview",
      "message",
      "last_message_text",
      "snippet",
    ]),
    timestamp: pickString(item, [
      "updated_at",
      "last_message_at",
      "timestamp",
      "created_at",
      "time",
    ]),
    mode: resolveMode(item),
  };
}

function isAgentName(name: string): boolean {
  const value = name.toLowerCase().trim();
  if (!value) return false;
  return (
    value === "ai" ||
    value.startsWith("ai ") ||
    value.includes(" ai") ||
    value.includes("agent") ||
    value.includes("bot") ||
    value === "assistant" ||
    value === "system"
  );
}

function resolveContactUsername(
  item: Record<string, unknown>,
  phone: string,
  index: number,
): string {
  const preferred = pickString(item, [
    "contact_name",
    "customer_name",
    "customer_username",
    "client_name",
    "client_username",
    "profile_name",
    "user_name",
    "lead_name",
  ]);
  if (preferred) return preferred;

  const messages = Array.isArray(item.messages) ? item.messages : [];
  for (const entry of messages) {
    const message = asRecord(entry);
    if (!message) continue;

    const sender = pickString(message, ["sender"]).toLowerCase();
    const messageUsername = pickString(message, [
      "username",
      "name",
      "display_name",
    ]);

    if (
      messageUsername &&
      !["ai", "agent", "bot", "assistant", "system"].includes(sender) &&
      !isAgentName(messageUsername)
    ) {
      return messageUsername;
    }
  }

  const username = pickString(item, ["username", "name", "display_name"]);
  if (username && !isAgentName(username)) return username;

  for (const entry of messages) {
    const message = asRecord(entry);
    if (!message) continue;
    const messageUsername = pickString(message, [
      "username",
      "name",
      "display_name",
    ]);
    if (messageUsername && !isAgentName(messageUsername)) {
      return messageUsername;
    }
  }

  return phone || username || `Chat ${index + 1}`;
}

function mapConversation(
  entry: unknown,
  index: number,
): WhatsAppConversation {
  const item = asRecord(entry) ?? {};
  const threadId = pickString(
    item,
    ["thread_id", "threadId", "id", "conversation_id", "chat_id"],
    String(index),
  );
  const { preview, timestamp, mode } = lastMessagePreview(item);
  const phone = resolvePhone(item, threadId);

  return {
    threadId,
    username: resolveContactUsername(item, phone, index),
    phone,
    mode,
    humanHandoff: resolveHumanHandoff(item),
    preview,
    timestamp: formatConversationTime(timestamp) || timestamp,
    messageCount: pickNumber(item, ["message_count", "messageCount", "count"]),
    unreadCount: pickNumber(item, ["unread_count", "unreadCount", "unread"]),
    avatarUrl:
      pickString(item, ["avatar_url", "profile_pic", "photo_url", "image"]) ||
      undefined,
  };
}

export function normalizeConversationList(
  data: unknown,
): WhatsAppConversation[] {
  return unwrapList(data).map((entry, index) => mapConversation(entry, index));
}

export function normalizeThreadMeta(
  data: unknown,
): Partial<WhatsAppConversation> | null {
  const record = asRecord(data);
  if (!record) return null;

  // List endpoints return arrays; detail is a single object with thread_id
  if (!record.thread_id && !record.threadId) return null;

  return mapConversation(record, 0);
}

export function normalizeMessages(data: unknown): WhatsAppMessage[] {
  type RawMessage = WhatsAppMessage & { sortKey: string };

  const raw: RawMessage[] = unwrapMessages(data).map((entry, index) => {
    const item = asRecord(entry) ?? {};
    const timestampRaw = pickString(item, [
      "timestamp",
      "created_at",
      "sent_at",
      "time",
      "updated_at",
    ]);
    const sender = pickString(item, ["sender"], "USER");
    const username = pickString(item, ["username"]);

    return {
      id: pickString(item, ["id", "message_id", "_id"], `msg-${index}`),
      content: pickString(item, ["message", "content", "text", "body", "msg"]),
      direction: resolveDirection(item),
      senderLabel: username || sender,
      mode: resolveMode(item),
      timestamp: formatMessageTime(timestampRaw) || timestampRaw,
      status: "read" as const,
      sortKey: timestampRaw,
    };
  });

  raw.sort((a, b) => {
    const aTime = Date.parse(a.sortKey);
    const bTime = Date.parse(b.sortKey);
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
    return aTime - bTime;
  });

  let previousLabel: string | undefined;

  return raw.map(({ sortKey, ...message }) => {
    const label = formatDateLabel(sortKey);
    const dateLabel = label && label !== previousLabel ? label : undefined;
    previousLabel = label ?? previousLabel;
    return { ...message, dateLabel };
  });
}

export function filterConversations(
  conversations: WhatsAppConversation[],
  search: string,
): WhatsAppConversation[] {
  const query = search.trim().toLowerCase();
  if (!query) return conversations;
  return conversations.filter(
    (conversation) =>
      conversation.username.toLowerCase().includes(query) ||
      conversation.phone.toLowerCase().includes(query) ||
      conversation.mode.toLowerCase().includes(query) ||
      conversation.preview.toLowerCase().includes(query),
  );
}
