import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(4).max(24),
    email: z.string().email(),
    password: z.string().min(8).max(24)
})

export const SigninSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8).max(24)
})

export const LinkSchema = z.object({
    title: z.string().max(50).optional(),
    originalUrl: z.string().url().refine(val => val.startsWith("http://") || val.startsWith("https://")),
    customAlias: z.string()
        .regex(/^[a-zA-Z0-9-]+$/, "Alias can only contain letters, numbers, and hyphens")
        .min(3)
        .max(15)
        .optional()
        .or(z.literal(""))
        .transform(val => val === "" ? undefined : val),
    expiresAt: z.string().datetime().optional()
})