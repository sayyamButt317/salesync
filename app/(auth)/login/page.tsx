import Link from "next/link";
import type { LoginPageProps } from "@/lib/auth/types";
import { AuthSplitLayout } from "@/components/auth/auth-split-layout";
import { LoginForm } from "@/components/auth/login-form";
import { LoginMarketingPanel } from "@/components/auth/login-marketing-panel";

export default function LoginPage({
  signupHref = "/signup",
  forgotPasswordHref = "#",
  termsHref = "#",
  privacyHref = "#",
}: LoginPageProps) {
  return (
    <AuthSplitLayout
      marketing={<LoginMarketingPanel />}
      form={
        <LoginForm
          signupHref={signupHref}
          forgotPasswordHref={forgotPasswordHref}
        />
      }
      footer={
        <p className="text-xs text-gray-400">
          By continuing, you agree to our{" "}
          <Link
            href={termsHref}
            className="font-medium text-violet-600 hover:text-violet-700"
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href={privacyHref}
            className="font-medium text-violet-600 hover:text-violet-700"
          >
            Privacy Policy
          </Link>
          .
        </p>
      }
    />
  );
}
