"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterInput, RegisterSchema } from "@/lib/validations/auth";
import { registerAction } from "@/actions/register";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { PasswordInput } from "./password-input";
import { PasswordStrength } from "./password-strength";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password field to compute strength checklist in real-time
  const passwordValue = watch("password", "");

  const onSubmit = (data: RegisterInput) => {
    setError(null);
    startTransition(async () => {
      try {
        const result = await registerAction(data);
        if (result?.error) {
          setError(result.error);
          toast.error(result.error);
        } else {
          toast.success("Account created successfully!");
          router.push("/dashboard");
          router.refresh();
        }
      } catch (err) {
        console.error("Signup client catch:", err);
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
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          type="text"
          placeholder="Muhammad Hamza"
          disabled={isPending}
          {...register("name")}
          className={errors.name ? "border-destructive focus:ring-destructive" : ""}
        />
        {errors.name && (
          <p className="text-xs text-destructive font-semibold">{errors.name.message}</p>
        )}
      </div>

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
        <Label htmlFor="password">Password</Label>
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
        <PasswordStrength value={passwordValue} />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput
          id="confirmPassword"
          placeholder="••••••••"
          disabled={isPending}
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-destructive focus:ring-destructive" : ""}
        />
        {errors.confirmPassword && (
          <p className="text-xs text-destructive font-semibold">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" disabled={isPending} className="w-full cursor-pointer mt-2">
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            Creating account...
          </span>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}
