import { z } from "zod";

export const UsernamePageParamsSchema = z.object({ username: z.string() });

export const CommonPageArgsSchema = z.object({
  request: z.custom<Request>(),
  params: UsernamePageParamsSchema,
  context: z.any().optional(),
});
