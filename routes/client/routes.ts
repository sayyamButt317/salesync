import { UserEndpoint } from "./endpoint";
import axios from 'axios';
import { getAuthCookieProvider } from '@/provider/auth-provide';
import { AgenticMessageTypeRequest } from "@/types/aestheticType";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthCookieProvider();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export async function ConversationList() {
    const response = await api.get(UserEndpoint.CONVERSATIONS);
    return response.data;
}

export async function ConversationByThreadId(thread_id: string) {
    const response = await api.get(UserEndpoint.CONVERSATIONS_BY_THREAD_ID(thread_id));
    return response.data;
}

export async function DeleteConversationMutationApi(thread_id: string) {
    const response = await api.delete(UserEndpoint.DELETE_CONVERSATION(thread_id));
    return response.data;
}

export async function DeleteMessagesMutationApi(message_id: string) {
    const response = await api.delete(UserEndpoint.DELETEMESSAGES_BY_MESSAGE_ID(message_id));
    return response.data;
}

export async function AestheticAgent(request: AgenticMessageTypeRequest) {
    const response = await api.post(UserEndpoint.AGENT.SKINCLINIC_AGENT, request);
    return response.data;
}

export async function AgentHandoff(
  conversation_id: string,
  enabled: boolean,
) {
  const response = await api.post(UserEndpoint.AGENT_HANDOFF(conversation_id), {
    human_takeover: enabled,
  });
  return response.data;
}

export async function GoogleReviewAgent(request: AgenticMessageTypeRequest) {
    const response = await api.post(UserEndpoint.AGENT.GOOGLEREVIEW_AGENT, request);
    return response.data;
}

export async function RealestateAgent(request: AgenticMessageTypeRequest) {
    const response = await api.post(UserEndpoint.AGENT.REALESTATE_AGENT, request);
    return response.data;
}

export async function CompanyBookingByIdApi(company_id: string) {
    const response = await api.get(UserEndpoint.COMPANY_BOOKING_BY_ID(company_id));
    return response.data;
}