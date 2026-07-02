"use client";

import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button, Checkbox, IconInput } from "@/components/ui";
import { FieldLabel } from "@/components/ui/field-label";
import { LOGIN_DEFAULTS, SOCIAL_AUTH_PROVIDERS } from "@/lib/auth/data";
import type { LoginFormData, LoginFormProps } from "@/lib/auth/types";
import { scaleIn } from "@/lib/motion/variants";
import { SocialLoginButton } from "./social-login-button";

export function LoginForm({
  onSubmit,
  signupHref = "/signup",
  forgotPasswordHref = "#",
}: LoginFormProps) {
  const [form, setForm] = useState<LoginFormData>(LOGIN_DEFAULTS);
  const [showPassword, setShowPassword] = useState(false);

  const update = (patch: Partial<LoginFormData>) => {
    setForm((prev) => ({ ...prev, ...patch }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit?.(form);
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full max-w-md"
    >
      <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm shadow-gray-200/50">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome back 👋
          </h2>
          <p className="mt-1.5 text-sm text-gray-500">
            Log in to your Salesync account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <FieldLabel htmlFor="email">Email Address</FieldLabel>
            <IconInput
              id="email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={form.email}
              onChange={(event) => update({ email: event.target.value })}
              leftIcon={<Mail className="h-4 w-4" />}
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <FieldLabel htmlFor="password" className="mb-0">
                Password
              </FieldLabel>
              <Link
                href={forgotPasswordHref}
                className="text-xs font-semibold text-violet-600 hover:text-violet-700"
              >
                Forgot?
              </Link>
            </div>
            <IconInput
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              autoComplete="current-password"
              value={form.password}
              onChange={(event) => update({ password: event.target.value })}
              leftIcon={<Lock className="h-4 w-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="cursor-pointer text-gray-400 transition-colors hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              }
            />
          </div>

          <Checkbox
            id="remember"
            checked={form.rememberMe}
            onChange={(rememberMe) => update({ rememberMe })}
            label="Remember me"
          />

          <Button type="submit" className="w-full py-2.5">
            Log in
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-white px-3 font-medium text-gray-400">OR</span>
          </div>
        </div>

        <div className="space-y-3">
          {SOCIAL_AUTH_PROVIDERS.map((provider) => (
            <SocialLoginButton key={provider.id} provider={provider} />
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            href={signupHref}
            className="font-semibold text-violet-600 hover:text-violet-700"
          >
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
