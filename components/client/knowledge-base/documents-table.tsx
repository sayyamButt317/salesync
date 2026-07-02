"use client";

import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import {
  AvatarStack,
  Card,
  DocStatusBadge,
  Pagination,
  Tabs,
} from "@/components/ui";
import { TYPE_COLORS, TYPE_ICONS } from "@/lib/knowledge-base/data";
import type {
  KbDocument,
  KbSort,
  KbTab,
} from "@/lib/knowledge-base/types";
import { KB_TAB_LABELS } from "@/lib/knowledge-base/types";
import { staggerContainer, tableRow } from "@/lib/motion/variants";
import { DocumentsToolbar } from "./documents-toolbar";

const TABLE_TABS = (Object.keys(KB_TAB_LABELS) as KbTab[]).map((id) => ({
  id,
  label: KB_TAB_LABELS[id].label,
}));

export interface DocumentsTableProps {
  documents: KbDocument[];
  tab: KbTab;
  tableSearch: string;
  sort: KbSort;
  page: number;
  pageSize: number;
  totalItems: number;
  onTabChange: (tab: KbTab) => void;
  onTableSearchChange: (search: string) => void;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

export function DocumentsTable({
  documents,
  tab,
  tableSearch,
  sort,
  page,
  pageSize,
  totalItems,
  onTabChange,
  onTableSearchChange,
  onPageChange,
  onPageSizeChange,
}: DocumentsTableProps) {
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const allSelected =
    documents.length > 0 && documents.every((doc) => selected.has(doc.id));

  const toggleAll = () => {
    setSelected((prev) => {
      if (documents.every((doc) => prev.has(doc.id))) {
        const next = new Set(prev);
        documents.forEach((doc) => next.delete(doc.id));
        return next;
      }
      return new Set([...prev, ...documents.map((doc) => doc.id)]);
    });
  };

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="px-5 pt-2">
        <Tabs
          tabs={TABLE_TABS}
          value={tab}
          onChange={onTabChange}
          layoutId="kb-tab"
        />
      </div>

      <DocumentsToolbar
        search={tableSearch}
        onSearchChange={onTableSearchChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-gray-50 bg-gray-50/50 text-[10px] font-semibold tracking-wider text-gray-400 uppercase">
              <th className="w-10 px-5 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-violet-600"
                  aria-label="Select all"
                />
              </th>
              <th className="px-3 py-3">Document</th>
              <th className="px-3 py-3">Type</th>
              <th className="px-3 py-3">Uploaded By</th>
              <th className="px-3 py-3">Agents</th>
              <th className="px-3 py-3">Chunks</th>
              <th className="px-3 py-3">Status</th>
              <th className="px-3 py-3">Last Updated</th>
              <th className="px-3 py-3" />
            </tr>
          </thead>
          <motion.tbody
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            key={`${tab}-${page}-${sort}-${tableSearch}`}
          >
            {documents.map((doc) => {
              const TypeIcon = TYPE_ICONS[doc.type];
              const typeColor = TYPE_COLORS[doc.type];
              const isChecked = selected.has(doc.id);

              return (
                <motion.tr
                  key={doc.id}
                  variants={tableRow}
                  className={`border-b border-gray-50 last:border-b-0 ${
                    isChecked ? "bg-violet-50/40" : ""
                  }`}
                  whileHover={{ backgroundColor: "rgba(249,250,251,0.9)" }}
                >
                  <td className="px-5 py-3.5">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleOne(doc.id)}
                      className="h-3.5 w-3.5 cursor-pointer rounded border-gray-300 accent-violet-600"
                      aria-label={`Select ${doc.name}`}
                    />
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                        style={{ backgroundColor: `${typeColor}1a` }}
                      >
                        <TypeIcon
                          className="h-4 w-4"
                          style={{ color: typeColor }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {doc.name}
                        </p>
                        <div className="mt-0.5 flex flex-wrap gap-1">
                          {doc.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-md bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <p className="text-xs font-semibold text-gray-700">
                      {doc.type}
                    </p>
                    <p className="text-[11px] text-gray-400">{doc.size}</p>
                  </td>
                  <td className="px-3 py-3.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
                        style={{ backgroundColor: doc.uploadedByColor }}
                      >
                        {doc.uploadedByInitials}
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-800">
                          {doc.uploadedByName}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {doc.uploadedDate}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-3.5">
                    <AvatarStack items={doc.agents} extra={doc.extraAgents} />
                  </td>
                  <td className="px-3 py-3.5 text-xs font-medium text-gray-700">
                    {doc.chunks.toLocaleString()}
                  </td>
                  <td className="px-3 py-3.5">
                    <DocStatusBadge status={doc.status} />
                  </td>
                  <td className="px-3 py-3.5">
                    <p className="text-xs text-gray-700">
                      {doc.lastUpdatedDate}
                    </p>
                    <p className="text-[10px] text-gray-400">
                      {doc.lastUpdatedTime}
                    </p>
                  </td>
                  <td className="px-3 py-3.5">
                    <button
                      type="button"
                      className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100"
                      aria-label="Actions"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </motion.tr>
              );
            })}
          </motion.tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        totalItems={totalItems}
        pageSize={pageSize}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        itemLabel="documents"
      />
    </Card>
  );
}
