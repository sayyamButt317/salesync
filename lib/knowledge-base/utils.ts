import type { KbDocument, KbSort, KbTab } from "./types";

function parseSize(size: string): number {
  const [rawValue, unit] = size.split(" ");
  const value = parseFloat(rawValue);
  const multiplier =
    unit === "GB" ? 1_000_000 : unit === "MB" ? 1_000 : unit === "KB" ? 1 : 0;
  return value * multiplier;
}

export function filterDocuments(
  documents: KbDocument[],
  tab: KbTab,
  search: string,
): KbDocument[] {
  const query = search.toLowerCase().trim();

  return documents.filter((doc) => {
    const matchesTab =
      tab === "all" ||
      tab === "shared" ||
      (tab === "uploaded-by-me" && doc.uploadedByYou);

    const matchesSearch =
      !query ||
      doc.name.toLowerCase().includes(query) ||
      doc.tags.some((tag) => tag.toLowerCase().includes(query)) ||
      doc.uploadedByName.toLowerCase().includes(query);

    return matchesTab && matchesSearch;
  });
}

export function sortDocuments(
  documents: KbDocument[],
  sort: KbSort,
): KbDocument[] {
  const sorted = [...documents];

  switch (sort) {
    case "oldest":
      return sorted.reverse();
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "size":
      return sorted.sort((a, b) => parseSize(b.size) - parseSize(a.size));
    case "recent":
    default:
      return sorted;
  }
}
