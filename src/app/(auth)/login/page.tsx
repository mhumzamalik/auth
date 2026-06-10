import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";
import { SocialLogin } from "@/components/auth/social-login";
import Link from "next/link";
import { Suspense } from "react";

export const metadata = {
  title: "Sign In - Secure Auth",
  description: "Log in to your account using secure email and password or third-party OAuth providers.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-tr from-background via-muted/30 to-muted/70">
      <Suspense fallback={
        <div className="w-full max-w-md h-[450px] bg-card/50 rounded-xl border border-border animate-pulse" />
      }>
        <AuthCard
          title="Welcome Back"
          description="Enter your credentials to access your account"
          footer={
            <div className="text-center text-xs text-muted-foreground/80 font-semibold">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-primary font-bold hover:underline transition-colors">
                Create account
              </Link>
            </div>
          }
        >
          <div className="space-y-4">
            <LoginForm />
            <SocialLogin />
          </div>
        </AuthCard>
      </Suspense>
    </main>
  );
}
