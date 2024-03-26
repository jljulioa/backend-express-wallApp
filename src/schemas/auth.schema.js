import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({required_error: "Name is required"}).nonempty(),
    email: z.string({required_error: "Email is required"}).email({message: "Invalid email"}),
    password: z.string({required_error: "Password is required"}).nonempty().min(6, {message: "Password must be at least 6 characters"}).max(32, {message: "Password must be less than 32 characters"}),
    confirmPassword: z.string({required_error: "Confirm password is required"}).nonempty(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
})

export const loginSchema = z.object({
    email: z.string({required_error: "Email is required"}).email({message: "Invalid email"}),
    password: z.string({required_error: "Password is required"}).nonempty().min(6, {message: "Password must be at least 6 characters"}).max(32, {message: "Password must be less than 32 characters"}),
})