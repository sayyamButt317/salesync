"use client";

import { motion } from "framer-motion";
import type { SocialAuthProvider } from "@/lib/auth/types";
import { SocialProviderIcon } from "./social-icons";

export interface SocialLoginButtonProps {
  provider: SocialAuthProvider;
  onClick?: (providerId: string) => void;
}

export function SocialLoginButton({
  provider,
  onClick,
}: SocialLoginButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => onClick?.(provider.id)}
      className="flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-gray-300 hover:bg-gray-50"
    >
      <SocialProviderIcon provider={provider.icon} />
      {provider.label}
    </motion.button>
  );
}
