import { z } from "zod";

export const videoSchema = z.object({
    prompt: z.string().min(1, {
        message: "Music prompt is required"
    }),
});