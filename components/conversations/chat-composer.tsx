"use client";

import {
  Check,
  ChevronDown,
  MoreHorizontal,
  Paperclip,
  Send,
  Smile,
  Star,
  StickyNote,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import { IconButton } from "@/components/ui";
import { CHANNEL_COLORS, CHANNEL_ICONS } from "@/lib/conversations/data";
import type { ChatInputMode, ContactDetails } from "@/lib/conversations/types";
import { fadeUp } from "@/lib/motion/variants";

export interface ChatHeaderProps {
  contact: ContactDetails;
}

export function ChatHeader({ contact }: ChatHeaderProps) {
  const ChannelIcon = CHANNEL_ICONS[contact.channel];
  const channelColor = CHANNEL_COLORS[contact.channel];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className="flex shrink-0 items-center justify-between border-b border-gray-100 bg-white px-5 py-3.5"
    >
      <div className="flex items-center gap-3">
        <h2 className="text-sm font-bold text-gray-900">{contact.name}</h2>
        <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-[11px] font-semibold text-green-700">
          <ChannelIcon className="h-3 w-3" style={{ color: channelColor }} />
          {contact.channel}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <IconButton aria-label="Star" className="h-9 w-9 border-0 shadow-none">
          <Star className="h-4 w-4" />
        </IconButton>
        <IconButton aria-label="Tag" className="h-9 w-9 border-0 shadow-none">
          <Tag className="h-4 w-4" />
        </IconButton>
        <IconButton aria-label="Mark done" className="h-9 w-9 border-0 shadow-none">
          <Check className="h-4 w-4" />
        </IconButton>
        <IconButton aria-label="More" className="h-9 w-9 border-0 shadow-none">
          <MoreHorizontal className="h-4 w-4" />
        </IconButton>
      </div>
    </motion.div>
  );
}

export interface MessageInputProps {
  mode: ChatInputMode;
  onModeChange: (mode: ChatInputMode) => void;
  value: string;
  onChange: (value: string) => void;
}

export function MessageInput({
  mode,
  onModeChange,
  value,
  onChange,
}: MessageInputProps) {
  return (
    <div className="shrink-0 border-t border-gray-100 bg-white px-5 py-4">
      <div className="mb-3 flex gap-4 border-b border-gray-100">
        {(["reply", "note"] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => onModeChange(tab)}
            className={`relative cursor-pointer pb-2 text-sm font-medium capitalize transition-colors ${
              mode === tab
                ? "text-violet-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
            {mode === tab ? (
              <motion.span
                layoutId="chat-input-tab"
                className="absolute inset-x-0 -bottom-px h-0.5 bg-violet-600"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            ) : null}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50/50 focus-within:border-violet-300 focus-within:ring-2 focus-within:ring-violet-100">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={
            mode === "reply" ? "Type your message..." : "Add an internal note..."
          }
          rows={3}
          className="w-full resize-none bg-transparent px-4 pt-3 pb-2 text-sm text-gray-900 placeholder:text-gray-400 outline-none"
        />
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white hover:text-gray-600"
              aria-label="Attach file"
            >
              <Paperclip className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white hover:text-gray-600"
              aria-label="Emoji"
            >
              <Smile className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white hover:text-gray-600"
              aria-label="Templates"
            >
              <StickyNote className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 transition-colors hover:bg-violet-700"
          >
            <Send className="h-4 w-4" />
            Send
            <ChevronDown className="h-3.5 w-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
}
