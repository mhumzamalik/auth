import { auth } from "@/auth";
import { logoutAction } from "@/actions/logout";
import { Button } from "@/components/ui/button";
import { ThemeSwitcher } from "@/components/shared/theme-switcher";
import { Shield, LogOut, User as UserIcon, Calendar, Mail, CheckCircle2, UserCheck } from "lucide-react";
import Image from "next/image";

export const metadata = {
  title: "Dashboard - Secure Auth",
  description: "Secure user dashboard displaying authenticated profile and session state.",
};

export default async function DashboardPage() {
  const session = await auth();

  if (!session || !session.user) {
    return null;
  }

  const userRole = session.user.role || "USER";

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-background via-muted/30 to-muted/70">
      {/* Navigation Header */}
      <header className="border-b border-border/60 bg-background/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary animate-pulse" />
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              SECUREAUTH
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeSwitcher />
            <form action={logoutAction}>
              <Button type="submit" variant="outline" size="sm" className="cursor-pointer gap-1.5 h-9">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sign Out</span>
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Grid Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col gap-8">
        
        {/* Banner Welcome Profile */}
        <div className="glass-panel p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center gap-6 shadow-xl">
          <div className="relative">
            {session.user.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || "User Avatar"}
                width={80}
                height={80}
                className="rounded-full border-2 border-primary/20 shadow-md"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20">
                <UserIcon className="w-10 h-10 text-primary" />
              </div>
            )}
            <span className="absolute bottom-0.5 right-0.5 h-4.5 w-4.5 bg-emerald-500 border-4 border-background rounded-full animate-pulse" />
          </div>

          <div className="flex-1 text-center sm:text-left space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, {session.user.name || "User"}!
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              You are authenticated and your session is fully secured with JWT strategy.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold text-xs select-none">
            <CheckCircle2 className="h-4 w-4 stroke-[2.5px]" />
            Session Active
          </div>
        </div>

        {/* Dashboard Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Profile Details Card */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <UserIcon className="h-5 w-5" />
              </div>
              <h2 className="text-base font-extrabold">Profile Details</h2>
            </div>
            <div className="border-t border-border/60 pt-4 space-y-3">
              <div>
                <label className="text-xs text-muted-foreground font-bold tracking-wider">FULL NAME</label>
                <p className="text-sm font-extrabold mt-0.5">{session.user.name || "Not provided"}</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-bold tracking-wider">EMAIL ADDRESS</label>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Mail className="h-4 w-4 text-muted-foreground/60" />
                  <p className="text-sm font-extrabold truncate">{session.user.email}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Session Security Card */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Shield className="h-5 w-5" />
              </div>
              <h2 className="text-base font-extrabold">Session Security</h2>
            </div>
            <div className="border-t border-border/60 pt-4 space-y-3">
              <div>
                <label className="text-xs text-muted-foreground font-bold tracking-wider">ROLE ASSIGNMENT</label>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <UserCheck className="h-4 w-4 text-primary" />
                  <span className="text-xs font-black uppercase px-2 py-0.5 rounded bg-primary/15 text-primary">
                    {userRole}
                  </span>
                </div>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-bold tracking-wider">AUTH STRATEGY</label>
                <p className="text-sm font-bold mt-0.5">NextAuth JWT Cookie</p>
              </div>
            </div>
          </div>

          {/* Metadata Timeline Card */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Calendar className="h-5 w-5" />
              </div>
              <h2 className="text-base font-extrabold">Timeline Info</h2>
            </div>
            <div className="border-t border-border/60 pt-4 space-y-3">
              <div>
                <label className="text-xs text-muted-foreground font-bold tracking-wider">SESSION EXPIRATION</label>
                <p className="text-sm font-bold mt-0.5">30 Days</p>
              </div>
              <div>
                <label className="text-xs text-muted-foreground font-bold tracking-wider">PROJECT STACK</label>
                <p className="text-sm font-bold mt-0.5">Next.js 16 + React 19</p>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
