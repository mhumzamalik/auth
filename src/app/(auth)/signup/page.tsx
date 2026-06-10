import { AuthCard } from "@/components/auth/auth-card";
import { SignupForm } from "@/components/auth/signup-form";
import Link from "next/link";

export const metadata = {
  title: "Create Account - Secure Auth",
  description: "Create your secure account to get started.",
};

export default function SignupPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-tr from-background via-muted/30 to-muted/70">
      <AuthCard
        title="Create Account"
        description="Fill out the fields below to register your account"
        footer={
          <div className="text-center text-xs text-muted-foreground/80 font-semibold">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-bold hover:underline transition-colors">
              Sign in
            </Link>
          </div>
        }
      >
        <SignupForm />
      </AuthCard>
    </main>
  );
}
