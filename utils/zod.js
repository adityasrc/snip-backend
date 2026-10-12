import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().trim().min(4).max(50),
    email: z.string().trim().email(),
    password: z.string().min(8).max(24)
});

export const SigninSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8).max(24)
});

export const LinkSchema = z.object({
    title: z.string().trim().max(100).optional(),
    originalUrl: z.string().trim().url("Must be a valid URL")
        .refine(val => !val.includes("localhost") && !val.includes("127.0.0.1"), {
            message: "Localhost URLs are not allowed"
        }),
    customAlias: z.string().trim()
        .regex(/^[a-zA-Z0-9-]+$/, "Alias can only contain letters, numbers, and hyphens")
        .min(3).max(15).optional(),
    expiresAt: z.string().datetime("Invalid date format").optional()
});
