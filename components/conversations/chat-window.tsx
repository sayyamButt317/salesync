"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatePresence } from "framer-motion";
import type { ChatInputMode, ConversationThread } from "@/lib/conversations/types";
import { ChatHeader, MessageInput } from "./chat-composer";
import { DateSeparator, MessageBubble } from "./message-bubble";

export interface ChatWindowProps {
  thread: ConversationThread;
  inputMode: ChatInputMode;
  messageDraft: string;
  onInputModeChange: (mode: ChatInputMode) => void;
  onMessageDraftChange: (value: string) => void;
}

export function ChatWindow({
  thread,
  inputMode,
  messageDraft,
  onInputModeChange,
  onMessageDraftChange,
}: ChatWindowProps) {
  const feedRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const feed = feedRef.current;
    if (!feed) return;

    const messages = feed.querySelectorAll("[data-message]");
    if (!messages.length) return;

    const tween = gsap.fromTo(
      messages,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        stagger: 0.08,
        ease: "power3.out",
        delay: 0.1,
      },
    );

    return () => {
      tween.kill();
    };
  }, [thread.id]);

  return (
    <div className="flex min-w-0 flex-1 flex-col bg-[#fafbfc]">
      <ChatHeader contact={thread.contact} />

      <div ref={feedRef} className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
        <AnimatePresence mode="wait">
          <div key={thread.id} className="space-y-3">
            {thread.messages.map((message) => (
              <div key={message.id}>
                {message.dateLabel ? (
                  <DateSeparator label={message.dateLabel} />
                ) : null}
                <MessageBubble message={message} />
              </div>
            ))}
          </div>
        </AnimatePresence>
      </div>

      <MessageInput
        mode={inputMode}
        onModeChange={onInputModeChange}
        value={messageDraft}
        onChange={onMessageDraftChange}
      />
    </div>
  );
}
