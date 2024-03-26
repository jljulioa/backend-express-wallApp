import { z } from "zod";

export const wallSchema = z.object({
    key: z.string({required_error: "Key is required"}).nonempty(),
})