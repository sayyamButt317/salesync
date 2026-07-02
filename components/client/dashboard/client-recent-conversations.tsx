"use client";

import { Mail, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Badge, Card } from "@/components/ui";
import type {
  ClientRecentConversation,
  ConversationPlatform,
} from "@/lib/client-dashboard/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

const PLATFORM_CONFIG: Record<
  ConversationPlatform,
  { icon: typeof MessageCircle; color: string; bg: string }
> = {
  WhatsApp: { icon: MessageCircle, color: "#22c55e", bg: "#dcfce7" },
  Instagram: { icon: MessageCircle, color: "#ec4899", bg: "#fce7f3" },
  Email: { icon: Mail, color: "#3b82f6", bg: "#dbeafe" },
};

export interface ClientRecentConversationsProps {
  conversations: ClientRecentConversation[];
}

export function ClientRecentConversations({
  conversations,
}: ClientRecentConversationsProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.3 }}
    >
      <Card padding="none" className="overflow-hidden">
        <div className="border-b border-gray-100 px-5 py-4">
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
          {conversations.map((conversation) => {
            const config = PLATFORM_CONFIG[conversation.platform];
            const Icon = config.icon;

            return (
              <motion.li
                key={conversation.id}
                variants={tableRow}
                whileHover={{ backgroundColor: "rgba(249,250,251,0.8)" }}
                className="flex items-start gap-3 px-5 py-3.5"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{ backgroundColor: config.bg }}
                >
                  <Icon className="h-4 w-4" style={{ color: config.color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-gray-900">
                      {conversation.name}
                    </span>
                    <span className="shrink-0 text-[11px] text-gray-400">
                      {conversation.timeAgo}
                    </span>
                  </div>
                  <p className="mt-0.5 truncate text-xs text-gray-500">
                    {conversation.message}
                  </p>
                </div>
                <Badge variant={conversation.status}>
                  {conversation.status}
                </Badge>
              </motion.li>
            );
          })}
        </motion.ul>
        <div className="border-t border-gray-100 px-5 py-3">
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 transition-colors hover:text-violet-700"
          >
            Go to conversations →
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
