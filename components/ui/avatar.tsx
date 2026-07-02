export interface AvatarProps {
  initials: string;
  size?: "sm" | "md" | "lg";
  color?: string;
  className?: string;
}

const sizeStyles = {
  sm: "h-8 w-8 text-[10px]",
  md: "h-9 w-9 text-xs",
  lg: "h-10 w-10 text-sm",
};

export function Avatar({
  initials,
  size = "md",
  color = "#7c3aed",
  className = "",
}: AvatarProps) {
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-bold text-white ${sizeStyles[size]} ${className}`}
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}
