import { z } from "zod";

export const PasswordRules = {
  minLength: 8,
  hasUppercase: /[A-Z]/,
  hasLowercase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecial: /[^A-Za-z0-9]/,
};

export const LoginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().min(1, "Email is required").email("Invalid email address"),
    password: z
      .string()
      .min(PasswordRules.minLength, `Password must be at least ${PasswordRules.minLength} characters long`)
      .refine(
        (val) => PasswordRules.hasUppercase.test(val),
        "Password must contain at least one uppercase letter"
      )
      .refine(
        (val) => PasswordRules.hasLowercase.test(val),
        "Password must contain at least one lowercase letter"
      )
      .refine(
        (val) => PasswordRules.hasNumber.test(val),
        "Password must contain at least one number"
      )
      .refine(
        (val) => PasswordRules.hasSpecial.test(val),
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterInput = z.infer<typeof RegisterSchema>;

export const ForgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;
