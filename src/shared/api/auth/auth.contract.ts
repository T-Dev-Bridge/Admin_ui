import { z } from "zod";
import { CommonSchema } from "@/entities/common";
import { validationMessages } from "../common";

export const LoginResponseDtoSchema = z.object({
  userId: z.string(),
  username: z.string(),
  password: z.string(),
  enabled: z.boolean(),
  authorities: z.array(
    z.object({
      authority: z.string(),
    }),
  ),
  accountNonExpired: z.boolean(),
  accountNonLocked: z.boolean(),
  credentialsNonExpired: z.boolean(),
});

export const LoginResponseWithTokenDtoSchema = LoginResponseDtoSchema.extend({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export const UserDtoSchema = CommonSchema.extend({
  id: z.string(),
  username: z.string(),
  password: z.string().nullable().optional(),
  email: z.string(),
  pwdId: z.number(),
  roleId: z.number(),
  enabled: z.boolean(),
});

export const LoginUserDtoSchema = z.object({
  username: z.string().min(1, {
    message: validationMessages.commonRequired,
  }),
  password: z.string().min(8, {
    message: validationMessages.commonMinLen8,
  }),
});
