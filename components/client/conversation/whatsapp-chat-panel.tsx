"use client";

import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  SendHorizontal,
  Smile,
  Trash2,
  Video,
} from "lucide-react";
import type {
  WhatsAppConversation,
  WhatsAppMessage,
} from "@/lib/client-conversation/types";
import {
  avatarHue,
  formatModeLabel,
  formatPhoneNumber,
  getInitials,
} from "@/lib/client-conversation/utils";
import { WhatsAppBubble, WhatsAppDateChip } from "./whatsapp-bubble";

const CHAT_BG_STYLE = {
  backgroundColor: "#efeae2",
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d1ccc4' fill-opacity='0.28'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
} as const;

export interface WhatsAppChatPanelProps {
  conversation?: WhatsAppConversation;
  messages: WhatsAppMessage[];
  isLoading?: boolean;
  fullWidth?: boolean;
  onBack?: () => void;
  onDeleteConversation?: (threadId: string) => void;
  onDeleteMessages?: (messageId: string) => void;
  onSendMessage?: (payload: {
    message: string;
    phone_number: string;
    thread_id: string;
  }) => void;
  isDeletingConversation?: boolean;
  isDeletingMessage?: boolean;
  isSendingMessage?: boolean;
}

function ModeBadge({ mode }: { mode: string }) {
  const label = formatModeLabel(mode);
  const isDefault = mode.toUpperCase() === "DEFAULT";

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ${
        isDefault
          ? "bg-[#e7f8ef] text-[#00a884]"
          : "bg-[#fff3cd] text-[#856404]"
      }`}
    >
      {label}
    </span>
  );
}

function HeaderAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string;
}) {
  return (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-semibold text-white ring-2 ring-white"
      style={{ backgroundColor: avatarHue(name) }}
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt={name}
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

export function WhatsAppEmptyState() {
  return (
    <div className="relative hidden h-full flex-1 flex-col items-center justify-center bg-[#f0f2f5] md:flex">
      <div className="max-w-md px-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#d1e7dd]">
          <Phone className="h-9 w-9 text-[#00a884]" />
        </div>
        <h2 className="text-[32px] font-light text-[#41525d]">
          WhatsApp Conversations
        </h2>
        <p className="mt-3 text-[14px] leading-relaxed text-[#667781]">
          Select a chat from the left to read messages, just like WhatsApp Web.
          Your AI agent replies appear on the green side.
        </p>
      </div>
      <div className="absolute bottom-10 text-[13px] text-[#8696a0]">
        End-to-end encrypted experience inspired by WhatsApp
      </div>
    </div>
  );
}

export function WhatsAppChatPanel({
  conversation,
  messages,
  isLoading,
  fullWidth = false,
  onBack,
  onDeleteConversation,
  onDeleteMessages,
  onSendMessage,
  isDeletingConversation,
  isDeletingMessage,
  isSendingMessage,
}: WhatsAppChatPanelProps) {
  const feedRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [draft, setDraft] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setDraft("");
    setMenuOpen(false);
  }, [conversation?.threadId]);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;
    feed.scrollTop = feed.scrollHeight;
  }, [conversation?.threadId, messages.length, isLoading, isSendingMessage]);

  useEffect(() => {
    if (!menuOpen) return;

    const onPointerDown = (event: MouseEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [menuOpen]);

  if (!conversation) {
    return <WhatsAppEmptyState />;
  }

  const phoneLabel = conversation.phone
    ? formatPhoneNumber(conversation.phone)
    : "";

  const handleDeleteChat = () => {
    if (!onDeleteConversation) return;
    setMenuOpen(false);
    onDeleteConversation(conversation.threadId);
  };

  const handleSend = () => {
    const message = draft.trim();
    if (!message || !onSendMessage || isSendingMessage) return;

    onSendMessage({
      message,
      phone_number: conversation.phone || conversation.threadId,
      thread_id: conversation.threadId,
    });
    setDraft("");
  };

  const handleComposerKeyDown = (
    event: KeyboardEvent<HTMLTextAreaElement>,
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <section className="flex h-full min-w-0 flex-1 flex-col bg-[#efeae2]">
      <header className="flex h-[60px] shrink-0 items-center gap-3 border-l border-[#d1d7db] bg-[#f0f2f5] px-3">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#54656f] transition-colors hover:bg-[#e9edef] md:hidden"
            aria-label="Back to chats"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        ) : null}

        <HeaderAvatar
          name={conversation.username}
          avatarUrl={conversation.avatarUrl}
        />

        <div className="min-w-0 flex-1">
          <div className="flex min-w-0 items-center gap-2">
            <p className="truncate text-[16px] font-medium text-[#111b21]">
              {conversation.username}
            </p>
            <ModeBadge mode={conversation.mode} />
          </div>
          <p className="truncate text-[13px] text-[#667781]">
            {phoneLabel
              ? `${phoneLabel}${
                  conversation.messageCount
                    ? ` · ${conversation.messageCount} messages`
                    : ""
                }`
              : conversation.messageCount
                ? `${conversation.messageCount} messages`
                : "click here for contact info"}
          </p>
        </div>

        <div className="relative flex items-center gap-1" ref={menuRef}>
          <div className="hidden items-center gap-1 sm:flex">
            <IconAction label="Video call">
              <Video className="h-5 w-5" />
            </IconAction>
            <IconAction label="Voice call">
              <Phone className="h-5 w-5" />
            </IconAction>
            <IconAction label="Search">
              <Search className="h-5 w-5" />
            </IconAction>
          </div>

          <button
            type="button"
            aria-label="More"
            onClick={() => setMenuOpen((open) => !open)}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#54656f] transition-colors hover:bg-[#e9edef]"
          >
            <MoreVertical className="h-5 w-5" />
          </button>

          {menuOpen ? (
            <div className="absolute right-0 top-11 z-20 min-w-[180px] overflow-hidden rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5">
              <button
                type="button"
                onClick={handleDeleteChat}
                disabled={!onDeleteConversation || isDeletingConversation}
                className="flex w-full cursor-pointer items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4" />
                {isDeletingConversation ? "Deleting…" : "Delete chat"}
              </button>
            </div>
          ) : null}
        </div>
      </header>

      <div
        ref={feedRef}
        className={`min-h-0 flex-1 overflow-y-auto px-4 py-3 ${
          fullWidth ? "sm:px-8 lg:px-16" : "sm:px-12"
        }`}
        style={CHAT_BG_STYLE}
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center">
            <div className="rounded-full bg-white/90 px-4 py-2 text-sm text-[#667781] shadow-sm">
              Loading messages…
            </div>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="rounded-lg bg-[#ffeecd] px-4 py-2 text-center text-[12.5px] text-[#54656f] shadow-sm">
              No messages in this chat yet. Messages will appear here.
            </div>
          </div>
        ) : (
          <div
            className={`mx-auto flex w-full flex-col gap-1.5 ${
              fullWidth ? "max-w-none" : "max-w-3xl"
            }`}
          >
            {messages.map((message, index) => {
              const previous = index > 0 ? messages[index - 1] : null;
              const showAvatar =
                !previous || previous.direction !== message.direction;

              return (
                <div key={message.id}>
                  {message.dateLabel ? (
                    <WhatsAppDateChip label={message.dateLabel} />
                  ) : null}
                  <WhatsAppBubble
                    message={message}
                    showAvatar={showAvatar}
                    contactName={conversation.username}
                    contactAvatarUrl={conversation.avatarUrl}
                    onDeleteMessage={onDeleteMessages}
                    isDeleting={isDeletingMessage}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>

      <footer className="flex shrink-0 items-end gap-2 bg-[#f0f2f5] px-3 py-2">
        <button
          type="button"
          className="mb-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#54656f] transition-colors hover:bg-[#e9edef]"
          aria-label="Emoji"
        >
          <Smile className="h-6 w-6" />
        </button>
        <button
          type="button"
          className="mb-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#54656f] transition-colors hover:bg-[#e9edef]"
          aria-label="Attach"
        >
          <Paperclip className="h-5 w-5" />
        </button>

        <div className="min-w-0 flex-1 rounded-[8px] bg-white px-3 py-2.5">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            onKeyDown={handleComposerKeyDown}
            rows={1}
            placeholder="Type a message"
            disabled={isSendingMessage || !onSendMessage}
            className="max-h-28 w-full resize-none bg-transparent text-[15px] text-[#111b21] outline-none placeholder:text-[#667781] disabled:opacity-60"
          />
        </div>

        <button
          type="button"
          onClick={handleSend}
          disabled={
            !onSendMessage || isSendingMessage || !draft.trim()
          }
          className={`mb-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
            draft.trim() && !isSendingMessage
              ? "bg-[#00a884] text-white hover:bg-[#019a78]"
              : "text-[#54656f] hover:bg-[#e9edef]"
          }`}
          aria-label="Send message"
        >
          <SendHorizontal className="h-5 w-5" />
        </button>
      </footer>
    </section>
  );
}

function IconAction({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#54656f] transition-colors hover:bg-[#e9edef]"
    >
      {children}
    </button>
  );
}
