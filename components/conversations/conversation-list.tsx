"use client";

import { Tabs } from "@/components/ui";
import { TOTAL_CONVERSATIONS_COUNT, CONVERSATION_TAB_LABELS } from "@/lib/conversations/types";
import type { ConversationListTab, ConversationThread } from "@/lib/conversations/types";
import { useGsapStagger } from "@/lib/motion/use-gsap-stagger";
import { ConversationListItem } from "./conversation-list-item";

const LIST_TABS = (
  Object.keys(CONVERSATION_TAB_LABELS) as ConversationListTab[]
).map((id) => ({
  id,
  label: CONVERSATION_TAB_LABELS[id].label,
  badge: CONVERSATION_TAB_LABELS[id].badge,
}));

export interface ConversationListProps {
  threads: ConversationThread[];
  activeId: string;
  tab: ConversationListTab;
  onTabChange: (tab: ConversationListTab) => void;
  onSelect: (id: string) => void;
}

export function ConversationList({
  threads,
  activeId,
  tab,
  onTabChange,
  onSelect,
}: ConversationListProps) {
  const listRef = useGsapStagger<HTMLDivElement>({
    selector: "[data-animate]",
    y: 16,
    stagger: 0.06,
    delay: 0.15,
  });

  return (
    <div className="flex h-full w-full flex-col border-r border-gray-100 bg-white sm:w-72 lg:w-80">
      <div className="shrink-0 px-3 pt-2">
        <Tabs
          tabs={LIST_TABS}
          value={tab}
          onChange={onTabChange}
          layoutId="conversation-list-tab"
        />
      </div>

      <div ref={listRef} className="min-h-0 flex-1 overflow-y-auto">
        {threads.map((thread) => (
          <ConversationListItem
            key={thread.id}
            conversation={thread.preview}
            isActive={thread.id === activeId}
            onSelect={onSelect}
          />
        ))}
      </div>

      <div className="shrink-0 border-t border-gray-100 px-4 py-3 text-center text-[11px] text-gray-400">
        Showing 1 to {threads.length} of {TOTAL_CONVERSATIONS_COUNT}{" "}
        conversations
      </div>
    </div>
  );
}
