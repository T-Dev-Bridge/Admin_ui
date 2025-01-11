import { z } from "zod";
import { validationMessages } from "@/shared/api/common";

/**
 * Manager 생성 Form 구성 정의
 */
export const UpdateManagerSchema = z.object({
  id: z
    .string()
    .max(100, {
      message: validationMessages.commonMaxLen100,
    })
    .min(1, {
      message: validationMessages.commonRequired,
    }),
  username: z
    .string()
    .max(20, {
      message: validationMessages.commonMaxLen20,
    })
    .min(1, {
      message: validationMessages.commonRequired,
    }),
  pwdId: z.number(),
  email: z.string().min(1, {
    message: validationMessages.commonRequired,
  }),
  roleId: z.number().min(0, {
    message: validationMessages.commonRequired,
  }),
});

export type UpdateManager = z.infer<typeof UpdateManagerSchema>;
