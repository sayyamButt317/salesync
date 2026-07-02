"use client";

import { MoreVertical, Star } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar } from "@/components/ui";
import { TEMPLATE_TYPE_THEME } from "@/lib/templates/data";
import type { TemplateRecord } from "@/lib/templates/types";

export interface TemplateCardProps {
  template: TemplateRecord;
  onToggleFavorite?: (id: string) => void;
}

export function TemplateCard({ template, onToggleFavorite }: TemplateCardProps) {
  const theme = TEMPLATE_TYPE_THEME[template.type];
  const TypeIcon = theme.icon;

  return (
    <motion.article
      data-stagger-card
      whileHover={{ y: -4, boxShadow: "0 12px 28px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg"
            style={{ backgroundColor: theme.iconBg }}
          >
            <TypeIcon className="h-4 w-4" style={{ color: theme.iconColor }} />
          </div>
          <span
            className="text-[10px] font-bold tracking-wider"
            style={{ color: theme.labelColor }}
          >
            {theme.label}
          </span>
        </div>

        <button
          type="button"
          onClick={() => onToggleFavorite?.(template.id)}
          className="cursor-pointer rounded-lg p-1 text-gray-300 transition-colors hover:text-amber-400"
          aria-label={template.isFavorite ? "Remove from favorites" : "Add to favorites"}
        >
          <Star
            className={`h-4 w-4 ${template.isFavorite ? "fill-amber-400 text-amber-400" : ""}`}
          />
        </button>
      </div>

      <h3 className="mt-4 text-sm font-bold text-gray-900">{template.title}</h3>
      <p className="mt-1.5 line-clamp-3 flex-1 text-xs leading-relaxed text-gray-500">
        {template.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {template.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md px-2 py-0.5 text-[10px] font-semibold"
            style={{ backgroundColor: theme.tagBg, color: theme.tagText }}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
        <span className="text-[11px] text-gray-400">
          Updated {template.updatedAt}
        </span>
        <div className="flex items-center gap-2">
          <Avatar initials={template.authorInitials} size="sm" />
          <button
            type="button"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
            aria-label="More actions"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
