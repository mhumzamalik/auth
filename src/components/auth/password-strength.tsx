"use client";

import { Check, X } from "lucide-react";
import { PasswordRules } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";

interface PasswordStrengthProps {
  value: string;
}

export function PasswordStrength({ value }: PasswordStrengthProps) {
  const rules = [
    {
      label: "At least 8 characters",
      met: value.length >= PasswordRules.minLength,
    },
    {
      label: "One uppercase letter (A-Z)",
      met: PasswordRules.hasUppercase.test(value),
    },
    {
      label: "One lowercase letter (a-z)",
      met: PasswordRules.hasLowercase.test(value),
    },
    {
      label: "One number (0-9)",
      met: PasswordRules.hasNumber.test(value),
    },
    {
      label: "One special character (@, #, $, etc.)",
      met: PasswordRules.hasSpecial.test(value),
    },
  ];

  const metCount = rules.filter((r) => r.met).length;

  const getStrengthConfig = () => {
    if (value.length === 0) return { label: "Empty", color: "bg-muted", width: "w-0" };
    if (metCount <= 2) return { label: "Weak", color: "bg-rose-500", width: "w-1/3" };
    if (metCount <= 4) return { label: "Medium", color: "bg-amber-500", width: "w-2/3" };
    return { label: "Strong", color: "bg-emerald-500", width: "w-full" };
  };

  const strength = getStrengthConfig();

  return (
    <div className="space-y-3 mt-2">
      {/* Visual Bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-muted-foreground/80">Password strength</span>
          <span
            className={cn("transition-colors duration-200", {
              "text-rose-500": strength.label === "Weak",
              "text-amber-500": strength.label === "Medium",
              "text-emerald-500": strength.label === "Strong",
              "text-muted-foreground/50": strength.label === "Empty",
            })}
          >
            {strength.label === "Empty" ? "" : strength.label}
          </span>
        </div>
        <div className="h-1.5 w-full bg-secondary/80 rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-500 rounded-full", strength.color, strength.width)}
          />
        </div>
      </div>

      {/* Rules Checklist */}
      <ul className="grid grid-cols-1 gap-1.5 text-xs text-muted-foreground/80 font-medium">
        {rules.map((rule, index) => (
          <li key={index} className="flex items-center gap-2 transition-colors duration-200">
            {rule.met ? (
              <Check className="h-3.5 w-3.5 text-emerald-500 stroke-[3px]" />
            ) : (
              <X className="h-3.5 w-3.5 text-muted-foreground/40" />
            )}
            <span className={cn(rule.met ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/70")}>
              {rule.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
