"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

interface AuthCardProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}

export function AuthCard({ children, title, description, footer }: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="glass-panel shadow-2xl overflow-hidden">
        <CardHeader className="space-y-1 text-center pb-4">
          <CardTitle className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-violet-500 dark:to-violet-400 bg-clip-text text-transparent">
            {title}
          </CardTitle>
          {description && (
            <CardDescription className="text-sm font-medium text-muted-foreground/80">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="pt-2">{children}</CardContent>
        {footer && (
          <CardFooter className="flex flex-col border-t border-border/40 bg-muted/20 px-6 py-4 mt-2">
            {footer}
          </CardFooter>
        )}
      </Card>
    </motion.div>
  );
}
