import { z } from "zod";

export const musicSchema = z.object({
    prompt: z.string().min(1, {
        message: "Music prompt is required"
    }),
});