import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface AppNotification {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  read: boolean;
  href?: string;
}

interface NotificationState {
  items: AppNotification[];
  addNotification: (
    notification: Omit<AppNotification, "id" | "createdAt" | "read"> & {
      id?: string;
    },
  ) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clear: () => void;
  unreadCount: () => number;
}

export const useNotificationStore = create<NotificationState>()(
  devtools(
    (set, get) => ({
      items: [],

      addNotification: (notification) =>
        set(
          (state) => ({
            items: [
              {
                id: notification.id || crypto.randomUUID(),
                title: notification.title,
                description: notification.description,
                href: notification.href,
                createdAt: new Date().toISOString(),
                read: false,
              },
              ...state.items,
            ].slice(0, 50),
          }),
          false,
          "notifications/add",
        ),

      markRead: (id) =>
        set(
          (state) => ({
            items: state.items.map((item) =>
              item.id === id ? { ...item, read: true } : item,
            ),
          }),
          false,
          "notifications/markRead",
        ),

      markAllRead: () =>
        set(
          (state) => ({
            items: state.items.map((item) => ({ ...item, read: true })),
          }),
          false,
          "notifications/markAllRead",
        ),

      clear: () => set({ items: [] }, false, "notifications/clear"),

      unreadCount: () => get().items.filter((item) => !item.read).length,
    }),
    { name: "SaleSyncNotificationStore" },
  ),
);
