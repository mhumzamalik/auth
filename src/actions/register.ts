"use server";

import { db } from "@/lib/prisma";
import { RegisterInput, RegisterSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export async function registerAction(values: RegisterInput) {
  // Validate request payload
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, email, password } = validatedFields.data;

  // Rate limiting check
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const limitResult = await rateLimit(ip, 5, 60);

  if (!limitResult.success) {
    return { error: "Too many requests. Please try again in 1 minute." };
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: "A user with this email address already exists." };
  }

  // Hash password using 12 salt rounds
  const hashedPassword = await bcrypt.hash(password, 12);

  // Store user in MongoDB
  try {
    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("Database registration error:", error);
    return { error: "Failed to create user account. Please try again." };
  }

  // Auto sign-in after successful registration
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
    return { success: "Account created successfully." };
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created, but automatic sign-in failed. Please login manually." };
    }
    throw error; // Rethrow redirect errors for Next.js to successfully perform the redirect
  }
}
