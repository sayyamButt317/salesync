export type MessageDirection = "incoming" | "outgoing";

export interface WhatsAppConversation {
  threadId: string;
  username: string;
  phone: string;
  mode: string;
  humanHandoff: boolean;
  preview: string;
  timestamp: string;
  messageCount: number;
  unreadCount: number;
  avatarUrl?: string;
}

export interface WhatsAppMessage {
  id: string;
  content: string;
  direction: MessageDirection;
  senderLabel: string;
  timestamp: string;
  dateLabel?: string;
  mode?: string;
  status?: "sent" | "delivered" | "read";
}

export interface ConversationPageProps {
  activeNavId?: string;
  initialThreadId?: string;
  fullWidth?: boolean;
  onDeleteConversation?: (threadId: string) => void;
  onDeleteMessages?: (messageId: string) => void;
  onSendMessage?: (payload: {
    message: string;
    phone_number: string;
    thread_id: string;
  }) => void;
  onHumanHandoff?: (payload: {
    conversation_id: string;
    enabled: boolean;
  }) => void;
  isDeletingConversation?: boolean;
  isDeletingMessage?: boolean;
  isSendingMessage?: boolean;
  isUpdatingHandoff?: boolean;
}
