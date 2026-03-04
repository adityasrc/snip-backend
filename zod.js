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

