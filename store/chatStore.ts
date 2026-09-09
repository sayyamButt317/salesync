import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { WhatsAppMessage } from "@/lib/client-conversation/types";
import {
  formatDateLabel,
  formatMessageTime,
} from "@/lib/client-conversation/utils";

export type ChatSender = "AI" | "USER" | "HUMAN" | "ADMIN" | "SYSTEM";

export type ChatConnectionStatus =
  | "idle"
  | "connecting"
  | "connected"
  | "disconnected";

export interface ChatMessage {
  id: string;
  threadId: string;
  sender: ChatSender;
  username: string;
  content: string;
  timestamp: string;
  conversationMode?: string;
  status?: "sent" | "delivered" | "read";
}

export interface ThreadPreview {
  preview: string;
  timestamp: string;
  username?: string;
  phone?: string;
}

/** Stable empty list so Zustand selectors don't create a new [] every render. */
export const EMPTY_CHAT_MESSAGES: ChatMessage[] = [];

interface ChatState {
  chats: Record<string, ChatMessage[]>;
  unread: Record<string, number>;
  previews: Record<string, ThreadPreview>;
  activeThreadId: string | null;
  connectionStatus: ChatConnectionStatus;

  setActiveThreadId: (threadId: string | null) => void;
  setConnectionStatus: (status: ChatConnectionStatus) => void;
  setMessages: (threadId: string, messages: ChatMessage[]) => void;
  addMessage: (threadId: string, message: ChatMessage) => void;
  removeMessage: (threadId: string, messageId: string) => void;
  clearThread: (threadId: string) => void;
  markRead: (threadId: string) => void;
  clearAll: () => void;
  getMessages: (threadId: string) => ChatMessage[];
  getUnreadCount: (threadId: string) => number;
  getTotalUnread: () => number;
}

function normalizeSender(raw: unknown): ChatSender {
  const value = String(raw ?? "").toUpperCase().trim();
  if (value === "AI" || value === "ASSISTANT" || value === "BOT" || value === "AGENT") {
    return "AI";
  }
  if (value === "ADMIN" || value === "HUMAN") return value as ChatSender;
  if (value === "SYSTEM") return "SYSTEM";
  return "USER";
}

function isSameMessage(a: ChatMessage, b: ChatMessage): boolean {
  if (a.id && b.id && a.id === b.id) return true;
  return (
    a.sender === b.sender &&
    a.content.trim() === b.content.trim() &&
    a.timestamp === b.timestamp
  );
}

function dedupeMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages.filter(
    (message, index) =>
      messages.findIndex((candidate) => isSameMessage(candidate, message)) ===
      index,
  );
}

function sortByTimestamp(messages: ChatMessage[]): ChatMessage[] {
  return [...messages].sort((a, b) => {
    const aTime = Date.parse(a.timestamp);
    const bTime = Date.parse(b.timestamp);
    if (Number.isNaN(aTime) || Number.isNaN(bTime)) return 0;
    return aTime - bTime;
  });
}


export function toChatMessage(payload: {
  id?: string;
  _id?: string;
  message_id?: string;
  thread_id?: string;
  threadId?: string;
  sender?: string;
  username?: string;
  message?: string;
  content?: string;
  text?: string;
  timestamp?: string;
  conversation_mode?: string;
  status?: ChatMessage["status"];
}): ChatMessage {
  const threadId = String(payload.thread_id || payload.threadId || "");
  const id =
    String(payload.id || payload._id || payload.message_id || "") ||
    `msg-${threadId}-${payload.timestamp || Date.now()}`;

  return {
    id,
    threadId,
    sender: normalizeSender(payload.sender),
    username: payload.username || normalizeSender(payload.sender),
    content: String(payload.message || payload.content || payload.text || ""),
    timestamp: payload.timestamp || new Date().toISOString(),
    conversationMode: payload.conversation_mode,
    status: payload.status ?? "delivered",
  };
}

export function messagesFromApiPayload(
  threadId: string,
  data: unknown,
): ChatMessage[] {
  const record =
    data && typeof data === "object" && !Array.isArray(data)
      ? (data as Record<string, unknown>)
      : null;

  const list = Array.isArray(data)
    ? data
    : Array.isArray(record?.messages)
      ? (record.messages as unknown[])
      : Array.isArray(record?.data)
        ? (record.data as unknown[])
        : [];

  return sortByTimestamp(
    dedupeMessages(
      list.map((entry, index) => {
        const item =
          entry && typeof entry === "object"
            ? (entry as Record<string, unknown>)
            : {};
        return toChatMessage({
          id: (item.id as string) || undefined,
          _id: (item._id as string) || undefined,
          message_id: (item.message_id as string) || `api-${threadId}-${index}`,
          thread_id: (item.thread_id as string) || threadId,
          sender: item.sender as string | undefined,
          username: item.username as string | undefined,
          message: item.message as string | undefined,
          content: item.content as string | undefined,
          text: item.text as string | undefined,
          timestamp: item.timestamp as string | undefined,
          conversation_mode: item.conversation_mode as string | undefined,
        });
      }),
    ),
  );
}

export function toWhatsAppMessages(messages: ChatMessage[]): WhatsAppMessage[] {
  let previousLabel: string | undefined;

  return sortByTimestamp(messages).map((message) => {
    const label = formatDateLabel(message.timestamp);
    const dateLabel = label && label !== previousLabel ? label : undefined;
    previousLabel = label ?? previousLabel;

    const isOutgoing =
      message.sender === "AI" ||
      message.sender === "ADMIN" ||
      message.sender === "HUMAN" ||
      message.sender === "SYSTEM";

    return {
      id: message.id,
      content: message.content,
      direction: isOutgoing ? "outgoing" : "incoming",
      senderLabel: message.username,
      timestamp: formatMessageTime(message.timestamp) || message.timestamp,
      dateLabel,
      mode: message.conversationMode,
      status: message.status ?? "read",
    };
  });
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      chats: {},
      unread: {},
      previews: {},
      activeThreadId: null,
      connectionStatus: "idle",

      setActiveThreadId: (threadId) =>
        set(
          (state) => {
            if (state.activeThreadId === threadId) {
              if (!threadId || (state.unread[threadId] || 0) === 0) {
                return state;
              }
            }

            return {
              activeThreadId: threadId,
              unread: threadId
                ? { ...state.unread, [threadId]: 0 }
                : state.unread,
            };
          },
          false,
          "chat/setActiveThreadId",
        ),

      setConnectionStatus: (status) =>
        set(
          (state) =>
            state.connectionStatus === status
              ? state
              : { connectionStatus: status },
          false,
          "chat/setConnectionStatus",
        ),

      setMessages: (threadId, messages) =>
        set(
          (state) => {
            const nextMessages = sortByTimestamp(dedupeMessages(messages));
            const previousMessages = state.chats[threadId] || [];

            const unchanged =
              previousMessages.length === nextMessages.length &&
              previousMessages.every(
                (message, index) =>
                  message.id === nextMessages[index]?.id &&
                  message.content === nextMessages[index]?.content &&
                  message.timestamp === nextMessages[index]?.timestamp,
              );

            if (unchanged) return state;
            const last = nextMessages[nextMessages.length - 1];
            return {
              chats: {
                ...state.chats,
                [threadId]: nextMessages,
              },
              unread: {
                ...state.unread,
                [threadId]:
                  state.activeThreadId === threadId
                    ? 0
                    : state.unread[threadId] || 0,
              },
              previews: last
                ? {
                    ...state.previews,
                    [threadId]: {
                      preview: last.content,
                      timestamp: last.timestamp,
                      username: last.username,
                      phone: state.previews[threadId]?.phone,
                    },
                  }
                : state.previews,
            };
          },
          false,
          "chat/setMessages",
        ),

      addMessage: (threadId, message) =>
        set(
          (state) => {
            const existing = state.chats[threadId] || [];
            if (existing.some((item) => isSameMessage(item, message))) {
              return state;
            }

            const nextMessages = sortByTimestamp([...existing, message]);
            const isActive = state.activeThreadId === threadId;
            const shouldIncrementUnread =
              !isActive &&
              (message.sender === "USER" || message.sender === "SYSTEM");
            const previousPreview = state.previews[threadId];

            return {
              chats: {
                ...state.chats,
                [threadId]: nextMessages,
              },
              unread: {
                ...state.unread,
                [threadId]:
                  (state.unread[threadId] || 0) + (shouldIncrementUnread ? 1 : 0),
              },
              previews: {
                ...state.previews,
                [threadId]: {
                  preview: message.content,
                  timestamp: message.timestamp,
                  username: message.username || previousPreview?.username,
                  phone: previousPreview?.phone,
                },
              },
            };
          },
          false,
          "chat/addMessage",
        ),

      removeMessage: (threadId, messageId) =>
        set(
          (state) => {
            const existing = state.chats[threadId] || [];
            const nextMessages = existing.filter(
              (message) => message.id !== messageId,
            );
            const last = nextMessages[nextMessages.length - 1];

            return {
              chats: {
                ...state.chats,
                [threadId]: nextMessages,
              },
              previews: last
                ? {
                    ...state.previews,
                    [threadId]: {
                      preview: last.content,
                      timestamp: last.timestamp,
                      username: last.username,
                    },
                  }
                : state.previews,
            };
          },
          false,
          "chat/removeMessage",
        ),

      clearThread: (threadId) =>
        set(
          (state) => {
            const { [threadId]: _removedChat, ...chats } = state.chats;
            const { [threadId]: _removedUnread, ...unread } = state.unread;
            const { [threadId]: _removedPreview, ...previews } = state.previews;

            return {
              chats,
              unread,
              previews,
              activeThreadId:
                state.activeThreadId === threadId ? null : state.activeThreadId,
            };
          },
          false,
          "chat/clearThread",
        ),

      markRead: (threadId) =>
        set(
          (state) => {
            if ((state.unread[threadId] || 0) === 0) return state;
            return {
              unread: { ...state.unread, [threadId]: 0 },
            };
          },
          false,
          "chat/markRead",
        ),

      clearAll: () =>
        set(
          {
            chats: {},
            unread: {},
            previews: {},
            activeThreadId: null,
            connectionStatus: "idle",
          },
          false,
          "chat/clearAll",
        ),

      getMessages: (threadId) => get().chats[threadId] || EMPTY_CHAT_MESSAGES,
      getUnreadCount: (threadId) => get().unread[threadId] || 0,
      getTotalUnread: () =>
        Object.values(get().unread).reduce((total, count) => total + count, 0),
    }),
    { name: "SaleSyncChatStore" },
  ),
);

export const useWhatsAppChatStore = useChatStore;
