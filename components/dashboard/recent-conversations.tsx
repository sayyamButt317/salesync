"use client";

import { motion } from "framer-motion";
import { Avatar, Badge, Card } from "@/components/ui";
import type { RecentConversation } from "@/lib/dashboard/types";
import { staggerContainer, tableRow } from "@/lib/motion/variants";

export interface RecentConversationsProps {
  conversations: RecentConversation[];
}

export function RecentConversations({
  conversations,
}: RecentConversationsProps) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h3 className="text-sm font-bold text-gray-900">
          Recent Conversations
        </h3>
      </div>

      <motion.ul
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="divide-y divide-gray-50"
      >
        {conversations.map((conversation) => (
          <motion.li
            key={conversation.id}
            variants={tableRow}
            whileHover={{ backgroundColor: "rgba(249,250,251,0.8)" }}
            className="flex cursor-pointer items-start gap-3 px-5 py-4 transition-colors"
          >
            <Avatar initials={conversation.initials} size="md" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-gray-900">
                  {conversation.name}
                </span>
                <Badge variant="agency">{conversation.agency}</Badge>
              </div>
              <p className="mt-0.5 truncate text-xs text-gray-500">
                {conversation.message}
              </p>
            </div>
            <div className="flex shrink-0 flex-col items-end gap-1.5">
              <span className="text-[11px] text-gray-400">
                {conversation.timeAgo}
              </span>
              <Badge variant={conversation.status}>
                {conversation.status}
              </Badge>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </Card>
  );
}
