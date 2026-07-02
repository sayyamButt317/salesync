import { Avatar } from "./avatar";

export interface AvatarStackItem {
  id: string;
  initials: string;
  color: string;
}

export interface AvatarStackProps {
  items: AvatarStackItem[];
  max?: number;
  extra?: number;
  size?: "sm" | "md" | "lg";
}

export function AvatarStack({
  items,
  max = 3,
  extra,
  size = "sm",
}: AvatarStackProps) {
  const visible = items.slice(0, max);
  const hidden = extra ?? Math.max(0, items.length - max);

  return (
    <div className="flex items-center -space-x-2">
      {visible.map((item) => (
        <Avatar
          key={item.id}
          initials={item.initials}
          color={item.color}
          size={size}
          className="ring-2 ring-white"
        />
      ))}
      {hidden > 0 ? (
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-600 ring-2 ring-white">
          +{hidden}
        </span>
      ) : null}
    </div>
  );
}
