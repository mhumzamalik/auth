"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginInput, LoginSchema } from "@/lib/validations/auth";
import { loginAction } from "@/actions/login";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./password-input";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginInput) => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await loginAction(data);
        if (result?.error) {
          setError(result.error);
          toast.error(result.error);
        } else {
          toast.success("Successfully logged in!");
          router.push(callbackUrl);
          router.refresh();
        }
      } catch (err) {
        console.error("Login client catch:", err);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="p-3 rounded-lg bg-destructive/15 text-destructive text-sm font-semibold border border-destructive/20">
          {error}
        </div>
      )}

      <div className="space-y-1.5">
        <Label htmlFor="email">Email address</Label>
        <Input
          id="email"
          type="email"
          placeholder="name@example.com"
          disabled={isPending}
          {...register("email")}
          className={errors.email ? "border-destructive focus:ring-destructive" : ""}
        />
        {errors.email && (
          <p className="text-xs text-destructive font-semibold">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="/forgot-password"
            className="text-xs text-primary font-semibold hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <PasswordInput
          id="password"
          placeholder="••••••••"
          disabled={isPending}
          {...register("password")}
          className={errors.password ? "border-destructive focus:ring-destructive" : ""}
        />
        {errors.password && (
          <p className="text-xs text-destructive font-semibold">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2 py-1">
        <input
          type="checkbox"
          id="rememberMe"
          disabled={isPending}
          {...register("rememberMe")}
          className="h-4 w-4 rounded border-input text-primary focus:ring-ring bg-background/50 accent-primary cursor-pointer"
        />
        <Label htmlFor="rememberMe" className="text-xs text-muted-foreground/90 font-medium cursor-pointer select-none">
          Remember me for 30 days
        </Label>
      </div>

      <Button type="submit" disabled={isPending} className="w-full cursor-pointer">
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Signing in...
          </span>
        ) : (
          "Sign In with Email"
        )}
      </Button>
    </form>
  );
}
