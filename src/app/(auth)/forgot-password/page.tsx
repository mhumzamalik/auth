"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordInput, ForgotPasswordSchema } from "@/lib/validations/auth";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/auth-card";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordInput>({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data: ForgotPasswordInput) => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success(`Instructions sent to ${data.email}`);
      setSuccess(true);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-tr from-background via-muted/30 to-muted/70">
      <AuthCard
        title="Reset Password"
        description={
          success
            ? "Check your email for instructions"
            : "Enter your email to receive a password reset link"
        }
        footer={
          <div className="text-center text-xs text-muted-foreground/80 font-semibold">
            Back to{" "}
            <Link href="/login" className="text-primary font-bold hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        }
      >
        {success ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-semibold border border-emerald-500/20">
              A recovery link has been sent to your email address. Please check your inbox and follow the steps.
            </div>
            <Button
              type="button"
              variant="outline"
              className="w-full cursor-pointer"
              onClick={() => setSuccess(false)}
            >
              Send link again
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

            <Button type="submit" disabled={isPending} className="w-full cursor-pointer">
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Sending link...
                </span>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>
        )}
      </AuthCard>
    </main>
  );
}
