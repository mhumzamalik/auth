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
      toast.error(
        `Could not login with ${provider === "google" ? "Google" : "GitHub"}.`,
      );
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

      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          disabled={loadingProvider !== null}
          onClick={() => handleSocialLogin("google")}
          className="flex items-center justify-center gap-2 cursor-pointer w-full max-w-xs"
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
      </div>
    </div>
  );
}
