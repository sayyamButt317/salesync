"use client";

import { use } from "react";
import { ConversationPage } from "@/components/client/conversation";
import {
  useAestheticAgentMutation,
  useAgentHandoffMutation,
  useDeleteMessagesMutation,
} from "@/routes/client/mutation";

interface ClientConversationThreadPageProps {
  params: Promise<{ id: string }>;
}

export default function ClientConversationThreadPage({
  params,
}: ClientConversationThreadPageProps) {
  const { id } = use(params);
  const deleteMessages = useDeleteMessagesMutation();
  const aestheticAgent = useAestheticAgentMutation();
  const agentHandoff = useAgentHandoffMutation();

  return (
    <ConversationPage
      activeNavId="conversations"
      initialThreadId={id}
      fullWidth
      onDeleteMessages={(messageId) => deleteMessages.mutate(messageId)}
      isDeletingMessage={deleteMessages.isPending}
      onSendMessage={(payload) => aestheticAgent.mutate(payload)}
      isSendingMessage={aestheticAgent.isPending}
      onHumanHandoff={(payload) => agentHandoff.mutate(payload)}
      isUpdatingHandoff={agentHandoff.isPending}
    />
  );
}
