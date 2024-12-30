// 조직 생성 enity 타입 정의
import { z } from "zod";
import { baseContractsDto } from "@/shared/api/base";

export const LoginSchema = z.object({
  username: z.string().min(1, {
    message: baseContractsDto.validationMessages.commonRequired,
  }),
  password: z.string().min(8, {
    message: baseContractsDto.validationMessages.commonMinLen8,
  }),
});

export type Login = z.infer<typeof LoginSchema>;
