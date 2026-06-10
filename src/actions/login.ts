"use server";

import { signIn } from "@/auth";
import { LoginInput, LoginSchema } from "@/lib/validations/auth";
import { AuthError } from "next-auth";
import { rateLimit } from "@/lib/rate-limit";
import { headers } from "next/headers";

export async function loginAction(values: LoginInput) {
  // Validate request payload
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { email, password } = validatedFields.data;

  // Apply sliding-window rate limit by client IP
  const headersList = await headers();
  const ip = headersList.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
  const limitResult = await rateLimit(ip, 5, 60);

  if (!limitResult.success) {
    return { error: "Too many login attempts. Please try again in 1 minute." };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dashboard",
    });
    return { success: "Success" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password." };
        default:
          return { error: "An unexpected authentication error occurred." };
      }
    }
    // We must rethrow redirect errors for Next.js to successfully perform the redirect
    throw error;
  }
}
