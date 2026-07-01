import type { LucideIcon } from "lucide-react";
import {
  Car,
  Cloud,
  Cpu,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Plane,
  ShoppingBag,
  Sparkles,
  UtensilsCrossed,
} from "lucide-react";

export interface NicheOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

export const POPULAR_NICHES: NicheOption[] = [
  { id: "real-estate", label: "Real Estate", icon: Home },
  { id: "ecommerce", label: "E-commerce", icon: ShoppingBag },
  { id: "saas", label: "SaaS", icon: Cloud },
  { id: "healthcare", label: "Healthcare", icon: HeartPulse },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "finance", label: "Finance", icon: Landmark },
  { id: "travel", label: "Travel", icon: Plane },
  { id: "automotive", label: "Automotive", icon: Car },
  { id: "beauty-fashion", label: "Beauty & Fashion", icon: Sparkles },
  { id: "fitness", label: "Fitness", icon: Dumbbell },
  { id: "food-restaurant", label: "Food & Restaurant", icon: UtensilsCrossed },
  { id: "technology", label: "Technology", icon: Cpu },
];
