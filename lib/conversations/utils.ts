import type { ConversationListTab, ConversationThread } from "./types";

export function filterConversations(
  threads: ConversationThread[],
  tab: ConversationListTab,
  search: string,
): ConversationThread[] {
  const query = search.toLowerCase().trim();

  return threads.filter((thread) => {
    const { preview } = thread;

    let matchesTab = true;
    if (tab === "unread") {
      matchesTab = (preview.unreadCount ?? 0) > 0;
    } else if (tab === "mentions") {
      matchesTab = preview.isMention === true;
    } else if (tab === "archived") {
      matchesTab = preview.isArchived === true;
    } else {
      matchesTab = !preview.isArchived;
    }

    const matchesSearch =
      !query ||
      preview.contactName.toLowerCase().includes(query) ||
      preview.preview.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
}
