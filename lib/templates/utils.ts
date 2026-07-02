import type { TemplateRecord, TemplateSort, TemplateTab } from "./types";

export function filterTemplates(
  records: TemplateRecord[],
  tab: TemplateTab,
  search: string,
): TemplateRecord[] {
  const query = search.toLowerCase().trim();

  return records.filter((record) => {
    const matchesTab = tab === "all" || record.type === tab;

    const matchesSearch =
      !query ||
      record.title.toLowerCase().includes(query) ||
      record.description.toLowerCase().includes(query) ||
      record.tags.some((tag) => tag.toLowerCase().includes(query));

    return matchesTab && matchesSearch;
  });
}

export function sortTemplates(
  records: TemplateRecord[],
  sort: TemplateSort,
): TemplateRecord[] {
  const sorted = [...records];

  switch (sort) {
    case "oldest":
      return sorted.reverse();
    case "name":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "newest":
    default:
      return sorted;
  }
}
