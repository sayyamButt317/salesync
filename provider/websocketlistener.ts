"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { getAuthCookieProvider } from "@/provider/auth-provide";
import { useNotificationSound } from "@/provider/notificationSound";
import { formatPhoneNumber } from "@/lib/client-conversation/utils";
import { UserEndpoint } from "@/routes/client/endpoint";
import { toChatMessage, useChatStore } from "@/store/chatStore";

function buildWsUrl(token: string): string {
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
  const wsPath =
    process.env.NEXT_PUBLIC_WS_NOTIFICATIONS_PATH ||
    UserEndpoint.WS_MESSAGES_NOTIFICATIONS;

  const wsBase = backendUrl
    .replace(/^https:\/\//i, "wss://")
    .replace(/^http:\/\//i, "ws://")
    .replace(/\/$/, "");

  return `${wsBase}${wsPath}?token=${encodeURIComponent(token)}`;
}

function pickPayloadString(
  payload: Record<string, unknown>,
  keys: string[],
): string {
  for (const key of keys) {
    const value = payload[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

function resolveToastContact(
  payload: Record<string, unknown>,
  threadId: string,
) {
  const name =
    pickPayloadString(payload, [
      "username",
      "customer_name",
      "contact_name",
      "name",
      "profile_name",
    ]) || "Unknown contact";

  const rawPhone =
    pickPayloadString(payload, [
      "phone",
      "phone_number",
      "customer_phone",
      "wa_id",
      "mobile",
      "number",
    ]) || (/^\d{8,}$/.test(threadId) ? threadId : "");

  const phone = rawPhone ? formatPhoneNumber(rawPhone) : "";
  const messageText = pickPayloadString(payload, [
    "message",
    "content",
    "text",
    "body",
  ]);

  return { name, phone, messageText };
}

export default function WebSocketListener(): null {
  const router = useRouter();
  const pathname = usePathname();
  const { playSound } = useNotificationSound();

  const addMessage = useChatStore((state) => state.addMessage);
  const setConnectionStatus = useChatStore(
    (state) => state.setConnectionStatus,
  );
  const activeThreadId = useChatStore((state) => state.activeThreadId);

  const toastQueueRef = useRef<Record<string, boolean>>({});
  const socketRef = useRef<WebSocket | null>(null);
  const reconnectTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hasConnectedOnce = useRef(false);
  const pathnameRef = useRef(pathname);
  const activeThreadRef = useRef(activeThreadId);

  useEffect(() => {
    pathnameRef.current = pathname;
  }, [pathname]);

  useEffect(() => {
    activeThreadRef.current = activeThreadId;
  }, [activeThreadId]);

  useEffect(() => {
    const token = getAuthCookieProvider();
    if (!token) return;

    let disposed = false;
    let attempt = 0;

    const clearReconnect = () => {
      if (reconnectTimerRef.current) {
        clearTimeout(reconnectTimerRef.current);
        reconnectTimerRef.current = null;
      }
    };

    const connect = () => {
      if (disposed) return;

      setConnectionStatus("connecting");
      const socket = new WebSocket(buildWsUrl(token));
      socketRef.current = socket;

      socket.onopen = () => {
        attempt = 0;
        setConnectionStatus("connected");
        if (!hasConnectedOnce.current) {
          toast.success("Live updates connected", {
            description: "You’ll get alerts for new WhatsApp messages",
          });
          hasConnectedOnce.current = true;
        }
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as {
            type?: string;
            payload?: Record<string, unknown>;
          };
          const type = data.type;
          const payload = data.payload ?? {};

          switch (type) {
            case "whatsapp.message": {
              const sender = String(payload.sender || "").toUpperCase();
              if (sender === "ADMIN" || sender === "HUMAN") return;

              const message = toChatMessage({
                id: payload.id as string | undefined,
                _id: payload._id as string | undefined,
                message_id: payload.message_id as string | undefined,
                thread_id: payload.thread_id as string | undefined,
                sender: payload.sender as string | undefined,
                username: payload.username as string | undefined,
                message: payload.message as string | undefined,
                content: payload.content as string | undefined,
                timestamp: payload.timestamp as string | undefined,
                conversation_mode: payload.conversation_mode as
                  | string
                  | undefined,
              });

              if (!message.threadId || !message.content) return;

              addMessage(message.threadId, message);

              const isViewingThread =
                activeThreadRef.current === message.threadId ||
                Boolean(
                  pathnameRef.current?.includes(
                    `/client/converation/${message.threadId}`,
                  ),
                );

              if (isViewingThread) return;

              playSound();

              if (!toastQueueRef.current[message.id]) {
                toastQueueRef.current[message.id] = true;

                const { name, phone, messageText } = resolveToastContact(
                  payload,
                  message.threadId,
                );
                const displayMessage = (messageText || message.content).slice(
                  0,
                  100,
                );

                const description = [
                  phone ? `Number: ${phone}` : "",
                  `Message: ${displayMessage}`,
                ]
                  .filter(Boolean)
                  .join(" · ");

                toast.message(name, {
                  description,
                  duration: 6000,
                  action: {
                    label: "View",
                    onClick: () => {
                      router.push(`/client/converation/${message.threadId}`);
                    },
                  },
                });

                setTimeout(() => {
                  delete toastQueueRef.current[message.id];
                }, 7000);
              }
              break;
            }

            case "notification": {
              toast(String(payload.title || "Notification"), {
                description: String(
                  payload.message || payload.description || "",
                ),
              });
              break;
            }

            default:
              break;
          }
        } catch (error) {
          console.error("SaleSync websocket parse error", error);
        }
      };

      socket.onerror = () => {
        setConnectionStatus("disconnected");
      };

      socket.onclose = () => {
        setConnectionStatus("disconnected");
        socketRef.current = null;
        if (disposed) return;

        const delay = Math.min(1000 * 2 ** attempt, 15000);
        attempt += 1;
        clearReconnect();
        reconnectTimerRef.current = setTimeout(connect, delay);
      };
    };

    connect();

    return () => {
      disposed = true;
      clearReconnect();
      socketRef.current?.close();
      socketRef.current = null;
      setConnectionStatus("idle");
    };
  }, [addMessage, playSound, router, setConnectionStatus]);

  return null;
}
