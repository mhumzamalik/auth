"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

export function SocialLogin() {
  const [loadingProvider, setLoadingProvider] = useState<string | null>(null);

  const handleSocialLogin = async (provider: "google" | "github") => {
    try {
      setLoadingProvider(provider);
      // Trigger NextAuth OAuth flow redirecting to the dashboard on success
      await signIn(provider, {
        callbackUrl: "/dashboard",
      });
    } catch (error) {
      console.error(error);
      toast.error(`Could not login with ${provider === "google" ? "Google" : "GitHub"}.`);
    } finally {
      setLoadingProvider(null);
    }
  };

  return (
    <div className="space-y-4 w-full">
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border/60" />
        </div>
        <span className="relative bg-card px-3 text-[11px] text-muted-foreground uppercase font-bold tracking-wider select-none">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialLogin("google")}
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          {loadingProvider === "google" ? (
            <span className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#EA4335"
                d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114-3.51 0-6.36-2.85-6.36-6.36s2.85-6.36 6.36-6.36c1.53 0 2.922.544 4.01 1.455l3.023-3.023C19.123 2.546 15.903 1.2 12.24 1.2 6.253 1.2 1.4 6.053 1.4 12s4.853 10.8 10.84 10.8c5.626 0 10.16-4.067 10.16-9.982 0-.6-.054-1.185-.154-1.748L12.24 10.285z"
              />
            </svg>
          )}
          <span className="text-xs font-semibold">Google</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialLogin("github")}
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          {loadingProvider === "github" ? (
            <span className="h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ) : (
            <svg className="h-4 w-4 fill-current text-foreground" viewBox="0 0 24 24">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          )}
          <span className="text-xs font-semibold">GitHub</span>
        </Button>
      </div>
    </div>
  );
}
