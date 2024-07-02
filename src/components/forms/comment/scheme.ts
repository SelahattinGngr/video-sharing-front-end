import { z } from "zod";

export const commentScheme = z.object({
  content: z
    .string()
    .min(10, {
      message: "Comment must be at least 10 characters long",
    })
    .max(160, {
      message: "Comment must be at most 160 characters long",
    }),
  parentId: z.number(),
});

export type CommentScheme = z.infer<typeof commentScheme>;
