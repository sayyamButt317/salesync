import type { AiAction } from "@/lib/ai-employees/types";
import { Check } from "lucide-react";

export interface AiActionsListProps {
  actions: AiAction[];
  title?: string;
}

export function AiActionsList({
  actions,
  title = "AI Actions",
}: AiActionsListProps) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-bold tracking-wide text-gray-400 uppercase">
        {title}
      </h4>
      <ul className="space-y-2">
        {actions.map((action) => (
          <li
            key={action.id}
            className="flex items-center gap-2 text-sm text-gray-700"
          >
            <Check
              className={`h-4 w-4 shrink-0 ${
                action.completed ? "text-green-600" : "text-gray-300"
              }`}
            />
            {action.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
