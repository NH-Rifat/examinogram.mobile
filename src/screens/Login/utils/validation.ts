import { emailValidation } from "@/utils/validation/globalValidation";
import { z } from "zod";

/**
 * Login form validation schema
 */
export const loginSchema = z.object({
  email: emailValidation,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;
