"use client";

export interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  itemLabel?: string;
}

export function Pagination({
  page,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  onPageSizeChange,
  itemLabel = "items",
}: PaginationProps) {
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  const pages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
    if (totalPages <= 5) return index + 1;
    if (page <= 3) return index + 1;
    if (page >= totalPages - 2) return totalPages - 4 + index;
    return page - 2 + index;
  });

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-5 py-4">
      <p className="text-xs text-gray-500">
        Showing {start} to {end} of {totalItems} {itemLabel}
      </p>

      <div className="flex flex-wrap items-center gap-3">
        {onPageSizeChange ? (
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(Number(event.target.value))}
            className="cursor-pointer rounded-lg border border-gray-200 bg-white px-2.5 py-1.5 text-xs text-gray-600 outline-none"
          >
            {[8, 10, 12, 25].map((size) => (
              <option key={size} value={size}>
                {size} rows
              </option>
            ))}
          </select>
        ) : null}

        <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
            className="cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Prev
          </button>
          {pages.map((pageNum) => (
            <button
              key={pageNum}
              type="button"
              onClick={() => onPageChange(pageNum)}
              className={`cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold transition-colors ${
                pageNum === page
                  ? "bg-violet-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              {pageNum}
            </button>
          ))}
          {totalPages > 5 && page < totalPages - 2 ? (
            <>
              <span className="px-1 text-xs text-gray-400">...</span>
              <button
                type="button"
                onClick={() => onPageChange(totalPages)}
                className="cursor-pointer rounded-lg px-2.5 py-1 text-xs font-semibold text-gray-600 hover:bg-gray-100"
              >
                {totalPages}
              </button>
            </>
          ) : null}
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => onPageChange(page + 1)}
            className="cursor-pointer rounded-lg px-2.5 py-1 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
