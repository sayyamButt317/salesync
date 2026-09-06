"use client";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Button, Checkbox, IconInput } from "@/components/ui";
import { FieldLabel } from "@/components/ui/field-label";
import { SOCIAL_AUTH_PROVIDERS } from "@/lib/auth/data";
import type { LoginFormProps } from "@/lib/auth/types";
import { scaleIn } from "@/lib/motion/variants";
import { SocialLoginButton } from "./social-login-button";
import LoginMutation from "@/routes/auth/mutation";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { zodResolver } from '@hookform/resolvers/zod';
import { LoginFormSchema, LoginFormValidator } from "@/validators/login-validator";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";

export function LoginForm({
  signupHref = "/signup",
  forgotPasswordHref = "#",
}: LoginFormProps) {

  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<LoginFormValidator>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: loginMutation, isPending } = LoginMutation();
  const formRef = useRef<HTMLFormElement>(null);

  const onSubmit = async (data: LoginFormValidator) => {
    await loginMutation({
      email: data.email,
      password: data.password,
    });
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


        {/* Form */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="space-y-5"
          >
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="name@company.com"
                      className="h-12 bg-white/5 border-white/10 text-black placeholder:text-slate-500 focus:ring-2 focus:ring-primarytext focus:border-transparent rounded-xl"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        className="h-12 bg-white/5 border-white/10 text-black placeholder:text-slate-500 focus:ring-2 focus:ring-primarytext focus:border-transparent rounded-xl pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-400" />
                </FormItem>
              )}
            />
            {/* 
          <Checkbox
            id="remember"
            checked={form.rememberMe}
            onChange={(rememberMe) => update({ rememberMe })}
            label="Remember me"
          /> */}

            <Button type="submit" className="w-full py-2.5">
              Log in
              {isPending && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
            </Button>
          </form>
        </Form>

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
