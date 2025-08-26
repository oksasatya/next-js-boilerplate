import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Min 6 characters"),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const loginOtpConfirmSchema = z.object({
  email: z.string().email(),
  code: z.string().min(6).max(6),
  remember_device: z.boolean().default(true),
});
export type LoginOtpConfirmInput = z.infer<typeof loginOtpConfirmSchema>;

export const verifyConfirmSchema = z.object({ token: z.string().min(1) });
export type VerifyConfirmInput = z.infer<typeof verifyConfirmSchema>;

export const resetInitSchema = z.object({ email: z.string().email() });
export type ResetInitInput = z.infer<typeof resetInitSchema>;

export const resetConfirmSchema = z.object({
  token: z.string().min(1),
  new_password: z.string().min(8),
});
export type ResetConfirmInput = z.infer<typeof resetConfirmSchema>;

export const updateProfileSchema = z.object({
  name: z.string().min(1),
  avatar_url: z.string().url().optional(),
});
export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
