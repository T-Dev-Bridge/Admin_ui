// 조직 생성 enity 타입 정의
import { z } from "zod";
import { validationMessages } from "@/shared/api/common";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: validationMessages.commonRequired,
  }),
  password: z.string().min(8, {
    message: validationMessages.commonMinLen8,
  }),
});

export type Login = z.infer<typeof LoginSchema>;
