"use client";

import { CheckCheck } from "lucide-react";
import type { ChatMessage } from "@/lib/conversations/types";

export interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isOutgoing = message.direction === "outgoing";

  return (
    <div
      data-message
      className={`flex flex-col ${isOutgoing ? "items-end" : "items-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isOutgoing
            ? "rounded-br-md bg-violet-100 text-gray-900"
            : "rounded-bl-md border border-gray-100 bg-white text-gray-800 shadow-sm"
        }`}
      >
        {message.content}
      </div>
      <div
        className={`mt-1 flex items-center gap-1 px-1 ${
          isOutgoing ? "flex-row-reverse" : ""
        }`}
      >
        <span className="text-[10px] text-gray-400">{message.timestamp}</span>
        {isOutgoing && message.read ? (
          <CheckCheck className="h-3 w-3 text-violet-500" />
        ) : null}
      </div>
    </div>
  );
}

export interface DateSeparatorProps {
  label: string;
}

export function DateSeparator({ label }: DateSeparatorProps) {
  return (
    <div className="relative my-4 flex items-center justify-center">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gray-100" />
      <span className="relative bg-[#fafbfc] px-3 text-[11px] font-medium text-gray-400">
        {label}
      </span>
    </div>
  );
}
