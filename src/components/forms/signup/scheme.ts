import { z } from "zod";

export const signupScheme = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    userName: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.@#$%^&+=!]).{8,}$/,
        "Your password must be 8+ characters, with uppercase, lowercase, number, and special character.",
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export type Signup = z.infer<typeof signupScheme>;
