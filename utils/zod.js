import { z } from "zod";

export const CreateUserSchema = z.object({
    name: z.string().min(4).max(24), 
    email: z.email(),
    password: z.string().min(4).max(24)
})

export const SigninSchema = z.object({
    email: z.email(),
    password: z.string().min(4).max(24)
})

export const LinkSchema = z.object({
    title: z.string().max(50).optional(),
    originalUrl: z.string().url().refine(val => val.startsWith("http://") || val.startsWith("https://")),
    customAlias: z.string().min(3).max(15).optional(),
    expiresAt: z.string().optional()
})