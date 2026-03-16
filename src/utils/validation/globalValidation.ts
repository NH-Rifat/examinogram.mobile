import { z } from "zod";

/**
 * Global validation rules that can be reused across the app
 */

export const emailValidation = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

export const passwordValidation = z
  .string()
  .min(1, "Password is required")
  .min(8, "Password must be at least 8 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    "Password must contain at least one uppercase letter, one lowercase letter, and one number",
  );

export const confirmPasswordValidation = (passwordField: string = "password") =>
  z.string().min(1, "Please confirm your password");

export const nameValidation = z
  .string()
  .min(1, "Name is required")
  .min(2, "Name must be at least 2 characters")
  .max(50, "Name must not exceed 50 characters");

export const phoneValidation = z
  .string()
  .min(1, "Phone number is required")
  .regex(/^\+?[1-9]\d{1,14}$/, "Please enter a valid phone number");

export const requiredStringValidation = (fieldName: string) =>
  z.string().min(1, `${fieldName} is required`);

export const optionalStringValidation = z.string().optional();

export const urlValidation = z
  .string()
  .url("Please enter a valid URL")
  .optional()
  .or(z.literal(""));

export const dateValidation = z.date({
  required_error: "Date is required",
  invalid_type_error: "Please enter a valid date",
});
