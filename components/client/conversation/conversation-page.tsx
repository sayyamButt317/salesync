"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ClientShell } from "@/components/client/layout";
import type {
  ConversationPageProps,
  WhatsAppConversation,
} from "@/lib/client-conversation/types";
import {
  filterConversations,
  formatConversationTime,
  normalizeConversationList,
  normalizeThreadMeta,
} from "@/lib/client-conversation/utils";
import {
  useConversationByThreadId,
  useConversationList,
} from "@/routes/client/query";
import { useDeleteConversationMutation } from "@/routes/client/mutation";
import {
  EMPTY_CHAT_MESSAGES,
  messagesFromApiPayload,
  toWhatsAppMessages,
  useChatStore,
} from "@/store/chatStore";
import { WhatsAppChatPanel } from "./whatsapp-chat-panel";
import { WhatsAppSidebar } from "./whatsapp-sidebar";

export function ConversationPage({
  activeNavId = "conversations",
  initialThreadId,
  fullWidth = false,
  onDeleteConversation,
  onDeleteMessages,
  onSendMessage,
  onHumanHandoff,
  isDeletingConversation,
  isDeletingMessage,
  isSendingMessage,
  isUpdatingHandoff,
}: ConversationPageProps) {
  const router = useRouter();
  const deleteConversation = useDeleteConversationMutation();
  const [search, setSearch] = useState("");
  const [selectedThreadId, setSelectedThreadId] = useState(
    initialThreadId ?? "",
  );
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null);

  const setMessages = useChatStore((state) => state.setMessages);
  const setActiveThreadId = useChatStore((state) => state.setActiveThreadId);
  const markRead = useChatStore((state) => state.markRead);
  const clearThread = useChatStore((state) => state.clearThread);
  const storeMessages = useChatStore((state) => {
    if (!selectedThreadId) return EMPTY_CHAT_MESSAGES;
    return state.chats[selectedThreadId] ?? EMPTY_CHAT_MESSAGES;
  });
  const unreadMap = useChatStore((state) => state.unread);
  const previews = useChatStore((state) => state.previews);

  const {
    data: conversationListData,
    isLoading: isListLoading,
    isError: isListError,
  } = useConversationList();

  const conversations = useMemo(() => {
    const list = normalizeConversationList(conversationListData);

    return list.map((conversation): WhatsAppConversation => {
      const livePreview = previews[conversation.threadId];
      const liveUnread = unreadMap[conversation.threadId] || 0;

      return {
        ...conversation,
        preview: livePreview?.preview || conversation.preview,
        timestamp: livePreview?.timestamp
          ? formatConversationTime(livePreview.timestamp) ||
            conversation.timestamp
          : conversation.timestamp,
        unreadCount: Math.max(conversation.unreadCount, liveUnread),
      };
    });
  }, [conversationListData, previews, unreadMap]);

  const filteredConversations = useMemo(
    () => filterConversations(conversations, search),
    [conversations, search],
  );

  useEffect(() => {
    setSelectedThreadId(initialThreadId ?? "");
  }, [initialThreadId]);

  useEffect(() => {
    setActiveThreadId(selectedThreadId || null);
    if (selectedThreadId) {
      markRead(selectedThreadId);
    }
  }, [selectedThreadId, setActiveThreadId, markRead]);

  useEffect(() => {
    return () => {
      setActiveThreadId(null);
    };
  }, [setActiveThreadId]);

  const {
    data: threadData,
    isLoading: isThreadLoading,
    isFetching: isThreadFetching,
  } = useConversationByThreadId(selectedThreadId);

  const threadMeta = useMemo(
    () => normalizeThreadMeta(threadData),
    [threadData],
  );

  useEffect(() => {
    if (!selectedThreadId || !threadData) return;
    setMessages(
      selectedThreadId,
      messagesFromApiPayload(selectedThreadId, threadData),
    );
  }, [selectedThreadId, threadData, setMessages]);

  const activeConversation = useMemo(() => {
    const fromList = conversations.find(
      (conversation) => conversation.threadId === selectedThreadId,
    );

    if (!selectedThreadId) return undefined;

    return {
      threadId: selectedThreadId,
      username: threadMeta?.username || fromList?.username || "Conversation",
      phone: threadMeta?.phone || fromList?.phone || selectedThreadId,
      mode: threadMeta?.mode || fromList?.mode || "DEFAULT",
      humanHandoff:
        threadMeta?.humanHandoff ?? fromList?.humanHandoff ?? false,
      preview: threadMeta?.preview || fromList?.preview || "",
      timestamp: threadMeta?.timestamp || fromList?.timestamp || "",
      messageCount: threadMeta?.messageCount || fromList?.messageCount || 0,
      unreadCount: unreadMap[selectedThreadId] || fromList?.unreadCount || 0,
      avatarUrl: threadMeta?.avatarUrl || fromList?.avatarUrl,
    };
  }, [conversations, selectedThreadId, threadMeta, unreadMap]);

  const messages = useMemo(
    () => toWhatsAppMessages(storeMessages),
    [storeMessages],
  );

  const handleSelect = (threadId: string) => {
    setSelectedThreadId(threadId);
    markRead(threadId);
    router.replace(`/client/converation/${threadId}`, { scroll: false });
  };

  const handleBack = () => {
    setSelectedThreadId("");
    router.replace("/client/converation", { scroll: false });
  };

  const handleDeleteConversation = (threadId: string) => {
    const conversation = conversations.find(
      (item) => item.threadId === threadId,
    );
    const label = conversation?.username || threadId;
    const confirmed = window.confirm(
      `Delete chat with ${label}? This cannot be undone.`,
    );
    if (!confirmed) return;

    setDeletingThreadId(threadId);
    deleteConversation.mutate(threadId, {
      onSuccess: () => {
        clearThread(threadId);
        if (selectedThreadId === threadId) {
          setSelectedThreadId("");
          router.replace("/client/converation");
        }
        onDeleteConversation?.(threadId);
      },
      onSettled: () => {
        setDeletingThreadId(null);
      },
    });
  };

  const showChatOnMobile = Boolean(selectedThreadId);
  const deleting = isDeletingConversation || deleteConversation.isPending;

  return (
    <ClientShell
      activeNavId={activeNavId}
      contentClassName="!flex !flex-col !overflow-hidden !p-0"
    >
      <div className="flex h-full min-h-0 w-full overflow-hidden bg-white">
        <div
          className={`${
            showChatOnMobile ? "hidden md:flex" : "flex"
          } h-full w-full md:w-auto`}
        >
          <WhatsAppSidebar
            conversations={filteredConversations}
            activeThreadId={selectedThreadId || undefined}
            search={search}
            onSearchChange={setSearch}
            onSelect={handleSelect}
            onDeleteConversation={handleDeleteConversation}
            isDeletingConversation={deleting}
            deletingThreadId={deletingThreadId}
            isLoading={isListLoading}
          />
        </div>

        <div
          className={`${
            showChatOnMobile ? "flex" : "hidden md:flex"
          } h-full min-w-0 w-full flex-1`}
        >
          {isListError ? (
            <div className="flex flex-1 items-center justify-center bg-[#f0f2f5] px-6 text-center text-sm text-[#667781]">
              Couldn’t load conversations. Please refresh and try again.
            </div>
          ) : (
            <WhatsAppChatPanel
              conversation={selectedThreadId ? activeConversation : undefined}
              messages={messages}
              isLoading={
                Boolean(selectedThreadId) &&
                (isThreadLoading || isThreadFetching) &&
                storeMessages.length === 0
              }
              fullWidth={fullWidth}
              onBack={handleBack}
              onDeleteConversation={handleDeleteConversation}
              onDeleteMessages={onDeleteMessages}
              onSendMessage={onSendMessage}
              onHumanHandoff={onHumanHandoff}
              isDeletingConversation={deleting}
              isDeletingMessage={isDeletingMessage}
              isSendingMessage={isSendingMessage}
              isUpdatingHandoff={isUpdatingHandoff}
            />
          )}
        </div>
      </div>
    </ClientShell>
  );
}
