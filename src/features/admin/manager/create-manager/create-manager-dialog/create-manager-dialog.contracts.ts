import { z } from "zod";
import { validationMessages } from "@/shared/api/common";

/**
 * Manager 생성 Form 구성 정의
 */
export const CreateManagerSchema = z
  .object({
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
    password: z
      .string()
      .min(8, {
        message: validationMessages.commonMinLen8,
      })
      .min(1, {
        message: validationMessages.commonRequired,
      }),
    confirmPassword: z.string().min(1, {
      message: validationMessages.commonRequired,
    }),
    email: z.string().min(1, {
      message: validationMessages.commonRequired,
    }),
    roleId: z.number().min(0, {
      message: validationMessages.commonRequired,
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: validationMessages.confirmPassword,
    path: ["confirmPassword"],
  });

export type CreateManager = z.infer<typeof CreateManagerSchema>;
