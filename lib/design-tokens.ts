export const colors = {
  primary: "#7c3aed",
  primaryLight: "#ede9fe",
  primaryHover: "#6d28d9",
  background: "#f8f9fb",
  surface: "#ffffff",
  border: "#e8ecf1",
  borderLight: "#f0f2f5",
  textPrimary: "#1a1d26",
  textSecondary: "#6b7280",
  textMuted: "#9ca3af",
  link: "#2563eb",
  infoBanner: "#f5f3ff",
  infoBannerBorder: "#e9e3ff",
  stat: {
    total: { bg: "#ede9fe", icon: "#7c3aed" },
    pitched: { bg: "#dbeafe", icon: "#3b82f6" },
    replied: { bg: "#ffedd5", icon: "#f97316" },
    closed: { bg: "#dcfce7", icon: "#22c55e" },
  },
} as const;

export const sidebar = {
  width: 240,
} as const;
