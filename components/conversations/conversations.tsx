"use client";

import { useMemo, useState } from "react";
import { AppShell } from "@/components/layout";
import { CONVERSATION_THREADS } from "@/lib/conversations/data";
import type {
  ChatInputMode,
  ConversationListTab,
  ConversationsPageProps,
} from "@/lib/conversations/types";
import { filterConversations } from "@/lib/conversations/utils";
import { ConversationsHeader } from "./conversations-header";
import { ConversationList } from "./conversation-list";
import { ChatWindow } from "./chat-window";
import { ContactDetailsPanel } from "./contact-details-panel";

export function ConversationsPage({
  activeNavId = "conversations",
}: ConversationsPageProps) {
  const [listTab, setListTab] = useState<ConversationListTab>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState(CONVERSATION_THREADS[0].id);
  const [inputMode, setInputMode] = useState<ChatInputMode>("reply");
  const [messageDraft, setMessageDraft] = useState("");

  const filteredThreads = useMemo(
    () => filterConversations(CONVERSATION_THREADS, listTab, search),
    [listTab, search],
  );

  const selectedThread = useMemo(() => {
    const match = CONVERSATION_THREADS.find((t) => t.id === selectedId);
    return match ?? CONVERSATION_THREADS[0];
  }, [selectedId]);

  const visibleThreads =
    filteredThreads.length > 0 ? filteredThreads : [selectedThread];

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setMessageDraft("");
  };

  const handleTabChange = (tab: ConversationListTab) => {
    setListTab(tab);
  };

  return (
    <AppShell
      activeNavId={activeNavId}
      contentClassName="flex min-h-full flex-col overflow-hidden !p-6"
    >
      <ConversationsHeader search={search} onSearchChange={setSearch} />

      <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <ConversationList
          threads={visibleThreads}
          activeId={selectedThread.id}
          tab={listTab}
          onTabChange={handleTabChange}
          onSelect={handleSelect}
        />
        <ChatWindow
          thread={selectedThread}
          inputMode={inputMode}
          messageDraft={messageDraft}
          onInputModeChange={setInputMode}
          onMessageDraftChange={setMessageDraft}
        />
        <ContactDetailsPanel
          contact={selectedThread.contact}
          deals={selectedThread.deals}
          notes={selectedThread.notes}
          activities={selectedThread.activities}
        />
      </div>
    </AppShell>
  );
}
