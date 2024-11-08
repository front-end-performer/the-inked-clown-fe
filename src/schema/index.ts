import z from "zod";

export const UserZodSchema = z.object({
  id: z.string({ required_error: "User Id must be provided" }).optional(),

  email: z
    .string({ required_error: "Email must be provided" })
    .email({ message: "Email must be a valid email address" })
    .min(3, { message: "Enter a valid email address" }),

  password: z
    .string({ required_error: "Password must be provided" })
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((pw) => /[0-9]/.test(pw), "Password must contain a number"),
});
