"use client";

import { motion } from "framer-motion";
import { Avatar } from "@/components/ui";
import { CHANNEL_COLORS, CHANNEL_ICONS } from "@/lib/conversations/data";
import type { ConversationPreview } from "@/lib/conversations/types";

export interface ConversationListItemProps {
  conversation: ConversationPreview;
  isActive: boolean;
  onSelect: (id: string) => void;
}

export function ConversationListItem({
  conversation,
  isActive,
  onSelect,
}: ConversationListItemProps) {
  const ChannelIcon = CHANNEL_ICONS[conversation.channel];
  const channelColor = CHANNEL_COLORS[conversation.channel];

  return (
    <motion.button
      type="button"
      data-animate
      onClick={() => onSelect(conversation.id)}
      whileHover={{ backgroundColor: isActive ? undefined : "rgba(245,243,255,0.6)" }}
      className={`relative flex w-full cursor-pointer items-start gap-3 border-b border-gray-50 px-4 py-3.5 text-left transition-colors ${
        isActive
          ? "border-l-[3px] border-l-violet-600 bg-violet-50/80 pl-[13px]"
          : "border-l-[3px] border-l-transparent pl-4"
      }`}
    >
      <Avatar
        initials={conversation.initials}
        size="md"
        color={conversation.avatarColor}
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span
            className={`truncate text-sm ${
              isActive ? "font-bold text-gray-900" : "font-semibold text-gray-900"
            }`}
          >
            {conversation.contactName}
          </span>
          <span className="shrink-0 text-[11px] text-gray-400">
            {conversation.timestamp}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-gray-500">
          {conversation.preview}
        </p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5 pt-0.5">
        <ChannelIcon
          className="h-3.5 w-3.5"
          style={{ color: channelColor }}
        />
        {conversation.unreadCount ? (
          <span className="flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
            {conversation.unreadCount}
          </span>
        ) : null}
      </div>
    </motion.button>
  );
}
