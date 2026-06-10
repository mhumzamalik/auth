import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Key, Lock, Cpu, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-tr from-background via-muted/30 to-muted/70 font-sans antialiased">
      {/* Landing Header */}
      <header className="border-b border-border/40 bg-background/40 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              SECUREAUTH
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="cursor-pointer font-semibold">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="cursor-pointer font-semibold">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col justify-center items-center px-4 py-16 text-center max-w-5xl mx-auto space-y-12">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary tracking-wider uppercase select-none">
            <Lock className="h-3 w-3" />
            Production-Ready 2026 Stack
          </div>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Secure Authentication <br />
            <span className="bg-gradient-to-r from-primary to-violet-500 bg-clip-text text-transparent">
              Built By Muhammad Hamza
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-muted-foreground text-base sm:text-lg font-medium leading-relaxed">
            A secure, modern authentication template leveraging React 19 Server Actions, Auth.js v5, Prisma ORM, MongoDB Atlas, and Tailwind CSS v4 styling.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto cursor-pointer font-bold gap-2">
              <Key className="h-5 w-5" />
              Register Account
            </Button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full sm:w-auto cursor-pointer font-bold">
              Sign In to Dashboard
            </Button>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full pt-8">
          <div className="glass-panel p-6 rounded-2xl text-left space-y-3 shadow-lg">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit">
              <Cpu className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">React 19 Server Actions</h3>
            <p className="text-sm text-muted-foreground/80 font-medium">
              Zero API endpoints needed for standard operations. Forms are validated via Zod and handled directly inside secure Node Server environments.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-left space-y-3 shadow-lg">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit">
              <Shield className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Upstash Redis Limiter</h3>
            <p className="text-sm text-muted-foreground/80 font-medium">
              Protects sensitive authentication entrypoints (login, register) from brute-force scripts with automatic local sliding window fallback.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl text-left space-y-3 shadow-lg">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit">
              <Database className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold">Prisma ORM & MongoDB</h3>
            <p className="text-sm text-muted-foreground/80 font-medium">
              Stores credentials securely using 12-round bcrypt salts. Designed explicitly for MongoDB Atlas replica sets.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 bg-background/20 py-8 text-center text-xs text-muted-foreground/60 font-semibold">
        <p>&copy; 2026 SECUREAUTH. All rights reserved. Follows modern web engineering guidelines.</p>
      </footer>
    </div>
  );
}
