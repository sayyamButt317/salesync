import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
    AestheticAgent,
  AgentHandoff,
  DeleteConversationMutationApi,
  DeleteMessagesMutationApi,
} from "./routes";
import { toast } from "sonner";
import { AestheticTypeRequest, AgenticMessageTypeRequest } from "@/types/aestheticType";

export function useDeleteConversationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteConversation"],
    mutationFn: (thread_id: string) => DeleteConversationMutationApi(thread_id),
    onSuccess: (_data, thread_id) => {
      toast.success("Chat deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["conversationList"] });
      queryClient.removeQueries({
        queryKey: ["conversationByThreadId", thread_id],
      });
    },
    onError: () => {
      toast.error("Failed to delete conversation");
    },
  });
}

export function useDeleteMessagesMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteMessages"],
    mutationFn: (message_id: string) => DeleteMessagesMutationApi(message_id),
    onSuccess: () => {
      toast.success("Message deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["conversationList"] });
      queryClient.invalidateQueries({ queryKey: ["conversationByThreadId"] });
    },
    onError: () => {
      toast.error("Failed to delete message");
    },
  });
}

export default function DeleteConversationMutation() {
  return useDeleteConversationMutation();
}

export function DeleteMessagesMutation() {
  return useDeleteMessagesMutation();
}

export function useAestheticAgentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["aestheticAgent"],
    mutationFn: (request: AgenticMessageTypeRequest) => AestheticAgent(request),
    onSuccess: (_data, request) => {
      toast.success("Message sent");
      queryClient.invalidateQueries({
        queryKey: ["conversationByThreadId", request.thread_id],
      });
      queryClient.invalidateQueries({ queryKey: ["conversationList"] });
    },
    onError: () => {
      toast.error("Failed to send message");
    },
  });
}


export function useAgentHandoffMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["agentHandoff"],
    mutationFn: ({
      conversation_id,
      enabled,
    }: {
      conversation_id: string;
      enabled: boolean;
    }) => AgentHandoff(conversation_id, enabled),
    onSuccess: (_data, { enabled }) => {
      toast.success(
        enabled ? "Human handoff enabled" : "AI agent resumed",
      );
      queryClient.invalidateQueries({ queryKey: ["conversationList"] });
      queryClient.invalidateQueries({ queryKey: ["conversationByThreadId"] });
    },
    onError: () => {
      toast.error("Failed to update human handoff");
    },
  });
}