import type { LucideIcon } from "lucide-react";

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthFeature {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface SocialAuthProvider {
  id: string;
  label: string;
  icon: "google" | "microsoft";
}

export interface LoginPageProps {
  signupHref?: string;
  forgotPasswordHref?: string;
  termsHref?: string;
  privacyHref?: string;
}

export interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
  signupHref?: string;
  forgotPasswordHref?: string;
}
