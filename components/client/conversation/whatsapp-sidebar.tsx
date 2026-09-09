"use client";

import { Search, Trash2 } from "lucide-react";
import type { WhatsAppConversation } from "@/lib/client-conversation/types";
import {
  avatarHue,
  formatModeLabel,
  formatPhoneNumber,
  getInitials,
} from "@/lib/client-conversation/utils";

export interface WhatsAppSidebarProps {
  conversations: WhatsAppConversation[];
  activeThreadId?: string;
  search: string;
  onSearchChange: (value: string) => void;
  onSelect: (threadId: string) => void;
  onDeleteConversation?: (threadId: string) => void;
  isDeletingConversation?: boolean;
  deletingThreadId?: string | null;
  isLoading?: boolean;
}

function ConversationAvatar({
  name,
  avatarUrl,
}: {
  name: string;
  avatarUrl?: string;
}) {
  if (avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatarUrl}
        alt={name}
        className="h-12 w-12 rounded-full object-cover"
      />
    );
  }

  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
      style={{ backgroundColor: avatarHue(name) }}
    >
      {getInitials(name)}
    </div>
  );
}

function ModePill({ mode }: { mode: string }) {
  const label = formatModeLabel(mode);
  const isDefault = mode.toUpperCase() === "DEFAULT";

  return (
    <span
      className={`shrink-0 rounded-full px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
        isDefault
          ? "bg-[#e7f8ef] text-[#00a884]"
          : "bg-[#fff3cd] text-[#856404]"
      }`}
    >
      {label}
    </span>
  );
}

export function WhatsAppSidebar({
  conversations,
  activeThreadId,
  search,
  onSearchChange,
  onSelect,
  onDeleteConversation,
  isDeletingConversation,
  deletingThreadId,
  isLoading,
}: WhatsAppSidebarProps) {
  return (
    <aside className="flex h-full w-full flex-col border-r border-[#e9edef] bg-white md:w-[380px] md:shrink-0">
      <div className="flex h-[60px] items-center bg-[#f0f2f5] px-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#dfe5e7] text-sm font-bold text-[#54656f]">
          WA
        </div>
        <div className="ml-3 min-w-0">
          <p className="truncate text-[16px] font-medium text-[#111b21]">
            Chats
          </p>
          <p className="truncate text-[12px] text-[#667781]">
            WhatsApp conversations
          </p>
        </div>
      </div>

      <div className="bg-white px-3 py-2">
        <label className="flex h-[35px] items-center gap-3 rounded-lg bg-[#f0f2f5] px-3">
          <Search className="h-4 w-4 shrink-0 text-[#54656f]" />
          <input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search name, phone, or mode"
            className="w-full bg-transparent text-[14px] text-[#111b21] outline-none placeholder:text-[#667781]"
          />
        </label>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="space-y-1 p-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-center gap-3 rounded-lg px-2 py-3"
              >
                <div className="h-12 w-12 rounded-full bg-[#e9edef]" />
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 rounded bg-[#e9edef]" />
                  <div className="h-3 w-3/4 rounded bg-[#e9edef]" />
                </div>
              </div>
            ))}
          </div>
        ) : conversations.length === 0 ? (
          <div className="px-6 py-10 text-center text-sm text-[#667781]">
            No conversations found
          </div>
        ) : (
          conversations.map((conversation) => {
            const isActive = conversation.threadId === activeThreadId;
            const phoneLabel = conversation.phone
              ? formatPhoneNumber(conversation.phone)
              : "";
            const isDeletingThis =
              isDeletingConversation &&
              deletingThreadId === conversation.threadId;

            return (
              <div
                key={conversation.threadId}
                className={`group relative flex w-full items-center gap-2 border-b border-[#f0f2f5] px-2 py-2 transition-colors ${
                  isActive ? "bg-[#f0f2f5]" : "hover:bg-[#f5f6f6]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => onSelect(conversation.threadId)}
                  className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 px-1 py-1 text-left"
                >
                  <ConversationAvatar
                    name={conversation.username}
                    avatarUrl={conversation.avatarUrl}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="truncate text-[17px] font-normal text-[#111b21]">
                        {conversation.username}
                      </span>
                      <span
                        className={`shrink-0 text-[12px] ${
                          conversation.unreadCount > 0
                            ? "text-[#25d366]"
                            : "text-[#667781]"
                        }`}
                      >
                        {conversation.timestamp}
                      </span>
                    </div>

                    <div className="mt-0.5 flex items-center gap-2">
                      {phoneLabel ? (
                        <span className="truncate text-[12px] text-[#8696a0]">
                          {phoneLabel}
                        </span>
                      ) : null}
                      <ModePill mode={conversation.mode} />
                    </div>

                    <div className="mt-0.5 flex items-center justify-between gap-2">
                      <p className="truncate text-[14px] text-[#667781]">
                        {conversation.preview || "No messages yet"}
                      </p>
                      {conversation.unreadCount > 0 ? (
                        <span className="flex h-[20px] min-w-[20px] shrink-0 items-center justify-center rounded-full bg-[#25d366] px-1.5 text-[11px] font-semibold text-white">
                          {conversation.unreadCount}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>

                {onDeleteConversation ? (
                  <button
                    type="button"
                    aria-label={`Delete chat with ${conversation.username}`}
                    disabled={isDeletingConversation}
                    onClick={(event) => {
                      event.stopPropagation();
                      onDeleteConversation(conversation.threadId);
                    }}
                    className={`flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#667781] transition-colors hover:bg-red-50 hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-40 ${
                      isActive || isDeletingThis
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  >
                    <Trash2
                      className={`h-4 w-4 ${isDeletingThis ? "animate-pulse" : ""}`}
                    />
                  </button>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </aside>
  );
}
