import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

export interface IconButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children: ReactNode;
  badge?: number;
}

export function IconButton({
  children,
  badge,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type={type}
      className={`relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 ${className}`}
      {...props}
    >
      {children}
      {badge !== undefined && badge > 0 ? (
        <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
          {badge}
        </span>
      ) : null}
    </motion.button>
  );
}
