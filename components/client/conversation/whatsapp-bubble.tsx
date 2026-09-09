"use client";

import { Check, CheckCheck, Trash2 } from "lucide-react";
import type { WhatsAppMessage } from "@/lib/client-conversation/types";
import { avatarHue, getInitials } from "@/lib/client-conversation/utils";

export interface WhatsAppBubbleProps {
  message: WhatsAppMessage;
  showAvatar?: boolean;
  contactName?: string;
  contactAvatarUrl?: string;
  onDeleteMessage?: (messageId: string) => void;
  isDeleting?: boolean;
}

export function WhatsAppDateChip({ label }: { label: string }) {
  return (
    <div className="my-3 flex justify-center">
      <span className="rounded-lg bg-[#e1f2fa] px-3 py-1 text-[12px] font-medium text-[#54656f] shadow-sm">
        {label}
      </span>
    </div>
  );
}

function CircleAvatar({
  name,
  avatarUrl,
  size = 28,
}: {
  name: string;
  avatarUrl?: string;
  size?: number;
}) {
  return (
    <div
      className="flex shrink-0 items-center justify-center overflow-hidden rounded-full text-[10px] font-semibold text-white shadow-sm"
      style={{
        width: size,
        height: size,
        backgroundColor: avatarHue(name),
      }}
      aria-hidden
    >
      {avatarUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={avatarUrl}
          alt=""
          className="h-full w-full rounded-full object-cover"
        />
      ) : (
        getInitials(name)
      )}
    </div>
  );
}

export function WhatsAppBubble({
  message,
  showAvatar = false,
  contactName = "",
  contactAvatarUrl,
  onDeleteMessage,
  isDeleting,
}: WhatsAppBubbleProps) {
  const isOutgoing = message.direction === "outgoing";
  const avatarName = isOutgoing
    ? message.senderLabel || "AI"
    : contactName || message.senderLabel || "?";

  return (
    <div
      data-message
      className={`group flex items-end gap-2 ${
        isOutgoing ? "justify-end" : "justify-start"
      }`}
    >
      {!isOutgoing ? (
        showAvatar ? (
          <CircleAvatar name={avatarName} avatarUrl={contactAvatarUrl} />
        ) : (
          <div className="w-7 shrink-0" />
        )
      ) : null}

      {isOutgoing && onDeleteMessage ? (
        <button
          type="button"
          onClick={() => onDeleteMessage(message.id)}
          disabled={isDeleting}
          className="mb-1 hidden h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#667781] opacity-0 transition-opacity hover:bg-[#e9edef] hover:text-red-500 group-hover:inline-flex group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Delete message"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      ) : null}

      <div
        className={`relative max-w-[85%] rounded-lg px-2.5 pb-1.5 pt-1.5 text-[14.2px] leading-[19px] shadow-sm sm:max-w-[65%] ${
          isOutgoing
            ? "rounded-tr-none bg-[#d9fdd3] text-[#111b21]"
            : "rounded-tl-none bg-white text-[#111b21]"
        }`}
      >
        {isOutgoing && message.senderLabel ? (
          <p className="mb-0.5 text-[11px] font-semibold text-[#00a884]">
            {message.senderLabel}
          </p>
        ) : null}
        <p className="whitespace-pre-wrap break-words pr-12">{message.content}</p>
        <span className="absolute bottom-1 right-2 inline-flex items-center gap-0.5">
          <span className="text-[11px] leading-none text-[#667781]">
            {message.timestamp}
          </span>
          {isOutgoing ? (
            message.status === "read" ? (
              <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
            ) : (
              <Check className="h-3.5 w-3.5 text-[#667781]" />
            )
          ) : null}
        </span>
      </div>

      {!isOutgoing && onDeleteMessage ? (
        <button
          type="button"
          onClick={() => onDeleteMessage(message.id)}
          disabled={isDeleting}
          className="mb-1 hidden h-7 w-7 cursor-pointer items-center justify-center rounded-full text-[#667781] opacity-0 transition-opacity hover:bg-[#e9edef] hover:text-red-500 group-hover:inline-flex group-hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Delete message"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      ) : null}

      {isOutgoing ? (
        showAvatar ? (
          <CircleAvatar name={avatarName} />
        ) : (
          <div className="w-7 shrink-0" />
        )
      ) : null}
    </div>
  );
}
