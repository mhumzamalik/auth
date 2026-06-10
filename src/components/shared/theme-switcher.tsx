"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-28 h-10 rounded-lg bg-secondary/50 animate-pulse" />;
  }

  return (
    <div className="flex items-center gap-1 rounded-lg border border-border p-1 bg-background/50 backdrop-blur-sm">
      <Button
        variant={theme === "light" ? "secondary" : "ghost"}
        size="icon"
        className="w-8 h-8 rounded-md"
        onClick={() => setTheme("light")}
        title="Light Mode"
      >
        <Sun className="h-4 w-4 text-amber-500" />
      </Button>
      <Button
        variant={theme === "dark" ? "secondary" : "ghost"}
        size="icon"
        className="w-8 h-8 rounded-md"
        onClick={() => setTheme("dark")}
        title="Dark Mode"
      >
        <Moon className="h-4 w-4 text-violet-400" />
      </Button>
      <Button
        variant={theme === "system" ? "secondary" : "ghost"}
        size="icon"
        className="w-8 h-8 rounded-md"
        onClick={() => setTheme("system")}
        title="System Default"
      >
        <Laptop className="h-4 w-4 text-muted-foreground" />
      </Button>
    </div>
  );
}
