import { z } from "zod";

// 사용자의 세션 상태를 나타내는 스키마.
export const SessionSchema = z.object({
  userId: z.string(),
  username: z.string(),
  accessToken: z.string(),
  refreshToken: z.string(),
  authorities: z.array(
    z.object({
      authority: z.string(),
    }),
  ),
});
